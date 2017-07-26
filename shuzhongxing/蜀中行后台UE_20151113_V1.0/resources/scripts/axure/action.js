$axure.internal(function($ax) {
    var _actionHandlers = {};
    var _action = $ax.action = {};

    var queueTypes = _action.queueTypes = {
        move: 1,
        setState: 2,
        fade: 3,
        resize: 4,
        rotate: 5
    };

    var animationQueue = {};

    // using array as the key doesn't play nice
    var nextAnimationId = 1;
    var animationsToCount = {};
    var actionToActionGroups = {};
    var getAnimation = function(id, type) {
        return animationQueue[id] && animationQueue[id][type] && animationQueue[id][type][0];
    };

    var _addAnimation = _action.addAnimation = function (id, type, func, suppressFire) {

        var wasEmpty = !getAnimation(id, type);
        // Add the func to the queue. Create the queue if necessary.
        var idQueue = animationQueue[id];
        if(!idQueue) animationQueue[id] = idQueue = {};

        var queue = idQueue[type];
        if(!queue) idQueue[type] = queue = [];

        queue[queue.length] = func;
        // If it was empty, there isn't a callback waiting to be called on this. You have to fire it manually.
        // If this is waiting on something, suppress it, and it will fire when it's ready
        if(wasEmpty && !suppressFire) func();
    };

    var _addAnimations = function (animations) {
        if(animations.length == 1) {
            _addAnimation(animations[0].id, animations[0].type, animations[0].func);
            return;
        }
        var allReady = true;
        var readyCount = 0;
        for(var i = 0; i < animations.length; i++) {
            var animation = animations[i];
            var thisReady = !getAnimation(animation.id, animation.type);
            allReady = allReady && thisReady;
            if (thisReady) readyCount++;
            else {
                var typeToGroups = actionToActionGroups[animation.id];
                if (!typeToGroups) actionToActionGroups[animation.id] = typeToGroups = {};

                var groups = typeToGroups[animation.type];
                if (!groups) typeToGroups[animation.type] = groups = [];

                groups[groups.length] = animations;
            }
        }

        for(i = 0; i < animations.length; i++) {
            animation = animations[i];
            _addAnimation(animation.id, animation.type, animation.func, true);
        }

        if (allReady) {
            for (i = 0; i < animations.length; i++) animations[i].func();
        } else {
            animations.id = nextAnimationId++;
            animationsToCount[animations.id] = readyCount;
        }
    }

    var _fireAnimationFromQueue = _action.fireAnimationFromQueue = function (id, type) {
        // Remove the function that was just fired
        if (animationQueue[id] && animationQueue[id][type]) $ax.splice(animationQueue[id][type], 0, 1);

        // Fire the next func if there is one
        var func = getAnimation(id, type);
        if(func && !_checkFireActionGroup(id, type, func)) func();
    };

    var _checkFireActionGroup = function(id, type, func) {
        var group = actionToActionGroups[id];
        group = group && group[type];
        if (!group || group.length == 0) return false;

        var animations = group[0];
        var found = false;
        for (var i = 0; i < animations.length; i++) {
            var animation = animations[i];
            if (animation.id == id && animation.type == type) {
                found = func == animation.func;
                break;
            }
        }

        // if found then update this action group, otherwise, keep waiting for right action to fire
        if(!found) return false;
        $ax.splice(group, 0, 1);
        var count = animationsToCount[animations.id] + 1;
        if(count != animations.length) {
            animationsToCount[animations.id] = count;
            return true;
        }
        delete animationsToCount[animations.id];

        // Funcs is needed because an earlier func can try to cascade right away (when no animation for example) and will kill this func and move on to the
        //  next one (which may not even exist). If we get all funcs before calling any, then we know they are all the func we want.
        var funcs = [];
        for(i = 0; i < animations.length; i++) {
            animation = animations[i];
            funcs.push(getAnimation(animation.id, animation.type));
        }
        for(i = 0; i < funcs.length; i++) {
            funcs[i]();
        }

        return true;
    }

    var _refreshing = [];
    _action.refreshStart = function(repeaterId) { _refreshing.push(repeaterId); };
    _action.refreshEnd = function() { _refreshing.pop(); };

    // TODO: [ben] Consider moving this to repeater.js
    var _repeatersToRefresh = _action.repeatersToRefresh = [];
    var _ignoreAction = function(repeaterId) {
        for(var i = 0; i < _refreshing.length; i++) if(_refreshing[i] == repeaterId) return true;
        return false;
    };

    var _addRefresh = function(repeaterId) {
        if(_repeatersToRefresh.indexOf(repeaterId) == -1) _repeatersToRefresh.push(repeaterId);
    };

    var _dispatchAction = $ax.action.dispatchAction = function(eventInfo, actions, currentIndex) {
        currentIndex = currentIndex || 0;
        //If no actions, you can bubble
        if(currentIndex >= actions.length) return;
        //actions are responsible for doing their own dispatching
        _actionHandlers[actions[currentIndex].action](eventInfo, actions, currentIndex);
    };

    _actionHandlers.wait = function(eventInfo, actions, index) {
        var action = actions[index];
        var infoCopy = $ax.eventCopy(eventInfo);
        window.setTimeout(function() {
            infoCopy.now = new Date();
            _dispatchAction(infoCopy, actions, index + 1);
        }, action.waitTime);
    };

    _actionHandlers.expr = function(eventInfo, actions, index) {
        var action = actions[index];

        $ax.expr.evaluateExpr(action.expr, eventInfo); //this should be a block

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.setFunction = _actionHandlers.expr;

    _actionHandlers.linkWindow = function(eventInfo, actions, index) {
        linkActionHelper(eventInfo, actions, index);
    };

    _actionHandlers.closeCurrent = function(eventInfo, actions, index) {
        $ax.closeWindow();
        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.linkFrame = function(eventInfo, actions, index) {
        linkActionHelper(eventInfo, actions, index);
    };

    _actionHandlers.setAdaptiveView = function(eventInfo, actions, index) {
        var action = actions[index];
        var view = action.setAdaptiveViewTo;

        if(view) $ax.adaptive.setAdaptiveView(view);
    };

    var linkActionHelper = function(eventInfo, actions, index) {
        var action = actions[index];
        eventInfo.link = true;

        if(action.linkType != 'frame') {
            var includeVars = _includeVars(action.target, eventInfo);
            if(action.target.targetType == "reloadPage") {
                $ax.reload(action.target.includeVariables);
            } else if(action.target.targetType == "backUrl") {
                $ax.back();
            }

            var url = action.target.url;
            if(!url && action.target.urlLiteral) {
                url = $ax.expr.evaluateExpr(action.target.urlLiteral, eventInfo, true);
            }

            if(url) {
                if(action.linkType == "popup") {
                    $ax.navigate({
                        url: url,
                        target: action.linkType,
                        includeVariables: includeVars,
                        popupOptions: action.popup
                    });
                } else {
                    $ax.navigate({
                        url: url,
                        target: action.linkType,
                        includeVariables: includeVars
                    });
                }
            }
        } else linkFrame(eventInfo, action);
        eventInfo.link = false;

        _dispatchAction(eventInfo, actions, index + 1);
    };

    var _includeVars = function(target, eventInfo) {
        if(target.includeVariables) return true;
        // If it is a url literal, that is a string literal, that has only 1 sto, that is an item that is a page, include vars.
        if(target.urlLiteral) {
            var literal = target.urlLiteral;
            var sto = literal.stos[0];
            if(literal.exprType == 'stringLiteral' && literal.value.indexOf('[[') == 0 && literal.value.indexOf(']]' == literal.value.length - 2) && literal.stos.length == 1 && sto.sto == 'item' && eventInfo.item) {
                var data = $ax.repeater.getData(eventInfo, eventInfo.item.repeater.elementId, eventInfo.item.index, sto.name, 'data');
                if (data && $ax.public.fn.IsPage(data.type)) return true;
            }
        }
        return false;
    };

    var linkFrame = function(eventInfo, action) {
        for(var i = 0; i < action.framesToTargets.length; i++) {
            var framePath = action.framesToTargets[i].framePath;
            var target = action.framesToTargets[i].target;
            var includeVars = _includeVars(target, eventInfo);

            var url = target.url;
            if(!url && target.urlLiteral) {
                url = $ax.expr.evaluateExpr(target.urlLiteral, eventInfo, true);
            }

            var id = $ax.getElementIdsFromPath(framePath, eventInfo)[0];
            if(id) $ax('#' + $ax.INPUT(id)).openLink(url, includeVars);
        }
    };

    var _repeatPanelMap = {};

    _actionHandlers.setPanelState = function(eventInfo, actions, index) {
        var action = actions[index];

        for(var i = 0; i < action.panelsToStates.length; i++) {
            var panelToState = action.panelsToStates[i];
            var stateInfo = panelToState.stateInfo;
            var elementIds = $ax.getElementIdsFromPath(panelToState.panelPath, eventInfo);

            for(var j = 0; j < elementIds.length; j++) {
                var elementId = elementIds[j];
                // Need new scope for elementId and info
                (function(elementId, stateInfo) {
                    _addAnimation(elementId, queueTypes.setState, function() {
                        var stateNumber = stateInfo.stateNumber;
                        if(stateInfo.setStateType == "value") {
                            var oldTarget = eventInfo.targetElement;
                            eventInfo.targetElement = elementId;
                            var stateName = $ax.expr.evaluateExpr(stateInfo.stateValue, eventInfo);
                            eventInfo.targetElement = oldTarget;

                            // Try for state name first
                            var states = $ax.getObjectFromElementId(elementId).diagrams;
                            var stateNameFound = false;
                            for(var k = 0; k < states.length; k++) {
                                if(states[k].label == stateName) {
                                    stateNumber = k + 1;
                                    stateNameFound = true;
                                }
                            }

                            // Now check for index
                            if(!stateNameFound) {
                                stateNumber = Number(stateName);
                                var panelCount = $('#' + elementId).children().length;

                                // Make sure number is not NaN, is in range, and is a whole number.
                                // Wasn't a state name or number, so return
                                if(isNaN(stateNumber) || stateNumber <= 0 || stateNumber > panelCount || Math.round(stateNumber) != stateNumber) return _fireAnimationFromQueue(elementId, queueTypes.setState);
                            }
                        } else if(stateInfo.setStateType == 'next' || stateInfo.setStateType == 'previous') {
                            var info = $ax.deepCopy(stateInfo);
                            var repeat = info.repeat;

                            // Only map it, if repeat exists.
                            if(typeof (repeat) == 'number') _repeatPanelMap[elementId] = info;
                            return _progessPanelState(elementId, info, info.repeatSkipFirst);
                        }
                        delete _repeatPanelMap[elementId];

                        // If setting to current (to stop repeat) break here
                        if(stateInfo.setStateType == 'current') return _fireAnimationFromQueue(elementId, queueTypes.setState);

                        $ax('#' + elementId).SetPanelState(stateNumber, stateInfo.options, stateInfo.showWhenSet);
                    });
                })(elementId, stateInfo);
            }
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    var _progessPanelState = function(id, info, skipFirst) {
        var direction = info.setStateType;
        var loop = info.loop;
        var repeat = info.repeat;
        var options = info.options;

        var hasRepeat = typeof (repeat) == 'number';
        var currentStateId = $ax.visibility.GetPanelState(id);
        var stateNumber = '';
        if(currentStateId != '') {
            currentStateId = $ax.repeater.getScriptIdFromElementId(currentStateId);
            var currentStateNumber = Number(currentStateId.substr(currentStateId.indexOf('state') + 5));
            if(direction == "next") {
                stateNumber = currentStateNumber + 2;

                if(stateNumber > $ax.visibility.GetPanelStateCount(id)) {
                    if(loop) stateNumber = 1;
                    else {
                        delete _repeatPanelMap[id];
                        return _fireAnimationFromQueue(id, queueTypes.setState);
                    }
                }
            } else if(direction == "previous") {
                stateNumber = currentStateNumber;
                if(stateNumber <= 0) {
                    if(loop) stateNumber = $ax.visibility.GetPanelStateCount(id);
                    else {
                        delete _repeatPanelMap[id];
                        return _fireAnimationFromQueue(id, queueTypes.setState);
                    }
                }
            }

            if(hasRepeat && _repeatPanelMap[id] != info) return _fireAnimationFromQueue(id, queueTypes.setState);

            if (!skipFirst) $ax('#' + id).SetPanelState(stateNumber, options, info.showWhenSet);
            else _fireAnimationFromQueue(id, queueTypes.setState);

            if(hasRepeat) {
                var animate = options && options.animateIn;
                if(animate && animate.easing && animate.easing != 'none' && animate.duration > repeat) repeat = animate.duration;
                animate = options && options.animateOut;
                if(animate && animate.easing && animate.easing != 'none' && animate.duration > repeat) repeat = animate.duration;

                window.setTimeout(function() {
                    // Either new repeat, or no repeat anymore.
                    if(_repeatPanelMap[id] != info) return;
                    _addAnimation(id, queueTypes.setState, function() {
                        _progessPanelState(id, info, false);
                    });
                }, repeat);
            } else delete _repeatPanelMap[id];
        }
    };

    _actionHandlers.fadeWidget = function(eventInfo, actions, index) {
        var action = actions[index];

        for(var i = 0; i < action.objectsToFades.length; i++) {
            var fadeInfo = action.objectsToFades[i].fadeInfo;
            var elementIds = $ax.getElementIdsFromPath(action.objectsToFades[i].objectPath, eventInfo);

            for(var j = 0; j < elementIds.length; j++) {
                var elementId = elementIds[j];
                // Need new scope for elementId and info
                (function(elementId, fadeInfo) {
                    _addAnimation(elementId, queueTypes.fade, function() {
                        if(fadeInfo.fadeType == "hide") {
                            $ax('#' + elementId).hide(fadeInfo.options);
                        } else if(fadeInfo.fadeType == "show") {
                            $ax('#' + elementId).show(fadeInfo.options, eventInfo);
                        } else if(fadeInfo.fadeType == "toggle") {
                            $ax('#' + elementId).toggleVisibility(fadeInfo.options);
                        }
                    });
                })(elementId, fadeInfo);
            }
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.moveWidget = function(eventInfo, actions, index) {
        var action = actions[index];
        for(var i = 0; i < action.objectsToMoves.length; i++) {
            var moveInfo = action.objectsToMoves[i].moveInfo;
            var elementIds = $ax.getElementIdsFromPath(action.objectsToMoves[i].objectPath, eventInfo);

            for(var j = 0; j < elementIds.length; j++) {
                var elementId = elementIds[j];
                _queueMove(eventInfo, elementId, moveInfo);
            }
        }
        _dispatchAction(eventInfo, actions, index + 1);
    };

    var _compoundChildrenShallow = function (id) {
        var deep = [];
        var children = $ax('#' + id).getChildren()[0].children;
        var piecePrefix = id + 'p';

        for (var i = 0; i < children.length; i++) {
            if(children[i].substring(0, id.length + 1) == piecePrefix) {
                deep.push(children[i]);
            }
        }
        return deep;
    };

    var _queueMove = function(eventInfo, elementId, moveInfo) {
        var eventInfoCopy = $ax.eventCopy(eventInfo);
        eventInfoCopy.targetElement = elementId;

        if($ax.public.fn.IsLayer($obj(elementId).type)) {
            var childrenIds = $ax.public.fn.getLayerChildrenDeep(elementId, true);
            if(childrenIds.length == 0) return;

            var animations = [];
            var deltaLoc;

            // Get move delta once, then apply to all children
            animations.push({
                id: elementId,
                type: queueTypes.move,
                func: function() {
                    var layerInfo = $ax.public.fn.getWidgetBoundingRect(elementId);
                    deltaLoc = _getMoveLoc(moveInfo, eventInfoCopy, layerInfo);
//                    $ax.event.raiseSyntheticEvent(elementId, "onMove");
                    $ax.visibility.pushContainer(elementId, false);
                    _fireAnimationFromQueue(elementId, queueTypes.move);

                    var options = $ax.deepCopy(moveInfo.options);
                    options.onComplete = function() {
                        for(var i = 0; i < childrenIds.length; i++) _fireAnimationFromQueue(childrenIds[i], queueTypes.move);
                        $ax.visibility.popContainer(elementId, false);
                    };

                    $ax('#' + elementId).moveBy(deltaLoc.x, deltaLoc.y, options);
                }
            });

            for(var i = 0; i < childrenIds.length; i++) {
                (function(childId) {
                    animations.push({
                        id: childId,
                        type: queueTypes.move,
                        func: function () {
                            // Nop, while trying to move as container
                            //$ax.event.raiseSyntheticEvent(childId, "onMove");
                            //if($ax.public.fn.IsLayer($obj(childId).type)) _fireAnimationFromQueue(childId, queueTypes.move);
                            //else $ax('#' + childId).moveBy(deltaLoc.x, deltaLoc.y, moveInfo.options);
                        }
                    });
                })(childrenIds[i]);
            }
            _addAnimations(animations);
        } else {
            _addAnimation(elementId, queueTypes.move, function() {
                var loc = _getMoveLoc(moveInfo, eventInfoCopy);

//                $ax.event.raiseSyntheticEvent(elementId, "onMove");
                if(loc.moveTo) $ax('#' + elementId).moveTo(loc.x, loc.y, moveInfo.options);
                else $ax('#' + elementId).moveBy(loc.x, loc.y, moveInfo.options);
            });
        }
    };

    var _getMoveLoc = function(moveInfo, eventInfoCopy, layerInfo) {
        var moveTo = false;
        var xValue = 0;
        var yValue = 0;
        var widgetDragInfo = eventInfoCopy.dragInfo;
        switch(moveInfo.moveType) {
        case "location":
            xValue = $ax.expr.evaluateExpr(moveInfo.xValue, eventInfoCopy);
            yValue = $ax.expr.evaluateExpr(moveInfo.yValue, eventInfoCopy);
            if(layerInfo) { //if it's layer, use moveby so we can mantain the group shape
                xValue = xValue - layerInfo.left;
                yValue = yValue - layerInfo.top;
            } else moveTo = true;
            break;
        case "delta":
            xValue = $ax.expr.evaluateExpr(moveInfo.xValue, eventInfoCopy);
            yValue = $ax.expr.evaluateExpr(moveInfo.yValue, eventInfoCopy);
            break;
        case "drag":
            xValue = widgetDragInfo.xDelta;
            yValue = widgetDragInfo.yDelta;
            break;
        case "dragX":
            xValue = widgetDragInfo.xDelta;
            yValue = 0;
            break;
        case "dragY":
            xValue = 0;
            yValue = widgetDragInfo.yDelta;
            break;
        case "locationBeforeDrag":
            var location = widgetDragInfo.movedWidgets[eventInfoCopy.srcElement];
            if(location) {
                xValue = location.x;
                yValue = location.y;
            } else {
                _fireAnimationFromQueue(elementId, queueTypes.move);
                return undefined;
            }
            moveTo = true;
            break;
        case "withThis":
            var widgetMoveInfo = $ax.move.GetWidgetMoveInfo();
            var srcElementId = $ax.getElementIdsFromEventAndScriptId(eventInfoCopy, eventInfoCopy.srcElement)[0];
            var delta = widgetMoveInfo[srcElementId];
            xValue = delta.x;
            yValue = delta.y;
            break;
        }

        var options = moveInfo.options;
        if(options && options.boundaryExpr) {
            //check if new position is within boundaries, if not use sto to calculate the correct location
            if(!$ax.expr.evaluateExpr(options.boundaryExpr, eventInfoCopy)) {
                var boundaryStoInfo = options.boundaryStos;
                if(boundaryStoInfo) {
                    var jobj = $jobj(eventInfoCopy.targetElement);
                    if(boundaryStoInfo.ySto) {
                        var currentTop = layerInfo ? layerInfo.top : Number(jobj.css('top').replace('px', ''));
                        var newTop = $ax.evaluateSTO(boundaryStoInfo.ySto, boundaryStoInfo.boundaryScope, eventInfoCopy);
                        if(moveTo) yValue = newTop;
                        else yValue = newTop - currentTop;
                    }

                    if(boundaryStoInfo.xSto) {
                        var currentLeft = layerInfo ? layerInfo.left : Number(jobj.css('left').replace('px', ''));
                        var newLeft = $ax.evaluateSTO(boundaryStoInfo.xSto, boundaryStoInfo.boundaryScope, eventInfoCopy);
                        if(moveTo) xValue = newLeft;
                        else xValue = newLeft - currentLeft;
                    }
                }
            }
        }

        return { x: xValue, y: yValue, moveTo: moveTo };
    };

    _actionHandlers.rotateWidget = function(eventInfo, actions, index) {
        var action = actions[index];
        var widgetRotationFilter = [
            $ax.constants.IMAGE_BOX_TYPE, $ax.constants.IMAGE_MAP_REGION_TYPE,
            $ax.constants.VECTOR_SHAPE_TYPE, $ax.constants.VERTICAL_LINE_TYPE, $ax.constants.HORIZONTAL_LINE_TYPE
        ];

        for(var i = 0; i < action.objectsToRotate.length; i++) {
            var rotateInfo = action.objectsToRotate[i].rotateInfo;
            var elementIds = $ax.getElementIdsFromPath(action.objectsToRotate[i].objectPath, eventInfo);

            for(var j = 0; j < elementIds.length; j++) {
                var elementId = elementIds[j];
                //calculate degree value
                var oldTarget = eventInfo.targetElement;
                eventInfo.targetElement = elementId;
                var rotateDegree = parseFloat($ax.expr.evaluateExpr(rotateInfo.degree, eventInfo));
                eventInfo.targetElement = oldTarget;
                if(!rotateInfo.options.clockwise) rotateDegree = -rotateDegree;

                if($ax.public.fn.IsLayer($obj(elementId).type)) {
                    var childrenIds = $ax.public.fn.getLayerChildrenDeep(elementId, true);
                    if(childrenIds.length == 0) continue;

                    var animations = [];
                    //get center point of the group, and degree delta
                    var centerPoint, degreeDelta;
                    animations.push({id: elementId, type: queueTypes.rotate, func: function () {
                        centerPoint = $ax.public.fn.getWidgetBoundingRect(elementId).centerPoint;
                        var layerDegree = $jobj(elementId).data('layerDegree');
                        if (layerDegree === undefined) layerDegree = 0;
                        else layerDegree = parseFloat(layerDegree);

                        var to = rotateInfo.rotateType == 'location';
                        var newDegree = to ? rotateDegree : layerDegree + rotateDegree;
                        degreeDelta = newDegree - layerDegree;
                        $jobj(elementId).data('layerDegree', newDegree);
                        $ax.event.raiseSyntheticEvent(elementId, "onRotate");
                        _fireAnimationFromQueue(elementId, queueTypes.rotate);
                    }});

                    for(var idIndex = 0; idIndex < childrenIds.length; idIndex++) {
                        var childId = childrenIds[idIndex];
                        (function (id) {
                            var rotate = $.inArray($obj(id).type, widgetRotationFilter) != -1;
                            var isLayer = $ax.public.fn.IsLayer($obj(id).type);
                            animations.push({
                                id: id, type: queueTypes.rotate, func: function () {
                                    $ax.event.raiseSyntheticEvent(id, "onRotate");
                                    if(isLayer) _fireAnimationFromQueue(id, queueTypes.rotate);
                                    else $ax('#' + id).circularMoveAndRotate(degreeDelta, rotateInfo.options, centerPoint.x, centerPoint.y, rotate);
                                }
                            });
                            if(!isLayer) animations.push({ id: id, type: queueTypes.move, func: function() {} });
                        })(childId);
                    }

                    _addAnimations(animations);
                } else _queueRotate(rotateDegree, elementId, rotateInfo);
            }
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    var _queueRotate = function(degreeValue, elementId, rotateInfo) {
        _addAnimation(elementId, queueTypes.rotate, function () {
            $ax.event.raiseSyntheticEvent(elementId, "onRotate");
            $ax('#' + elementId).rotate(degreeValue, rotateInfo.options.easing, rotateInfo.options.duration, rotateInfo.rotateType == 'location', true);
        });
    };

    _actionHandlers.setWidgetSize = function(eventInfo, actions, index) {
        var action = actions[index];
        for(var i = 0; i < action.objectsToResize.length; i++) {
            var ithResizeInfo = action.objectsToResize[i].sizeInfo;
            var objPath = action.objectsToResize[i].objectPath;
            if(objPath == 'thisItem') {
                var thisId = eventInfo.srcElement;
                var repeaterId = $ax.getParentRepeaterFromElementId(thisId);
                var itemId = $ax.repeater.getItemIdFromElementId(thisId);
                var currSize = $ax.repeater.getItemSize(repeaterId, itemId);
                var newSize = _getSizeFromInfo(ithResizeInfo, eventInfo, currSize.width, currSize.height);
                $ax.repeater.setItemSize(repeaterId, itemId, newSize.width, newSize.height);

                continue;
            }

            var elementIds = $ax.getElementIdsFromPath(objPath, eventInfo);

            for(var j = 0; j < elementIds.length; j++) {
                var jthElementId = elementIds[j];
                (function(elementId, resizeInfo) {
                    var axObject = $obj(elementId);
                    var moves = resizeInfo.anchor != "top left" || ($ax.public.fn.IsDynamicPanel(axObject.type) &&
                    ((axObject.fixedHorizontal && axObject.fixedHorizontal == 'center') || (axObject.fixedVertical && axObject.fixedVertical == 'middle')));

                    var animations = [];
                    if($ax.public.fn.IsLayer(axObject.type)) {
                        moves = true; // Assume widgets will move will layer, even though not all widgets may move
                        var childrenIds = $ax.public.fn.getLayerChildrenDeep(elementId, true);
                        if(childrenIds.length === 0) return;
                        // Need to wait to calculate new size, until time to animate, but animates are in separate queues
                        //  best option seems to be to calculate in a "animate" for the layer itself and all children will use that.
                        //  May just have to be redundant if this doesn't work well.

                        var boundingRect, widthChangedPercent, heightChangedPercent, unchanged;
                        animations.push({
                            id: elementId,
                            type: queueTypes.resize,
                            func: function() {
                                boundingRect = $ax.public.fn.getWidgetBoundingRect(elementId);
                                var size = _getSizeFromInfo(resizeInfo, eventInfo, boundingRect.width, boundingRect.height, elementId);

                                widthChangedPercent = (size.width - boundingRect.width) / boundingRect.width;
                                heightChangedPercent = (size.height - boundingRect.height) / boundingRect.height;

                                unchanged = widthChangedPercent === 0 && heightChangedPercent === 0;
                                $ax.event.raiseSyntheticEvent(elementId, 'onResize');
                                _fireAnimationFromQueue(elementId, queueTypes.resize);
                            }
                        });

                        for(var idIndex = 0; idIndex < childrenIds.length; idIndex++) {
                            // Need to use scoping trick here to make sure childId doesn't change on next loop
                            (function(childId) {
                                //use ax obj to get width and height, jquery css give us the value without border
                                var isLayer = $ax.public.fn.IsLayer($obj(childId).type);
                                animations.push({
                                    id: childId,
                                    type: queueTypes.resize,
                                    func: function() {
                                        $ax.event.raiseSyntheticEvent(childId, 'onResize');
                                        if(isLayer) _fireAnimationFromQueue(childId, queueTypes.resize);
                                        else {
                                            var css = _getCssForResizingLayerChild(childId, resizeInfo.anchor, boundingRect, widthChangedPercent, heightChangedPercent);
                                            $ax('#' + childId).resize(css, resizeInfo, true, moves);
                                        }
                                    }
                                });
                                if(!isLayer && moves) animations.push({ id: childId, type: queueTypes.move, func: function() {} });
                            })(childrenIds[idIndex]);
                        }
                    } else if (axObject.generateCompound) {

                        //var compoundQuery = $jobj(elementId);

                        var jobj = $jobj(elementId);
                        var fourCorners = $ax.public.fn.getFourCorners(jobj);
                        var basis = $ax.public.fn.fourCornersToBasis(fourCorners);
                        var oldWidth = $ax.public.fn.l2(basis.widthVector.x, basis.widthVector.y);
                        var oldHeight = $ax.public.fn.l2(basis.heightVector.x, basis.heightVector.y);

                        var size = _getSizeFromInfo(resizeInfo, eventInfo, oldHeight, oldWidth, elementId);
                        var newWidth = size.width;
                        var newHeight = size.height;

                        if (Math.abs(newHeight - oldHeight) < 0.01 && Math.abs(newWidth - oldWidth) < 0.01) {
                            _fireAnimationFromQueue(elementId, queueTypes.resize);
                            if (moves) _fireAnimationFromQueue(elementId, queueTypes.move);
                            return;
                        }

                        var invariant;
                        switch (resizeInfo.anchor) {
                            case "top left":
                                invariant = fourCorners.widgetTopLeft; break;
                            case "top":
                                invariant = $ax.public.fn.vectorMidpoint(fourCorners.widgetTopLeft, fourCorners.widgetTopRight); break;
                            case "top right":
                                invariant = fourCorners.widgetTopRight; break;
                            case "left":
                                invariant = $ax.public.fn.vectorMidpoint(fourCorners.widgetTopLeft, fourCorners.widgetBottomLeft); break;
                            case "center":
                                invariant =$ax.public.fn.vectorMidpoint(fourCorners.widgetTopLeft, fourCorners.widgetBottomRight); break;
                            case "right":
                                invariant = $ax.public.fn.vectorMidpoint(fourCorners.widgetTopRight, fourCorners.widgetBottomRight); break;
                            case "bottom left":
                                invariant = fourCorners.widgetBottomLeft; break;
                            case "bottom":
                                invariant = $ax.public.fn.vectorMidpoint(fourCorners.widgetBottomLeft, fourCorners.widgetBottomRight); break;
                            case "bottom right":
                                invariant = fourCorners.widgetBottomRight; break;
                        }

                        animations.push({
                            id: elementId,
                            type: queueTypes.resize,
                            func: function () {
                                //textarea can be resized manully by the user, but doesn't update div size yet, so doing this for now.
                                //alternatively axquery get for size can account for this

                                var css = {
                                    invariant: invariant,
                                    fourCorners: fourCorners,
                                    widthRatio: newWidth / oldWidth,
                                    heightRatio: newHeight / oldHeight
                                }
                                // TODO: what if any of these numbers is 0?
                                $ax.event.raiseSyntheticEvent(elementId, 'onResize');
                                $ax('#' + elementId).resize(css, resizeInfo, true, moves);
                            }
                        });

                        // Nop move (move handled by resize)
                        if (moves) animations.push({ id: elementId, type: queueTypes.move, func: function () { } });
                    } else {
                        // Not func, obj with func
                        animations.push({
                            id: elementId,
                            type: queueTypes.resize,
                            func: function() {
                                //textarea can be resized manully by the user, but doesn't update div size yet, so doing this for now.
                                //alternatively axquery get for size can account for this
                                var sizeId = $ax.public.fn.IsTextArea(axObject.type) ? $jobj(elementId).children('textarea').attr('id') : elementId;
                                var oldSize = $ax('#' + sizeId).size();
                                var oldWidth = oldSize.width;
                                var oldHeight = oldSize.height;

                                var size = _getSizeFromInfo(resizeInfo, eventInfo, oldHeight, oldWidth, elementId);
                                var newWidth = size.width;
                                var newHeight = size.height;

                                if(newHeight == oldHeight && newWidth == oldWidth) {
                                    _fireAnimationFromQueue(elementId, queueTypes.resize);
                                    if(moves) _fireAnimationFromQueue(elementId, queueTypes.move);
                                    return;
                                }

                                var css = _getCssForResizingWidget(elementId, resizeInfo.anchor, newWidth, newHeight, oldWidth, oldHeight);
                                $ax.event.raiseSyntheticEvent(elementId, 'onResize');
                                $ax('#' + elementId).resize(css, resizeInfo, true, moves);
                            }
                        });
                        // Nop move (move handled by resize)
                        if(moves) animations.push({ id: elementId, type: queueTypes.move, func: function() {} });
                    }

                    _addAnimations(animations);
                })(jthElementId, ithResizeInfo);
            }
        }
        _dispatchAction(eventInfo, actions, index + 1);
    };

    var _getOldAndNewSize = function (resizeInfo, eventInfo, targetElement) {
        var axObject = $obj(targetElement);
        var oldWidth, oldHeight;
        //textarea can be resized manully by the user, use the textarea child to get the current size
        //because this new size may not be reflected on its parents yet
        if ($ax.public.fn.IsTextArea(axObject.type)) {
            var jObject = $jobj(elementId);
            var textObj = $ax('#' + jObject.children('textarea').attr('id'));
            //maybe we shouldn't use ax obj to get width and height here anymore...
            oldWidth = textObj.width();
            oldHeight = textObj.height();
        } else {
            oldWidth = $ax('#' + elementId).width();
            oldHeight = $ax('#' + elementId).height();
        }

        var size = _getSizeFromInfo(resizeInfo, eventInfo, oldHeight, oldWidth, elementId);
        return { oldWidth: oldWidth, oldHeight: oldHeight, newWidth: size.width, newHeight: size.height, change: oldWidth != size.width || oldHeight != size.height };
    }

    var _getSizeFromInfo = function(resizeInfo, eventInfo, oldWidth, oldHeight, targetElement) {
        var oldTarget = eventInfo.targetElement;
        eventInfo.targetElement = targetElement;
        var width = $ax.expr.evaluateExpr(resizeInfo.width, eventInfo);
        var height = $ax.expr.evaluateExpr(resizeInfo.height, eventInfo);
        eventInfo.targetElement = oldTarget;


        // If either one is not a number, use the old value
        width = width != "" ? Number(width) : oldWidth;
        height = height != "" ? Number(height) : oldHeight;

        width = isNaN(width) ? oldWidth : width;
        height = isNaN(height) ? oldHeight : height;

        // can't be negative
        return { width: Math.max(width, 0), height: Math.max(height, 0) };
    }

    var _queueResize = function (elementId, css, resizeInfo) {
        var resizeFunc = function() {
            $ax('#' + elementId).resize(css, resizeInfo, true);
            //$ax.public.fn.resize(elementId, css, resizeInfo, true);
        };
        var obj = $obj(elementId);
        var moves = resizeInfo.anchor != "top left" || ($ax.public.fn.IsDynamicPanel(obj.type) && ((obj.fixedHorizontal && obj.fixedHorizontal == 'center') || (obj.fixedVertical && obj.fixedVertical == 'middle')))
        if(!moves) {
            _addAnimation(elementId, queueTypes.resize, resizeFunc);
        } else {
            var animations = [];
            animations[0] = { id: elementId, type: queueTypes.resize, func: resizeFunc };
            animations[1] = { id: elementId, type: queueTypes.move, func: function() {}}; // Nop func - resize handles move and firing from queue
            _addAnimations(animations);
        }
    };

    //should clean this function and 
    var _getCssForResizingWidget = function(elementId, anchor, newWidth, newHeight, oldWidth, oldHeight) {
        var css = {};
        css.height = newHeight;

        var obj = $obj(elementId);
        //if it's 100% width, don't change its width
        if($ax.dynamicPanelManager.isPercentWidthPanel(obj)) var is100Dp = true;
        else css.width = newWidth;

        var jobj = $jobj(elementId);
        //if this is pinned dp, we will mantain the pin, no matter how you resize it; so no need changes left or top
        //NOTE: currently only pinned DP has position == fixed
        if(jobj.css('position') == 'fixed') return css;

        //use position relative to parents
        //var position = obj.generateCompound ? $ax.public.fn.getWidgetBoundingRect(elementId) : $ax.public.fn.getPositionRelativeToParent(elementId);
        var trig = $ax.public.fn.transformFromElement(jobj[0]);
        
        var centerShift;
        switch(anchor) {
            case "top left":
                // Don't need to update top/left
                return css;
            case "top":
                centerShift = { x: 0.0, y: (newHeight - oldHeight) / 2 }; break;
            case "top right":
                centerShift = { x: (oldWidth - newWidth) / 2, y: (newHeight - oldHeight) / 2 }; break;
            case "left":
                centerShift = { x: (newWidth - oldWidth) / 2, y: 0.0 }; break;
            case "center":
                centerShift = { x: 0.0, y: 0.0 }; break;
            case "right":
                centerShift = { x: (oldWidth - newWidth) / 2, y: 0.0 }; break;
            case "bottom left":
                centerShift = { x: (newWidth - oldWidth) / 2, y: (oldHeight - newHeight) / 2 }; break;
            case "bottom":
                centerShift = { x: 0.0, y: (oldHeight - newHeight) / 2 }; break;
            case "bottom right":
                centerShift = { x: (oldWidth - newWidth) / 2, y: (oldHeight - newHeight) / 2 }; break;
        }

        var transformOnTopLeft = {
            m11: trig[0],
            m12: -trig[1],
            m21: trig[1],
            m22: trig[0],
            tx: (oldWidth - newWidth) / 2.0,
            ty: (oldHeight - newHeight) / 2.0
        }
        var topLeftShift = $ax.public.fn.matrixMultiply(transformOnTopLeft, centerShift);
        if(jobj.css('position') === 'absolute') {
            css.left = Number(jobj.css('left').replace('px', '')) + topLeftShift.x;
            css.top = Number(jobj.css('top').replace('px', '')) + topLeftShift.y;
        } else {
            var axQuery = $ax('#' + elementId);
            css.left = axQuery.left(true) + topLeftShift.x;
            css.top = axQuery.top(true) + topLeftShift.y;
        }

        return css;
    };


    var _getCssForResizingLayerChild = function (elementId, anchor, layerBoundingRect, widthChangedPercent, heightChangedPercent) {
        var boundingRect = $ax.public.fn.getWidgetBoundingRect(elementId);
        var childCenterPoint = boundingRect.centerPoint;

        var currentSize = $ax('#' + elementId).size();
        var newWidth = currentSize.width + currentSize.width * widthChangedPercent;
        var newHeight = currentSize.height + currentSize.height * heightChangedPercent;

        var css = {};
        css.height = newHeight;

        var obj = $obj(elementId);
        //if it's 100% width, don't change its width and left
        var changeLeft = true;
        if($ax.dynamicPanelManager.isPercentWidthPanel(obj)) changeLeft = false;
        else css.width = newWidth;


        var jobj = $jobj(elementId);
        //if this is pinned dp, we will mantain the pin, no matter how you resize it; so no need changes left or top
        //NOTE: currently only pinned DP has position == fixed
        if(jobj.css('position') == 'fixed') return css;
        //use bounding rect position relative to parents to calculate delta
        var position = jobj.position();
        var currentLeft = position.left;
        var currentTop = position.top;

        if(anchor.indexOf("center") > -1) {
            var topDelta = (childCenterPoint.y - layerBoundingRect.centerPoint.y) * heightChangedPercent - currentSize.height * heightChangedPercent / 2;
            if(changeLeft) var leftDelta = (childCenterPoint.x - layerBoundingRect.centerPoint.x) * widthChangedPercent - currentSize.width * widthChangedPercent / 2;
        } else {
            if(anchor.indexOf("top") > -1) {
                topDelta = (currentTop - layerBoundingRect.top) * heightChangedPercent;
            } else if(anchor.indexOf("bottom") > -1) {
                topDelta = (currentTop - layerBoundingRect.bottom) * heightChangedPercent;
            } else {
                topDelta = (childCenterPoint.y - layerBoundingRect.centerPoint.y) * heightChangedPercent - currentSize.height * heightChangedPercent / 2;
            }

            if(changeLeft) {
                if(anchor.indexOf("left") > -1) {
                    leftDelta = (currentLeft - layerBoundingRect.left) * widthChangedPercent;
                } else if(anchor.indexOf("right") > -1) {
                    leftDelta = (currentLeft - layerBoundingRect.right) * widthChangedPercent;
                } else {
                    leftDelta = (childCenterPoint.x - layerBoundingRect.centerPoint.x) * widthChangedPercent - currentSize.width * widthChangedPercent / 2;
                }
            }
        }

        //Note: use element location rather than bounding rect position when calculate 
        if(topDelta) css.top = topDelta + $ax('#' + elementId).top();
        if(leftDelta && changeLeft) css.left = leftDelta + $ax('#' + elementId).left();

        return css;
    };

    _actionHandlers.setPanelOrder = function(eventInfo, actions, index) {
        var action = actions[index];
        for(var i = 0; i < action.panelPaths.length; i++) {
            var func = action.panelPaths[i].setOrderInfo.bringToFront ? 'bringToFront' : 'sendToBack';
            var elementIds = $ax.getElementIdsFromPath(action.panelPaths[i].panelPath, eventInfo);
            for(var j = 0; j < elementIds.length; j++) $ax('#' + elementIds[j])[func]();
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.modifyDataSetEditItems = function(eventInfo, actions, index) {
        var action = actions[index];
        var add = action.repeatersToAddTo;
        var repeaters = add || action.repeatersToRemoveFrom;
        var itemId;
        for(var i = 0; i < repeaters.length; i++) {
            var data = repeaters[i];
            // Grab the first one because repeaters must have only element id, as they cannot be inside repeaters
            //  or none if unplaced
            var id = $ax.getElementIdsFromPath(data.path, eventInfo)[0];
            if(!id) continue;

            if(data.addType == 'this') {
                var scriptId = $ax.repeater.getScriptIdFromElementId(eventInfo.srcElement);
                itemId = $ax.repeater.getItemIdFromElementId(eventInfo.srcElement);
                var repeaterId = $ax.getParentRepeaterFromScriptId(scriptId);
                if(add) $ax.repeater.addEditItems(repeaterId, [itemId]);
                else $ax.repeater.removeEditItems(repeaterId, [itemId]);
            } else if(data.addType == 'all') {
                var allItems = $ax.repeater.getAllItemIds(id);
                if(add) $ax.repeater.addEditItems(id, allItems);
                else $ax.repeater.removeEditItems(id, allItems);
            } else {
                var oldTarget = eventInfo.targetElement;
                var itemIds = $ax.repeater.getAllItemIds(id);
                var itemIdsToAdd = [];
                for(var j = 0; j < itemIds.length; j++) {
                    itemId = itemIds[j];
                    eventInfo.targetElement = $ax.repeater.createElementId(id, itemId);
                    if($ax.expr.evaluateExpr(data.query, eventInfo) == "true") {
                        itemIdsToAdd[itemIdsToAdd.length] = String(itemId);
                    }
                    eventInfo.targetElement = oldTarget;
                }
                if(add) $ax.repeater.addEditItems(id, itemIdsToAdd);
                else $ax.repeater.removeEditItems(id, itemIdsToAdd);
            }
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _action.repeaterInfoNames = { addItemsToDataSet: 'dataSetsToAddTo', deleteItemsFromDataSet: 'dataSetItemsToRemove', updateItemsInDataSet: 'dataSetsToUpdate',
        addFilterToRepeater: 'repeatersToAddFilter', removeFilterFromRepeater: 'repeatersToRemoveFilter',
        addSortToRepeater: 'repeaterToAddSort', removeSortFromRepeater: 'repeaterToRemoveSort',
        setRepeaterToPage: 'repeatersToSetPage', setItemsPerRepeaterPage: 'repeatersToSetItemCount'
    };

    _actionHandlers.addItemsToDataSet = function(eventInfo, actions, index) {
        var action = actions[index];
        for(var i = 0; i < action.dataSetsToAddTo.length; i++) {
            var datasetInfo = action.dataSetsToAddTo[i];
            // Grab the first one because repeaters must have only element id, as they cannot be inside repeaters
            //  or none if unplaced
            var id = $ax.getElementIdsFromPath(datasetInfo.path, eventInfo)[0];
            if(!id || _ignoreAction(id)) continue;
            var dataset = datasetInfo.data;

            for(var j = 0; j < dataset.length; j++) $ax.repeater.addItem(id, $ax.deepCopy(dataset[j]), eventInfo);
            if(dataset.length) _addRefresh(id);
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.deleteItemsFromDataSet = function(eventInfo, actions, index) {
        var action = actions[index];
        for(var i = 0; i < action.dataSetItemsToRemove.length; i++) {
            // Grab the first one because repeaters must have only element id, as they cannot be inside repeaters
            //  or none if unplaced
            var deleteInfo = action.dataSetItemsToRemove[i];
            var id = $ax.getElementIdsFromPath(deleteInfo.path, eventInfo)[0];
            if(!id || _ignoreAction(id)) continue;
            $ax.repeater.deleteItems(id, eventInfo, deleteInfo.type, deleteInfo.rule);
            _addRefresh(id);
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.updateItemsInDataSet = function(eventInfo, actions, index) {
        var action = actions[index];
        for(var i = 0; i < action.dataSetsToUpdate.length; i++) {
            var dataSet = action.dataSetsToUpdate[i];
            // Grab the first one because repeaters must have only element id, as they cannot be inside repeaters
            //  or none if unplaced
            var id = $ax.getElementIdsFromPath(dataSet.path, eventInfo)[0];
            if(!id || _ignoreAction(id)) continue;

            $ax.repeater.updateEditItems(id, dataSet.props, eventInfo, dataSet.type, dataSet.rule);
            _addRefresh(id);
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.setRepeaterToDataSet = function(eventInfo, actions, index) {
        var action = actions[index];

        for(var i = 0; i < action.repeatersToSet.length; i++) {
            var setRepeaterInfo = action.repeatersToSet[i];
            // Grab the first one because repeaters must have only element id, as they cannot be inside repeaters
            //  or none if unplaced
            var id = $ax.getElementIdsFromPath(setRepeaterInfo.path, eventInfo)[0];
            if(!id) continue;
            $ax.repeater.setDataSet(id, setRepeaterInfo.localDataSetId);
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.addFilterToRepeater = function(eventInfo, actions, index) {
        var action = actions[index];

        for(var i = 0; i < action.repeatersToAddFilter.length; i++) {
            var addFilterInfo = action.repeatersToAddFilter[i];
            // Grab the first one because repeaters must have only element id, as they cannot be inside repeaters
            //  or none if unplaced
            var id = $ax.getElementIdsFromPath(addFilterInfo.path, eventInfo)[0];
            if(!id || _ignoreAction(id)) continue;

            $ax.repeater.addFilter(id, addFilterInfo.removeOtherFilters, addFilterInfo.label, addFilterInfo.filter, eventInfo.srcElement);
            _addRefresh(id);
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.removeFilterFromRepeater = function(eventInfo, actions, index) {
        var action = actions[index];

        for(var i = 0; i < action.repeatersToRemoveFilter.length; i++) {
            var removeFilterInfo = action.repeatersToRemoveFilter[i];
            // Grab the first one because repeaters must have only element id, as they cannot be inside repeaters
            //  or none if unplaced
            var id = $ax.getElementIdsFromPath(removeFilterInfo.path, eventInfo)[0];
            if(!id || _ignoreAction(id)) continue;

            if(removeFilterInfo.removeAll) $ax.repeater.removeFilter(id);
            else if(removeFilterInfo.filterName != '') {
                $ax.repeater.removeFilter(id, removeFilterInfo.filterName);
            }
            _addRefresh(id);
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.addSortToRepeater = function(eventInfo, actions, index) {
        var action = actions[index];

        for(var i = 0; i < action.repeatersToAddSort.length; i++) {
            var addSortInfo = action.repeatersToAddSort[i];
            // Grab the first one because repeaters must have only element id, as they cannot be inside repeaters
            //  or none if unplaced
            var id = $ax.getElementIdsFromPath(addSortInfo.path, eventInfo)[0];
            if(!id || _ignoreAction(id)) continue;

            $ax.repeater.addSort(id, addSortInfo.label, addSortInfo.columnName, addSortInfo.ascending, addSortInfo.toggle, addSortInfo.sortType);
            _addRefresh(id);
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.removeSortFromRepeater = function(eventInfo, actions, index) {
        var action = actions[index];

        for(var i = 0; i < action.repeatersToRemoveSort.length; i++) {
            var removeSortInfo = action.repeatersToRemoveSort[i];
            // Grab the first one because repeaters must have only element id, as they cannot be inside repeaters
            //  or none if unplaced
            var id = $ax.getElementIdsFromPath(removeSortInfo.path, eventInfo)[0];
            if(!id || _ignoreAction(id)) continue;

            if(removeSortInfo.removeAll) $ax.repeater.removeSort(id);
            else if(removeSortInfo.sortName != '') $ax.repeater.removeSort(id, removeSortInfo.sortName);
            _addRefresh(id);
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.setRepeaterToPage = function(eventInfo, actions, index) {
        var action = actions[index];

        for(var i = 0; i < action.repeatersToSetPage.length; i++) {
            var setPageInfo = action.repeatersToSetPage[i];
            // Grab the first one because repeaters must have only element id, as they cannot be inside repeaters
            //  or none if unplaced
            var id = $ax.getElementIdsFromPath(setPageInfo.path, eventInfo)[0];
            if(!id || _ignoreAction(id)) continue;

            var oldTarget = eventInfo.targetElement;
            eventInfo.targetElement = id;
            $ax.repeater.setRepeaterToPage(id, setPageInfo.pageType, setPageInfo.pageValue, eventInfo);
            eventInfo.targetElement = oldTarget;
            _addRefresh(id);
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.setItemsPerRepeaterPage = function(eventInfo, actions, index) {
        var action = actions[index];

        for(var i = 0; i < action.repeatersToSetItemCount.length; i++) {
            var setItemCountInfo = action.repeatersToSetItemCount[i];
            // Grab the first one because repeaters must have only element id, as they cannot be inside repeaters
            //  or none if unplaced
            var id = $ax.getElementIdsFromPath(setItemCountInfo.path, eventInfo)[0];
            if(!id || _ignoreAction(id)) continue;

            if(setItemCountInfo.noLimit) $ax.repeater.setNoItemLimit(id);
            else $ax.repeater.setItemLimit(id, setItemCountInfo.itemCountValue, eventInfo);
            _addRefresh(id);
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.refreshRepeater = function(eventInfo, actions, index) {
        // We use this as a psudo action now.
        var action = actions[index];
        for (var i = 0; i < action.repeatersToRefresh.length; i++) {
            // Grab the first one because repeaters must have only element id, as they cannot be inside repeaters
            //  or none if unplaced
            var id = $ax.getElementIdsFromPath(action.repeatersToRefresh[i], eventInfo)[0];
            if(id) _tryRefreshRepeater(id, eventInfo);
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    var _tryRefreshRepeater = function(id, eventInfo) {
        var idIndex = _repeatersToRefresh.indexOf(id);
        if(idIndex == -1) return;

        $ax.splice(_repeatersToRefresh, idIndex, 1);
        $ax.repeater.refreshRepeater(id, eventInfo);
    };

    _action.tryRefreshRepeaters = function(ids, eventInfo) {
        for(var i = 0; i < ids.length; i++) _tryRefreshRepeater(ids[i], eventInfo);
    };

    _actionHandlers.scrollToWidget = function(eventInfo, actions, index) {
        var action = actions[index];
        var elementIds = $ax.getElementIdsFromPath(action.objectPath, eventInfo);
        if(elementIds.length > 0) $ax('#' + elementIds[0]).scroll(action.options);

        _dispatchAction(eventInfo, actions, index + 1);
    };


    _actionHandlers.enableDisableWidgets = function(eventInfo, actions, index) {
        var action = actions[index];
        for(var i = 0; i < action.pathToInfo.length; i++) {
            var elementIds = $ax.getElementIdsFromPath(action.pathToInfo[i].objectPath, eventInfo);
            var enable = action.pathToInfo[i].enableDisableInfo.enable;
            for(var j = 0; j < elementIds.length; j++) $ax('#' + elementIds[j]).enabled(enable);
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.setImage = function(eventInfo, actions, index) {
        var oldTarget = eventInfo.targetElement;
        var action = actions[index];
        var view = $ax.adaptive.currentViewId;

        eventInfo.image = true;
        for(var i = 0; i < action.imagesToSet.length; i++) {
            var imgInfo = action.imagesToSet[i];
            imgInfo = view ? imgInfo.adaptive[view] : imgInfo.base;
            var elementIds = $ax.getElementIdsFromPath(action.imagesToSet[i].objectPath, eventInfo);

            for(var j = 0; j < elementIds.length; j++) {
                var elementId = elementIds[j];

                eventInfo.targetElement = elementId;
                var evaluatedImgs = _evaluateImages(imgInfo, eventInfo);

                var img = evaluatedImgs.normal;
                if($ax.style.IsWidgetDisabled(elementId)) {
                    if(imgInfo.disabled) img = evaluatedImgs.disabled;
                } else if($ax.style.IsWidgetSelected(elementId)) {
                    if(imgInfo.selected) img = evaluatedImgs.selected;
                } else if($ax.event.mouseDownObjectId == elementId && imgInfo.mouseDown) img = evaluatedImgs.mouseDown;
                else if($ax.event.mouseOverIds.indexOf(elementId) != -1 && imgInfo.mouseOver) {
                    img = evaluatedImgs.mouseOver;
                    //Update mouseOverObjectId
                    var currIndex = $ax.event.mouseOverIds.indexOf($ax.event.mouseOverObjectId);
                    var imgIndex = $ax.event.mouseOverIds.indexOf(elementId);
                    if(currIndex < imgIndex) $ax.event.mouseOverObjectId = elementId;
                }

                //            $('#' + $ax.repeater.applySuffixToElementId(elementId, '_img')).attr('src', img);
                $jobj($ax.style.GetImageIdFromShape(elementId)).attr('src', img);

                //Set up overrides
                $ax.style.mapElementIdToImageOverrides(elementId, evaluatedImgs);
                $ax.style.updateElementIdImageStyle(elementId);
            }
        }
        eventInfo.targetElement = oldTarget;
        eventInfo.image = false;

        _dispatchAction(eventInfo, actions, index + 1);
    };

    var _evaluateImages = function(imgInfo, eventInfo) {
        var retVal = {};
        for(var state in imgInfo) {
            if(!imgInfo.hasOwnProperty(state)) continue;
            var img = imgInfo[state].path || $ax.expr.evaluateExpr(imgInfo[state].literal, eventInfo);
            if(!img) img = $axure.utils.getTransparentGifPath();
            retVal[state] = img;
        }
        return retVal;
    };

    $ax.clearRepeaterImageOverrides = function(repeaterId) {
        var childIds = $ax.getChildElementIdsForRepeater(repeaterId);
        for(var i = childIds; i < childIds.length; i++) $ax.style.deleteElementIdToImageOverride(childIds[i]);
    };

    _actionHandlers.setFocusOnWidget = function(eventInfo, actions, index) {
        var action = actions[index];
        if(action.objectPaths.length > 0) {
            var elementIds = $ax.getElementIdsFromPath(action.objectPaths[0], eventInfo);
            if(elementIds.length > 0) {
                $ax('#' + elementIds[0]).focus();
                //if select text and not in placeholder mode, then select all text
                if(action.selectText && !$ax.placeholderManager.isActive(elementIds[0])) {
                    var elementChildren = document.getElementById(elementIds[0]).children;
                    //find the input or textarea element
                    for(var i = 0; i < elementChildren.length; i++) {
                        if (elementChildren[i].id.indexOf('_input') == -1) continue;
                        var elementTagName = elementChildren[i].tagName;
                        if(elementTagName && (elementTagName.toLowerCase() == "input" || elementTagName.toLowerCase() == "textarea")) {
                            elementChildren[i].select();
                        }
                    }
                }
            }
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.expandCollapseTree = function(eventInfo, actions, index) {
        var action = actions[index];
        for(var i = 0; i < action.pathToInfo.length; i++) {
            var pair = action.pathToInfo[i];
            var elementIds = $ax.getElementIdsFromPath(pair.treeNodePath, eventInfo);
            for(var j = 0; j < elementIds.length; j++) $ax('#' + elementIds[j]).expanded(pair.expandCollapseInfo.expand);
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.other = function(eventInfo, actions, index) {
        var action = actions[index];
        $ax.navigate({
            url: $axure.utils.getOtherPath() + "#other=" + encodeURI(action.otherDescription),
            target: "popup",
            includeVariables: false,
            popupOptions: action.popup
        });

        _dispatchAction(eventInfo, actions, index + 1);
    };

    _actionHandlers.fireEvents = function(eventInfo, actions, index) {
        var action = actions[index];
        //look for the nearest element id

        var objId = eventInfo.srcElement;
        var obj = $ax.getObjectFromElementId(objId);
        var rdoId = obj ? $ax.getRdoParentFromElementId(objId) : "";
        var rdo = $ax.getObjectFromElementId(rdoId);
        var page = rdo ? $ax.pageData.masters[rdo.masterId] : $ax.pageData.page;

        // Check if rdo should be this
        var oldIsMasterEvent = eventInfo.isMasterEvent;
        if (obj && $ax.public.fn.IsReferenceDiagramObject(obj.type) && eventInfo.isMasterEvent) {
            rdoId = objId;
            rdo = obj;
            page = $ax.pageData.masters[rdo.masterId];
        }

        for(var i = 0; i < action.firedEvents.length; i++) {
            var firedEvent = action.firedEvents[i];
            var isPage = firedEvent.objectPath.length == 0;
            var targetObjIds = isPage ? [rdoId] : $ax.getElementIdsFromPath(firedEvent.objectPath, eventInfo);
            for (var j = 0; j < targetObjIds.length; j++) {
                var targetObjId = targetObjIds[j];
                var targetObj = isPage ? rdo : $ax.getObjectFromElementId(targetObjId);

                eventInfo.srcElement = targetObjId || '';

                eventInfo.isMasterEvent = false;
                var raisedEvents = firedEvent.raisedEventIds;
                if(raisedEvents) {
                    for(var k = 0; k < raisedEvents.length; k++) {
                        var event = targetObj.interactionMap && targetObj.interactionMap.raised && targetObj.interactionMap.raised[raisedEvents[k]];
                        if(event) $ax.event.handleEvent(targetObjId, eventInfo, event, false, true);
                    }
                }

                if(isPage) eventInfo.isMasterEvent = true;

                var firedTarget = isPage ? page : targetObj;
                var firedEventNames = firedEvent.firedEventNames;
                if(firedEventNames) {
                    for(k = 0; k < firedEventNames.length; k++) {
                        event = firedTarget.interactionMap && firedTarget.interactionMap[firedEventNames[k]];
                        if(event) $ax.event.handleEvent(isPage ? '' : targetObjId, eventInfo, event, false, true);
                    }
                }
                if(isPage) eventInfo.isMasterEvent = oldIsMasterEvent;
            }
            eventInfo.srcElement = objId;

            eventInfo.isMasterEvent = oldIsMasterEvent;
        }

        _dispatchAction(eventInfo, actions, index + 1);
    };
});

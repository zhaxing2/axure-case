// ******* AxQuery Plugins ******** //

$axure.internal(function($ax) {
    $ax.constants = {};

    $ax.constants.TABLE_TYPE = 'table';
    $ax.constants.MENU_OBJECT_TYPE = 'menuObject';
    $ax.constants.MASTER_TYPE = 'master';
    $ax.constants.PAGE_TYPE = 'page';
    $ax.constants.REFERENCE_DIAGRAM_OBJECT_TYPE = 'referenceDiagramObject';
    $ax.constants.REPEATER_TYPE = 'repeater';
    $ax.constants.DYNAMIC_PANEL_TYPE = 'dynamicPanel';
    $ax.constants.LAYER_TYPE = 'layer';
    $ax.constants.TEXT_BOX_TYPE = 'textBox';
    $ax.constants.TEXT_AREA_TYPE = 'textArea';
    $ax.constants.LIST_BOX_TYPE = 'listBox';
    $ax.constants.COMBO_BOX_TYPE = 'comboBox';
    $ax.constants.CHECK_BOX_TYPE = 'checkbox';
    $ax.constants.RADIO_BUTTON_TYPE = 'radioButton';
    $ax.constants.BUTTON_TYPE = 'button'; //html button
    $ax.constants.IMAGE_MAP_REGION_TYPE = 'imageMapRegion';
    $ax.constants.IMAGE_BOX_TYPE = 'imageBox';
    $ax.constants.VECTOR_SHAPE_TYPE = 'vectorShape';
    $ax.constants.SNAPSHOT_TYPE = 'screenshot';
    $ax.constants.TREE_NODE_OBJECT_TYPE = 'treeNodeObject';
    $ax.constants.TABLE_CELL_TYPE = 'tableCell';
    $ax.constants.VERTICAL_LINE_TYPE = 'verticalLine';
    $ax.constants.HORIZONTAL_LINE_TYPE = 'horizontalLine';
    $ax.constants.INLINE_FRAME_TYPE = 'inlineFrame';
    $ax.constants.ALL_TYPE = '*';

    $ax.public.fn.IsTable = function (type) { return type == $ax.constants.TABLE_TYPE; }
    $ax.public.fn.IsMenuObject = function (type) { return type == $ax.constants.MENU_OBJECT_TYPE; }
    $ax.public.fn.IsMaster = function (type) { return type == $ax.constants.MASTER_TYPE; }
    $ax.public.fn.IsPage = function (type) { return type == $ax.constants.PAGE_TYPE; }
    $ax.public.fn.IsReferenceDiagramObject = function (type) { return type == $ax.constants.REFERENCE_DIAGRAM_OBJECT_TYPE; }
    $ax.public.fn.IsRepeater = function (type) { return type == $ax.constants.REPEATER_TYPE; }
    $ax.public.fn.IsDynamicPanel = function (type) { return type == $ax.constants.DYNAMIC_PANEL_TYPE; }
    $ax.public.fn.IsLayer = function (type) { return type == $ax.constants.LAYER_TYPE; }
    $ax.public.fn.IsTextBox = function (type) { return type == $ax.constants.TEXT_BOX_TYPE; }
    $ax.public.fn.IsTextArea = function (type) { return type == $ax.constants.TEXT_AREA_TYPE; }
    $ax.public.fn.IsListBox = function (type) { return type == $ax.constants.LIST_BOX_TYPE; }
    $ax.public.fn.IsComboBox = function (type) { return type == $ax.constants.COMBO_BOX_TYPE; }
    $ax.public.fn.IsCheckBox = function (type) { return type == $ax.constants.CHECK_BOX_TYPE; }
    $ax.public.fn.IsRadioButton = function (type) { return type == $ax.constants.RADIO_BUTTON_TYPE; }
    $ax.public.fn.IsButton = function (type) { return type == $ax.constants.BUTTON_TYPE; }
    $ax.public.fn.IsIamgeMapRegion = function (type) { return type == $ax.constants.IMAGE_MAP_REGION_TYPE; }
    $ax.public.fn.IsImageBox = function (type) { return type == $ax.constants.IMAGE_BOX_TYPE; }
    $ax.public.fn.IsVector = function (type) { return type == $ax.constants.VECTOR_SHAPE_TYPE; }
    $ax.public.fn.IsSnapshot = function (type) { return type == $ax.constants.SNAPSHOT_TYPE; }
    $ax.public.fn.IsTreeNodeObject = function (type) { return type == $ax.constants.TREE_NODE_OBJECT_TYPE; }
    $ax.public.fn.IsTableCell = function (type) { return type == $ax.constants.TABLE_CELL_TYPE; }
    $ax.public.fn.IsInlineFrame = function (type) { return type == $ax.constants.INLINE_FRAME_TYPE; }

    var PLAIN_TEXT_TYPES = [$ax.constants.TEXT_BOX_TYPE, $ax.constants.TEXT_AREA_TYPE, $ax.constants.LIST_BOX_TYPE,
        $ax.constants.COMBO_BOX_TYPE, $ax.constants.CHECK_BOX_TYPE, $ax.constants.RADIO_BUTTON_TYPE, $ax.constants.BUTTON_TYPE];

    var _addJQueryFunction = function(name) {
        $ax.public.fn[name] = function() {
            var val = $.fn[name].apply(this.jQuery(), arguments);
            return arguments[0] ? this : val;
        };
    };
    var _jQueryFunctionsToAdd = ['text', 'val', 'css'];
    for (var jqueryFunctionIndex = 0; jqueryFunctionIndex < _jQueryFunctionsToAdd.length; jqueryFunctionIndex++) _addJQueryFunction(_jQueryFunctionsToAdd[jqueryFunctionIndex]);


    //    var _addJQueryEventFunction = function(name) {
    //        $ax.public.fn[name] = function() {
    //            $.fn[name].apply(this.jQuery(), arguments);
    //            return this;
    //        };
    //    };

    //    var _addJQueryEventFunction = function(name) {
    //        $ax.public.fn[name] = (function(nn) {
    //            return function() {
    //                $.fn[nn].apply(this.jQuery(), arguments);
    //                return this;
    //            };
    //        })(name);
    //    };

    var _addJQueryEventFunction = function(name) {
        $ax.public.fn[name] = function() {
            //With Martin - No idea why this is necessary. We tried encapsulating the function thinking it was related to closure (above),
            //but that didn't fix the problem. If we don't add this Repeaters will give "Uncaught TypeError: Object #<Object> has no method 'apply'"
            //here (but Indeterminately, often on larger/slower Repeaters) because it is Undefined. However it seems the catch is never hit
            //if we surround the statement with the try/catch. Perhaps the try/catch block creates a scope or closure.
            try {
                $.fn[name].apply(this.jQuery(), arguments);
            } catch(e) {
                console.log("Couldn't find the event: " + name);
            }

            return this;
        };
    };
    var _jQueryEventFunctionsToAdd = ['click', 'mouseenter', 'mouseleave', 'bind'];
    for(var jqueryEventIndex = 0; jqueryEventIndex < _jQueryEventFunctionsToAdd.length; jqueryEventIndex++) _addJQueryEventFunction(_jQueryEventFunctionsToAdd[jqueryEventIndex]);


    $ax.public.fn.openLink = function(url, includeVariables) {
        this.jQuery().each(function() {
            if(!($(this).is('iframe'))) {
                return;
            }

            var objIframe = $(this).get(0);

            $ax.navigate({
                url: url,
                target: "frame",
                includeVariables: includeVariables,
                frame: objIframe
            });
        });

        return this;
    };

    $ax.public.fn.SetPanelState = function(stateNumber, options, showWhenSet) {

        var animateInInfo = _getAnimateInfo(options && options.animateIn, 500);
        var animateOutInfo = _getAnimateInfo(options && options.animateOut, 500);

        var elementIds = this.getElementIds();

        for(var index = 0; index < elementIds.length; index++) {
            var elementId = elementIds[index];
            if ($ax.public.fn.IsDynamicPanel($ax.getTypeFromElementId(elementId))) {
                var stateName = $ax.visibility.GetPanelStateId(elementId, Number(stateNumber) - 1);
                var wasVisible = $ax.visibility.IsIdVisible(elementId);
                // If compressing because you are fit to content and the change of state may change size, must be before the change.
                if(options.compress && $ax.dynamicPanelManager.isIdFitToContent(elementId) && wasVisible) {
                    $ax.dynamicPanelManager.compressDelta(elementId, $ax.visibility.GetPanelState(elementId), stateName, options.vertical, options.compressEasing, options.compressDuration);
                }
                $ax.visibility.SetPanelState(elementId, stateName, animateOutInfo.easingType, animateOutInfo.direction, animateOutInfo.duration,
                    animateInInfo.easingType, animateInInfo.direction, animateInInfo.duration, showWhenSet);
                // If compressing because of a show, must be after state is set.
                if(options.compress && !wasVisible && showWhenSet) {
                    $ax.dynamicPanelManager.compressToggle(elementId, options.vertical, true, options.compressEasing, options.compressDuration);
                }
            }
        }

        return this;
    };

    $ax.public.fn.show = function(options, eventInfo) {
        var elementIds = this.getElementIds();

        for(var index = 0; index < elementIds.length; index++) {
            var elementId = elementIds[index];

            var lightboxId = $ax.repeater.applySuffixToElementId(elementId, '_lightbox');
            var lightbox = $jobj(lightboxId);
            if(options && options.showType == 'lightbox') {
                $ax.flyoutManager.unregisterPanel(elementId, true);
                // Add lightbox if there isn't one
                if(lightbox.length == 0) {
                    lightbox = $('<div></div>');
                    lightbox.attr('id', lightboxId);
                    var color = 'rgb(' + options.lightbox.r + ',' + options.lightbox.g + ',' + options.lightbox.b + ')';
                    lightbox.css({
                        position: 'fixed',
                        left: '0px',
                        top: '0px',
                        width: '10000px',
                        height: '10000px',
                        'background-color': color,
                        opacity: options.lightbox.a / 255
                    });

                    var parents = $ax('#' + elementId).getParents(true)[0];
                    var fixedParentPanelId = undefined;
                    for(var j = 0; j < parents.length; j++) {
                        var parentId = parents[j].split('_')[0];
                        var parentObj = $obj(parentId);
                        if($ax.public.fn.IsDynamicPanel(parentObj.type) && ($jobj(parentId).css('z-index') != 'auto' || $ax.features.supports.mobile)) {
                            fixedParentPanelId = parents[j];
                            break;
                        }
                    }

                    if(!fixedParentPanelId) $('#base').append(lightbox);
                    else $jobj(fixedParentPanelId).append(lightbox);

                    var wasVisible = $ax.visibility.IsIdVisible(elementId);

                    (function(lightbox, query) {
                        $ax.event.attachClick(lightbox, function() {
                            $ax.action.addAnimation(elementId, $ax.action.queueTypes.fade, function() {
                                if(!wasVisible) query.hide();
                                else $ax.action.fireAnimationFromQueue(elementId, $ax.action.queueTypes.fade);
                                lightbox.remove();
                            });
                        });
                    })(lightbox, this);
                }
                $ax.legacy.BringToFront(lightboxId, true);
                $ax.legacy.BringToFront(elementId, true);
            } else if(options && options.showType == 'flyout') {
                // Remove lightbox if there is one
                lightbox.remove();

                var src = eventInfo.thiswidget;
                var target = $ax.getWidgetInfo(elementId);
                var rects = {};
                if(src.valid) rects.src = $ax.geometry.genRect(src);
                if(target.valid) rects.target = $ax.geometry.genRect(target);
                $ax.flyoutManager.registerFlyout(rects, elementId, eventInfo.srcElement);
                //$ax.style.AddRolloverOverride(elementId);
                $ax.legacy.BringToFront(elementId);
            } else {
                // Remove lightbox, unregister flyout
                lightbox.remove();
                $ax.flyoutManager.unregisterPanel(elementId, true);

                _setVisibility(elementId, true, options);
                if(options && options.showType == 'front') $ax.legacy.BringToFront(elementId);

                continue;
            }
            _setVisibility(elementId, true, options);
        }

        return this;
    };

    var _getAnimateInfo = function(options, defaultDuration) {
        var animateInfo = {
            easingType: 'none',
            direction: '',
            duration: options && options.duration || defaultDuration
        };

        if(options && options.easing) {
            switch(options.easing) {
            case 'fade':
                animateInfo.easingType = 'fade';
                animateInfo.direction = '';
                break;
            case 'slideLeft':
                animateInfo.easingType = 'swing';
                animateInfo.direction = 'left';
                break;
            case 'slideRight':
                animateInfo.easingType = 'swing';
                animateInfo.direction = 'right';
                break;
            case 'slideUp':
                animateInfo.easingType = 'swing';
                animateInfo.direction = 'up';
                break;
            case 'slideDown':
                ;
                animateInfo.easingType = 'swing';
                animateInfo.direction = 'down';
                break;
            case 'flipLeft':
                animateInfo.easingType = 'flip';
                animateInfo.direction = 'left';
                break;
            case 'flipRight':
                animateInfo.easingType = 'flip';
                animateInfo.direction = 'right';
                break;
            case 'flipUp':
                animateInfo.easingType = 'flip';
                animateInfo.direction = 'up';
                break;
            case 'flipDown':
                animateInfo.easingType = 'flip';
                animateInfo.direction = 'down';
                break;
            }
        }

        return animateInfo;
    };

    $ax.public.fn.hide = function(options) {
        var elementIds = this.getElementIds();

        for(var index = 0; index < elementIds.length; index++) {
            var elementId = elementIds[index];
//            var wasShown = $ax.visibility.IsIdVisible(elementId);
            _setVisibility(elementId, false, options);
        }

        return this;
    };

    $ax.public.fn.toggleVisibility = function(options) {
        var elementIds = this.getElementIds();

        for (var index = 0; index < elementIds.length; index++) {
            var elementId = elementIds[index];
            var show = !$ax.visibility.IsIdVisible(elementId);
            _setVisibility(elementId, show, options);
        }

        return this;
    };

    var _setVisibility = function (elementId, value, options) {

        var animateInfo = _getAnimateInfo(options, 0);

        var wasShown = $ax.visibility.IsIdVisible(elementId);
        var compress = options && options.showType == 'compress' && wasShown != value;

        var compressed = false;
        var onComplete = function() {
            if(compress && !compressed) $ax.dynamicPanelManager.compressToggle(elementId, options.vertical, value, options.compressEasing, options.compressDuration);
            compressed = true;
            $ax.dynamicPanelManager.fitParentPanel(elementId);
        };
        $ax.visibility.SetWidgetVisibility(elementId, {
            value: value,
            easing: animateInfo.easingType,
            direction: animateInfo.direction,
            duration: animateInfo.duration,
            fire: true,
            onComplete: onComplete
        });
        if(compress && !compressed) $ax.dynamicPanelManager.compressToggle(elementId, options.vertical, value, options.compressEasing, options.compressDuration);
        compressed = true;
    };

    //move one widget.  I didn't combine moveto and moveby, since this is in .public, and separate them maybe more clear for the user
    var _move = function(elementId, x, y, options, moveTo) {
        var easing = 'none';
        var duration = 500;

        if(options && options.easing) {
            easing = options.easing;

            if(options.duration) {
                duration = options.duration;
            }
        }

        var obj = $obj(elementId);

        //if it's a layer, move its children here.  shouldn't move layer itself
        //i don't like to put this logic here, but boundary is a little special, move one widget inside a layer may change the layers current left/top
        if($ax.public.fn.IsLayer(obj.type)) {
            var childrenIds = $ax.public.fn.getLayerChildrenDeep(elementId);
            if(childrenIds.length == 0) return;

            for(var i = 0; i < childrenIds.length - 1; i++) {
                $ax.move.MoveWidget(childrenIds[i], x, y, easing, duration, moveTo,
                    function() { $ax.dynamicPanelManager.fitParentPanel(childrenIds[i]); }, false);
            }

            $ax.move.MoveWidget(childrenIds[i], x, y, easing, duration, moveTo,
                function () { $ax.dynamicPanelManager.fitParentPanel(childrenIds[i]); }, true, null, elementId);

            $ax.event.raiseSyntheticEvent(elementId, "onMove");
        } else if(obj.generateCompound && moveTo) {
            var location = _getCompoundImageLocation($jobj(elementId));
            $ax.move.MoveWidget(elementId, x - location.X, y - location.Y, easing, duration, false,
                function() { $ax.dynamicPanelManager.fitParentPanel(elementId); }, true);
        } else {
            $ax.move.MoveWidget(elementId, x, y, easing, duration, moveTo,
                function() { $ax.dynamicPanelManager.fitParentPanel(elementId); }, true);
        }
    };

    $ax.public.fn.moveTo = function (x, y, options) {
        var elementIds = this.getElementIds();
        for(var index = 0; index < elementIds.length; index++) {
            _move(elementIds[index], x, y, options, true);
        }

        return this;
    };

    $ax.public.fn.moveBy = function (x, y, options) {
        var elementIds = this.getElementIds();

        if(x == 0 && y == 0) {
            for(var i = 0; i < elementIds.length; i++) {
                var elementId = elementIds[i];
                $ax.move.nopMove(elementId);
                $ax.event.raiseSyntheticEvent(elementId, "onMove");
                $ax.action.fireAnimationFromQueue(elementId, $ax.action.queueTypes.move);
            }
            return this;
        }

        for(var index = 0; index < elementIds.length; index++) {
            _move(elementIds[index], x, y, options, false);
        }
        return this;
    };

    $ax.public.fn.circularMoveAndRotate = function(degreeChange, options, centerPointLeft, centerPointTop, doRotation, raiseMoveEvent) {
        var elementIds = this.getElementIds();

        for(var index = 0; index < elementIds.length; index++) {
            var elementId = elementIds[index];

            var obj = $obj(elementId);
            if(obj.generateCompound) {
                _rotateAroundCompound(elementId, { x: centerPointLeft, y: centerPointTop }, degreeChange, options.easing, options.duration, false, obj, doRotation);
            } else {
                //don't raise onMove on rotation
                $ax.move.circularMove(elementId, degreeChange, { x: centerPointLeft, y: centerPointTop }, options.easing, options.duration, true, raiseMoveEvent);
                if(doRotation) $ax.move.rotate(elementId, degreeChange, options.easing, options.duration, false, true);
                else $ax.action.fireAnimationFromQueue(elementId, $ax.action.queueTypes.rotate);
            }
        }
    };

    $ax.public.fn.rotate = function (degree, easing, duration, to, axShouldFire) {
        var elementIds = this.getElementIds();

        for(var index = 0; index < elementIds.length; index++) {
            var elementId = elementIds[index];
            degree = parseFloat(degree);

            var center = $ax.public.fn.getWidgetBoundingRect(elementId).centerPoint;

            var obj = $obj(elementId);
            if(obj.generateCompound) {
                _rotateAroundCompound(elementId, center, degree, easing, duration, to, obj, axShouldFire);

            } else {
                $ax.move.rotate(elementId, degree, easing, duration, to, axShouldFire);
            }
        }
    };

    var _rotateAroundCompound = function(elementId, center, degree, easing, duration, to, obj, axShouldFire) {
        var firstIdObject = $jobj(elementId);

        var degreeToUse = to ? degree - _getCompoundImageRotation(firstIdObject) : degree;


        for(var x = 0; x < firstIdObject[0].children.length; x++) {
            var childId = firstIdObject[0].children[x].id;
            if(childId.indexOf('p') >= 0) continue;
            $ax.move.circularMove(childId, degreeToUse, center, easing, duration, false, false);
            $ax.move.rotate(childId, degreeToUse, easing, duration, to, false);
        }

        for(var j = 0; j < obj.compoundChildren.length; j++) {
            var childId = elementId + obj.compoundChildren[j];
            $ax.move.circularMove(childId, degreeToUse, center, easing, duration, false, false);
            $ax.move.rotate(childId, degreeToUse, easing, duration, to, j == obj.compoundChildren.length - 1 ? axShouldFire : false);
        }
    };

    $ax.public.fn.resize = function(newLocationAndSizeCss, resizeInfo, axShouldFire, moves) {
        var elementIds = this.getElementIds();
        if(!elementIds) return;

        for(var index = 0; index < elementIds.length; index++) {
            var elementId = elementIds[index];

            var boundingRect = $ax.public.fn.getWidgetBoundingRect(elementId);
            var oldWidth = boundingRect.width;
            var oldHeight = boundingRect.height;
            var query = $jobj(elementId);

            var obj = $obj(elementId);
            var isDynamicPanel = $ax.public.fn.IsDynamicPanel(obj.type);
            if(isDynamicPanel) {
                // No longer fitToContent, calculate additional styling that needs to be done.
                $ax.dynamicPanelManager.setFitToContentCss(elementId, false, oldWidth, oldHeight);

                if ((obj.fixedHorizontal && obj.fixedHorizontal == 'center') || (obj.fixedVertical && obj.fixedVertical == 'middle')) {
                    moves = true;
                    var loc = $ax.dynamicPanelManager.getFixedPosition(elementId, oldWidth, oldHeight, newLocationAndSizeCss.width, newLocationAndSizeCss.height);
                    if(loc) {
                        if(loc[0] != 0 && !$ax.dynamicPanelManager.isPercentWidthPanel(obj)) newLocationAndSizeCss['margin-left'] = '+=' + loc[0];
                        if(loc[1] != 0) newLocationAndSizeCss['margin-top'] = '+=' + loc[1];
                    }
                }

                var onComplete = function() {
                    $ax.flyoutManager.updateFlyout(elementId);
                    $ax.dynamicPanelManager.fitParentPanel(elementId);
                    $ax.dynamicPanelManager.updatePanelPercentWidth(elementId);
                    $ax.dynamicPanelManager.updatePanelContentPercentWidth(elementId);
                    //$ax.event.raiseSyntheticEvent(elementId, 'onResize');
                    if (axShouldFire) $ax.action.fireAnimationFromQueue(elementId, $ax.action.queueTypes.resize);
                    if(moves) {
                        //$ax.event.raiseSyntheticEvent(elementId, 'onMove');
                        if (axShouldFire) $ax.action.fireAnimationFromQueue(elementId, $ax.action.queueTypes.move);
                    }
                };

            } else {
                //if widget use sketchy image, get resize info for it
                var sketchyId = $ax.repeater.applySuffixToElementId(elementId, '_image_sketch');
                var sketchyImage = document.getElementById(sketchyId);
                if(sketchyImage) {
                    //sketchy has width/height offset, after resize we want to keep this offset
                    var widthOffset = $ax('#' + sketchyId).width() - oldWidth;
                    var heightOffset = $ax('#' + sketchyId).height() - oldHeight;
                    var sketchyImageCss = { width: newLocationAndSizeCss.width + widthOffset, height: newLocationAndSizeCss.height + heightOffset };
                }

                //if contains text
                var textChildren = query.children('div.text');
                if (textChildren && textChildren.length != 0) {
                    var textDivId = textChildren.attr('id');
                    var textObj = $ax('#' + textDivId);
                    var leftPadding = textObj.left();
                    var rightPadding = oldWidth - leftPadding - textObj.width();
                    //greater or equal to 1px
                    var newTextWidth = Math.max(newLocationAndSizeCss.width - leftPadding - rightPadding, 1);
                    var textChildCss = { width: newTextWidth };

                    var pElementChild = textChildren.children('p')[0];
                    var textStepFunction = function() {
                        //change the width of the text div may effect the height
                        var currentTextHeight = Number($(pElementChild).css('height').replace('px', ''));
                        textChildren.css('height', currentTextHeight);
                        $ax.style.updateTextAlignmentForVisibility(textDivId);
                    };
                }

                //get all the other children that matters
                onComplete = function() {
                    $ax.dynamicPanelManager.fitParentPanel(elementId);
                    //$ax.event.raiseSyntheticEvent(elementId, 'onResize');
                    if (axShouldFire) $ax.action.fireAnimationFromQueue(elementId, $ax.action.queueTypes.resize);
                    if (moves) {
                        //$ax.event.raiseSyntheticEvent(elementId, 'onMove');
                        if (axShouldFire) $ax.action.fireAnimationFromQueue(elementId, $ax.action.queueTypes.move);
                    }
                };
            }

            var children = query.children();
            if(children && children.length !== 0) {
                var childCss = { width: newLocationAndSizeCss.width, height: newLocationAndSizeCss.height };
                //there are elements like inputs, come with a padding and border, so need to use outerwidth for starting point, due to jquery 1.7 css() on width/height bugs
                var childSizingObj = { width: children.outerWidth(), height: children.outerHeight() };
            }

            if(!resizeInfo.easing || resizeInfo.easing == 'none') {
                query.animate(newLocationAndSizeCss, 0);
                if(childCss) children.animate(childCss, 0);
                if(sketchyImage && sketchyImageCss) $(sketchyImage).animate(sketchyImageCss, 0);
                if(textChildCss) {
                    textChildren.animate(textChildCss, {
                        duration: 0,
                        step: textStepFunction
                    });
                }
                $ax.event.raiseSyntheticEvent(elementId, 'onResize');
                onComplete();
            } else {
                if(sketchyImage && sketchyImageCss) $(sketchyImage).animate(sketchyImageCss, resizeInfo.duration, resizeInfo.easing);
                if(childCss) {
                    $(childSizingObj).animate(childCss, {
                        queue: false,
                        duration: resizeInfo.duration,
                        easing: resizeInfo.easing,
                        step: function(now, tween) {
                            children.each(function(stepIndex, value) {
                                $(value).css(tween.prop, now);
                            });
                        }
                    });
                }

                if(textChildCss) {
                    textChildren.animate(textChildCss, {
                        queue: false,
                        duration: resizeInfo.duration,
                        easing: resizeInfo.easing,
                        step: textStepFunction
                    });
                }

                if(isDynamicPanel) query.animate(newLocationAndSizeCss, { queue: false, duration: resizeInfo.duration, easing: resizeInfo.easing, complete: onComplete});
                else {
                    //jquery 1.7 uses jquery.css() to set and get width and height property, getter for width/height doesn't included border and padding
                    //but when you set it use .css, it included the border and padding, so you will see the widget shrink before animate to new size
                    var position = query.position();

                    var sizingObj = { width: oldWidth, height: oldHeight, left: position.left, top: position.top }

                    $(sizingObj).animate(newLocationAndSizeCss, {
                        queue: false,
                        duration: resizeInfo.duration,
                        easing: resizeInfo.easing,
                        step: function (now, tween) {
                            if(now) query.css(tween.prop, now);
                        },
                        complete: onComplete
                    });
                }
                $ax.event.raiseSyntheticEvent(elementId, 'onResize');
            }
        }
    };

    var _getCompoundImageRotation = function(query) {
        var fourCorners = _getFourCorners(query);
        return Math.atan2(fourCorners.widgetTopRightY - fourCorners.widgetTopLeftY, fourCorners.widgetTopRightX - fourCorners.widgetTopLeftX) * (180 / Math.PI);
    }

    var _getCompoundImageLocation = function(query) {
        var fourCorners = _getFourCorners(query);

        var height = _l2(fourCorners.widgetBottomLeftX - fourCorners.widgetTopLeftX, fourCorners.widgetBottomLeftY - fourCorners.widgetTopLeftY);
        var width = _l2(fourCorners.widgetTopRightX - fourCorners.widgetTopLeftX, fourCorners.widgetTopRightY - fourCorners.widgetTopLeftY);

        return {
            X: (fourCorners.widgetTopLeftX + fourCorners.widgetBottomRightX - width) / 2.0,
            Y: (fourCorners.widgetTopLeftY + fourCorners.widgetBottomRightY - height) / 2.0
        };
    }

    var _l2 = function(x, y) { return Math.sqrt(x * x + y * y); }

    var _getCompoundImageBoundingClientSize = function(element) {
        var query = $jobj(element.id);

        //if(query[0].style.visibility == 'hidden' || query[0].style.display == 'none') {
        //    return {
        //        width: 0,
        //        height: 0,
        //        left: 0,
        //        right: 0,
        //        top: 0,
        //        bottom: 0
        //    };
        //}

        var fourCorners = _getFourCorners(query);

        var maxLeft = Math.min(fourCorners.widgetBottomRightX, fourCorners.widgetTopRightX, fourCorners.widgetBottomLeftX, fourCorners.widgetTopLeftX);
        var maxRight = Math.max(fourCorners.widgetBottomRightX, fourCorners.widgetTopRightX, fourCorners.widgetBottomLeftX, fourCorners.widgetTopLeftX);
        var maxTop = Math.min(fourCorners.widgetBottomRightY, fourCorners.widgetTopRightY, fourCorners.widgetBottomLeftY, fourCorners.widgetTopLeftY);
        var maxBottom = Math.max(fourCorners.widgetBottomRightY, fourCorners.widgetTopRightY, fourCorners.widgetBottomLeftY, fourCorners.widgetTopLeftY);


        return {
            width: maxRight - maxLeft,
            height: maxBottom - maxTop,
            left: maxLeft,
            right: maxRight,
            top: maxTop,
            bottom: maxBottom
        };

    }

    var _getFourCorners = function(query) {
        
        var splitByDash = query[0].id.split('-');
        var idComponent = splitByDash[0] + 'p';

        for(var x = 0; x < query[0].children.length; x++) {
            var childId = query[0].children[0].id;
            if(childId.indexOf(idComponent) >= 0) break;
        }
        
        var offset = $jobj(query[0].id).offset();

        var thisElt = query[0].children[x];
        var query = $jobj(childId);
        var thisEltLeft = Number(query.css('left').replace('px', '')) + offset.left;
        var thisEltTop = Number(query.css('top').replace('px', '')) + offset.top;
        var thisEltWidth = Number(query.css('width').replace('px', ''));
        var thisEltHeight = Number(query.css('height').replace('px', ''));

        var thisEltCenterX = thisEltLeft + thisEltWidth / 2.0;
        var thisEltCenterY = thisEltTop + thisEltHeight / 2.0;
        var st = window.getComputedStyle(thisElt, null);

        var tr = st.getPropertyValue("-webkit-transform") ||
            st.getPropertyValue("-moz-transform") ||
            st.getPropertyValue("-ms-transform") ||
            st.getPropertyValue("-o-transform") ||
            st.getPropertyValue("transform");
        
        if(tr.indexOf('none') < 0) {
            var matrix = tr.split('(')[1];
            matrix = matrix.split(')')[0];
            matrix = matrix.split(',');
        } else {
            matrix = [1, 0];
        }

        var rotatedWidthX = thisEltWidth * matrix[0];
        var rotatedWidthY = thisEltWidth * matrix[1];
        var rotatedHeightX = -thisEltHeight * matrix[1];
        var rotatedHeightY = thisEltHeight * matrix[0];

        var widgetBottomRightXRotated = Number(thisElt.getAttribute('widgetbottomrightx'));
        var widgetBottomRightYRotated = Number(thisElt.getAttribute('widgetbottomrighty'));
        var widgetTopRightXRotated = Number(thisElt.getAttribute('widgettoprightx'));
        var widgetTopRightYRotated = Number(thisElt.getAttribute('widgettoprighty'));
        var widgetBottomLeftXRotated = Number(thisElt.getAttribute('widgetbottomleftx'));
        var widgetBottomLeftYRotated = Number(thisElt.getAttribute('widgetbottomlefty'));
        var widgetTopLeftXRotated = Number(thisElt.getAttribute('widgettopleftx'));
        var widgetTopLeftYRotated = Number(thisElt.getAttribute('widgettoplefty'));

        return {
            widgetBottomRightX: (widgetBottomRightXRotated * rotatedWidthX + widgetBottomRightYRotated * rotatedHeightX) + thisEltCenterX,
            widgetBottomRightY: (widgetBottomRightXRotated * rotatedWidthY + widgetBottomRightYRotated * rotatedHeightY) + thisEltCenterY,
            widgetTopRightX: (widgetTopRightXRotated * rotatedWidthX + widgetTopRightYRotated * rotatedHeightX) + thisEltCenterX,
            widgetTopRightY: (widgetTopRightXRotated * rotatedWidthY + widgetTopRightYRotated * rotatedHeightY) + thisEltCenterY,
            widgetBottomLeftX: (widgetBottomLeftXRotated * rotatedWidthX + widgetBottomLeftYRotated * rotatedHeightX) + thisEltCenterX,
            widgetBottomLeftY: (widgetBottomLeftXRotated * rotatedWidthY + widgetBottomLeftYRotated * rotatedHeightY) + thisEltCenterY,
            widgetTopLeftX: (widgetTopLeftXRotated * rotatedWidthX + widgetTopLeftYRotated * rotatedHeightX) + thisEltCenterX,
            widgetTopLeftY: (widgetTopLeftXRotated * rotatedWidthY + widgetTopLeftYRotated * rotatedHeightY) + thisEltCenterY
        };
    }

    $ax.public.fn.bringToFront = function() {
        var elementIds = this.getElementIds();

        for(var index = 0; index < elementIds.length; index++) {
            $ax.legacy.BringToFront(elementIds[index]);
        }

        return this;
    };

    $ax.public.fn.sendToBack = function() {
        var elementIds = this.getElementIds();

        for(var index = 0; index < elementIds.length; index++) {
            $ax.legacy.SendToBack(elementIds[index]);
        }

        return this;
    };

    $ax.public.fn.text = function() {
        if(arguments[0] == undefined) {
            var firstId = this.getElementIds()[0];

            if(!firstId) {
                return undefined;
            }

            return getWidgetText(firstId);
        } else {
            var elementIds = this.getElementIds();

            for(var index = 0; index < elementIds.length; index++) {
                var currentItem = elementIds[index];

                var widgetType = $ax.getTypeFromElementId(currentItem);

                if($ax.public.fn.IsTextBox(widgetType) || $ax.public.fn.IsTextArea(widgetType)) { //For non rtf
                    SetWidgetFormText(currentItem, arguments[0]);
                } else {
                    var idRtf = '#' + currentItem;
                    if($(idRtf).length == 0) idRtf = '#u' + (Number(currentItem.substring(1)) + 1);

                    if($(idRtf).length != 0) {
                        //If the richtext div already has some text in it,
                        //preserve only the first style and get rid of the rest
                        //If no pre-existing p-span tags, don't do anything
                        if($(idRtf).find('p').find('span').length > 0) {
                            $(idRtf).find('p:not(:first)').remove();
                            $(idRtf).find('p').find('span:not(:first)').remove();

                            //Replace new-lines with NEWLINE token, then html encode the string,
                            //finally replace NEWLINE token with linebreak
                            var textWithLineBreaks = arguments[0].replace(/\n/g, '--NEWLINE--');
                            var textHtml = $('<div/>').text(textWithLineBreaks).html();
                            $(idRtf).find('span').html(textHtml.replace(/--NEWLINE--/g, '<br>'));
                        }
                    }
                }
            }

            return this;
        }
    };

    var getWidgetText = function(id) {
        var idQuery = $jobj(id);
        var inputQuery = $jobj($ax.INPUT(id));
        if(inputQuery.length) idQuery = inputQuery;

        if (idQuery.is('input') && ($ax.public.fn.IsCheckBox(idQuery.attr('type')) || idQuery.attr('type') == 'radio')) {
            idQuery = idQuery.parent().find('label').find('div');
        }

        if(idQuery.is('div')) {
            var $rtfObj = idQuery.hasClass('text') ? idQuery : idQuery.find('.text');
            if($rtfObj.length == 0) return undefined;

            var textOut = '';
            $rtfObj.children('p').each(function(index) {
                if(index != 0) textOut += '\n';

                //Replace line breaks (set in SetWidgetRichText) with newlines and nbsp's with regular spaces.
                var htmlContent = $(this).html().replace(/<br[^>]*>/ig, '\n').replace(/&nbsp;/ig, ' ');
                textOut += $(htmlContent).text();
            });

            return textOut;
        } else {
            var val = idQuery.val();
            return val == undefined ? '' : val;
        }
    };

    $ax.public.fn.setRichTextHtml = function() {
        if(arguments[0] == undefined) {
            //No getter function, so just return undefined
            return undefined;
        } else {
            var elementIds = this.getElementIds();

            for(var index = 0; index < elementIds.length; index++) {
                var currentItem = elementIds[index];

                var widgetType = $ax.getTypeFromElementId(currentItem);
                if ($ax.public.fn.IsTextBox(widgetType) || $ax.public.fn.IsTextArea(widgetType)) { //Do nothing for non rtf
                    continue;
                } else {
                    //TODO -- [mas] fix this!
                    var idRtf = '#' + currentItem;
                    if($(idRtf).length == 0) idRtf = '#u' + (parseInt(currentItem.substring(1)) + 1);
                    if($(idRtf).length != 0) SetWidgetRichText(idRtf, arguments[0]);
                }
            }

            return this;
        }
    };

    $ax.public.fn.value = function() {
        if(arguments[0] == undefined) {
            var firstId = this.getElementIds()[0];

            if(!firstId) {
                return undefined;
            }

            var widgetType = $ax.getTypeFromElementId(firstId);

            if ($ax.public.fn.IsComboBox(widgetType) || $ax.public.fn.IsListBox(widgetType)) { //for select lists and drop lists
                return $('#' + firstId + ' :selected').text();
            } else if ($ax.public.fn.IsCheckBox(widgetType) || $ax.public.fn.IsRadioButton(widgetType)) { //for radio/checkboxes
                return $('#' + firstId + '_input').is(':checked');
            } else if ($ax.public.fn.IsTextBox(widgetType)) { //for text box
                return $('#' + firstId + '_input').val();
            } else { //for text based form elements
                return this.jQuery().first().val();
            }
        } else {
            var elementIds = this.getElementIds();

            for(var index = 0; index < elementIds.length; index++) {
                var widgetType = $ax.getTypeFromElementId(elementIds[index]);

                var elementIdQuery = $('#' + elementIds[index]);

                if ($ax.public.fn.IsCheckBox(widgetType) || $ax.public.fn.IsRadioButton(widgetType)) { //for radio/checkboxes
                    if(arguments[0] == true) {
                        elementIdQuery.attr('checked', true);
                    } else if(arguments[0] == false) {
                        elementIdQuery.removeAttr('checked');
                    }
                } else { //For select lists, drop lists, text based form elements
                    elementIdQuery.val(arguments[0]);
                }
            }

            return this;
        }
    };

    $ax.public.fn.checked = function() {
        if(arguments[0] == undefined) {
            return this.selected();
        } else {
            this.selected(arguments[0]);
            return this;
        }
    };

    var _getRelativeLeft = function (id, parent) {
        var currentNode = window.document.getElementById(id).offsetParent;
        var left = $ax('#' + id).left(true);
        while (currentNode != null && currentNode.tagName != "BODY" && currentNode != parent) {
            left += currentNode.offsetLeft;
            currentNode = currentNode.offsetParent;
        }
        return left;
    };

    var _getRelativeTop = function(id, parent) {
        var currentNode = window.document.getElementById(id).offsetParent;
        var top = $ax('#' + id).top(true);
        while(currentNode != null && currentNode.tagName != "BODY" && currentNode != parent) {
            top += currentNode.offsetTop;
            currentNode = currentNode.offsetParent;
        }
        return top;
    };

    var _scrollHelper = function(id, scrollX, scrollY, easing, duration) {
        var target = window.document.getElementById(id);
        var scrollable = $ax.legacy.GetScrollable(target);
        var targetLeft = _getRelativeLeft(id, scrollable);
        var targetTop = _getRelativeTop(id, scrollable);
        if(!scrollX) targetLeft = scrollable.scrollLeft;
        if(!scrollY) targetTop = scrollable.scrollTop;

        var $scrollable = $(scrollable);
        if($scrollable.is('body')) {
            $scrollable = $('html,body');
        }

        if(easing == 'none') {
            if(scrollY) $scrollable.scrollTop(targetTop);
            if(scrollX) $scrollable.scrollLeft(targetLeft);
        } else {
            if(!scrollX) {
                $scrollable.animate({ scrollTop: targetTop }, duration, easing);
            } else if(!scrollY) {
                $scrollable.animate({ scrollLeft: targetLeft }, duration, easing);
            } else {
                $scrollable.animate({ scrollTop: targetTop, scrollLeft: targetLeft }, duration, easing);
            }
        }
    };

    $ax.public.fn.scroll = function(scrollOption) {
        var easing = 'none';
        var duration = 500;

        if(scrollOption && scrollOption.easing) {
            easing = scrollOption.easing;

            if(scrollOption.duration) {
                duration = scrollOption.duration;
            }
        }

        var scrollX = true;
        var scrollY = true;

        if(scrollOption.direction == 'vertical') {
            scrollX = false;
        } else if(scrollOption.direction == 'horizontal') {
            scrollY = false;
        }

        var elementIds = this.getElementIds();
        for(var index = 0; index < elementIds.length; index++) {
            //            if($ax.getTypeFromElementId(elementIds[index]) == IMAGE_MAP_REGION_TYPE) {
            _scrollHelper(elementIds[index], scrollX, scrollY, easing, duration);
            //            }
        }

        return this;
    };

    $ax.public.fn.enabled = function() {
        if(arguments[0] == undefined) {
            var firstId = this.getElementIds()[0];
            if(!firstId) return undefined;

            var widgetType = $ax.getTypeFromElementId(firstId);
            if ($ax.public.fn.IsImageBox(widgetType) || $ax.public.fn.IsVector(widgetType)) return !$ax.style.IsWidgetDisabled(firstId);
            else return this.jQuery().first().not(':disabled').length > 0;
        } else {
            var elementIds = this.getElementIds();

            for(var index = 0; index < elementIds.length; index++) {
                var elementId = elementIds[index];
                var widgetType = $ax.getTypeFromElementId(elementId);

                var enabled = arguments[0];
                if ($ax.public.fn.IsImageBox(widgetType) || $ax.public.fn.IsVector(widgetType)) $ax.style.SetWidgetEnabled(elementId, enabled);
                if ($ax.public.fn.IsDynamicPanel(widgetType) || $ax.public.fn.IsLayer(widgetType)) {
                    $ax.style.SetWidgetEnabled(elementId, enabled);
                    var children = this.getChildren()[index].children;
                    for(var i = 0; i < children.length; i++) {
                        $axure('#' + children[i]).enabled(enabled);
                    }
                }
                var obj = $obj(elementId);
                var images = obj.images;
                if(PLAIN_TEXT_TYPES.indexOf(widgetType) != -1 && images) {
                    var img = $jobj($ax.repeater.applySuffixToElementId(elementId, '_image_sketch'));
                    var key = (enabled ? 'normal~' : 'disabled~') + ($ax.adaptive.currentViewId || '');
                    img.attr('src', images[key]);

                }
                var jobj = $jobj(elementId);
                var input = $jobj($ax.INPUT(elementId));
                if(input.length) jobj = input;

                if (OS_MAC && WEBKIT && $ax.public.fn.IsComboBox(widgetType)) jobj.css('color', enabled ? '' : 'grayText');

                if(enabled) jobj.removeAttr('disabled');
                else jobj.attr('disabled', 'disabled');
            }

            return this;
        }
    };

    $ax.public.fn.visible = function() {
        var ids = this.getElementIds();
        for(var index = 0; index < ids.length; index++) $ax.visibility.SetIdVisible(ids[index], arguments[0]);
        return this;
    };

    $ax.public.fn.selected = function() {
        if(arguments[0] == undefined) {
            var firstId = this.getElementIds()[0];
            if(!firstId) return undefined;

            var widgetType = $ax.getTypeFromElementId(firstId);
            if ($ax.public.fn.IsTreeNodeObject(widgetType)) {
                var treeNodeButtonShapeId = '';
                var allElementIds = $ax.getAllElementIds();
                for(var i = 0; i < allElementIds.length; i++) {
                    var elementId = allElementIds[i];
                    var currObj = $ax.getObjectFromElementId(elementId);

                    if ($ax.public.fn.IsVector(currObj.type) && currObj.parent && currObj.parent.scriptIds && currObj.parent.scriptIds[0] == firstId) {
                        treeNodeButtonShapeId = elementId;
                        break;
                    }
                }

                if(treeNodeButtonShapeId == '') return undefined;
                return $ax.style.IsWidgetSelected(treeNodeButtonShapeId);
            } else if ($ax.public.fn.IsImageBox(widgetType) || $ax.public.fn.IsVector(widgetType) || $ax.public.fn.IsTableCell(widgetType) || $ax.public.fn.IsDynamicPanel(widgetType) || $ax.public.fn.IsLayer(widgetType)) {
                return $ax.style.IsWidgetSelected(firstId);
            } else if ($ax.public.fn.IsCheckBox(widgetType) || $ax.public.fn.IsRadioButton(widgetType)) {
                return $jobj($ax.INPUT(firstId)).prop('checked');
            }
            return this;
        }
        var elementIds = this.getElementIds();
        var func = typeof (arguments[0]) === 'function' ? arguments[0] : null;
        var enabled = arguments[0]; // If this is a function it will be overridden with the return value;

        for(var index = 0; index < elementIds.length; index++) {
            var elementId = elementIds[index];
            if(func) {
                enabled = func($axure('#' + elementId));
            }

            var widgetType = $ax.getTypeFromElementId(elementId);

            if ($ax.public.fn.IsTreeNodeObject(widgetType)) { //for tree node
                var treeRootId = $('#' + elementIds[index]).parents('.treeroot').attr('id');

                var treeNodeButtonShapeId = '';
                var childElementIds = $jobj(elementId).children();
                for(var i = 0; i < childElementIds.length; i++) {
                    var elementId = childElementIds[i].id;
                    var currObj = $ax.getObjectFromElementId(elementId);

                    if(currObj && currObj.type == BUTTON_SHAPE_TYPE && currObj.parent &&
                        currObj.parent.scriptIds && currObj.parent.scriptIds[0] == elementIds[index]) {
                        treeNodeButtonShapeId = elementId;
                        break;
                    }
                }

                if(treeNodeButtonShapeId == '') continue;

                $ax.tree.SelectTreeNode(elementId, enabled);
            } else if ($ax.public.fn.IsImageBox(widgetType) || $ax.public.fn.IsVector(widgetType) || $ax.public.fn.IsVector(widgetType) || $ax.public.fn.IsTableCell(widgetType) || $ax.public.fn.IsDynamicPanel(widgetType) || $ax.public.fn.IsLayer(widgetType)) {
                $ax.style.SetWidgetSelected(elementIds[index], enabled);
            } else if ($ax.public.fn.IsCheckBox(widgetType) || $ax.public.fn.IsRadioButton(widgetType)) {
                var query = $jobj($ax.INPUT(elementId));
                var curr = query.prop('checked');
                //NOTE: won't fire onselect nore onunselect event if states didn't changes
                if(curr != enabled) {
                    query.prop('checked', enabled);
                    $ax.event.TryFireCheckChanged(elementId, enabled);
                }
            }
        }
        return this;
    };

    $ax.public.fn.focus = function() {
        var firstId = this.getElementIds()[0];
        var focusableId = $ax.event.getFocusableWidgetOrChildId(firstId);
        $('#' + focusableId).focus();

        return this;
    };

    $ax.public.fn.expanded = function() {
        if(arguments[0] == undefined) {
            var firstId = this.getElementIds()[0];
            return firstId && !$ax.public.fn.IsTreeNodeObject($ax.getTypeFromElementId(firstId)) && $ax.visibility.IsIdVisible(firstId + '_children');
        } else {
            var elementIds = this.getElementIds();

            for(var index = 0; index < elementIds.length; index++) {
                if ($ax.public.fn.IsTreeNodeObject($ax.getTypeFromElementId(elementIds[index]))) {
                    var treeNodeId = elementIds[index];
                    var childContainerId = treeNodeId + '_children';

                    var scriptId = $ax.repeater.getScriptIdFromElementId(treeNodeId);
                    var itemId = $ax.repeater.getItemIdFromElementId(treeNodeId);
                    var plusMinusId = 'u' + (parseInt(scriptId.substring(1)) + 1);
                    if(itemId) plusMinusId = $ax.repeater.createElementId(plusMinusId, itemId);
                    if($('#' + childContainerId).length == 0 || !$jobj(plusMinusId).children().first().is('img'))
                        plusMinusId = '';

                    if(arguments[0] == true) {
                        $ax.tree.ExpandNode(treeNodeId, childContainerId, plusMinusId);
                    } else if(arguments[0] == false) {
                        $ax.tree.CollapseNode(treeNodeId, childContainerId, plusMinusId);
                    }
                }
            }

            return this;
        }
    };

    $ax.public.fn.width = function() {
        var firstId = this.getElementIds()[0];
        if(!firstId) return undefined;

        var object = $ax.getObjectFromElementIdDisregardHex(firstId);
        if(object && (object.type == 'layer' || object.generateCompound)) {
            var boundingRect = _getWidgetBoundingRect(firstId);
            return boundingRect.width;
        }

        var firstIdObject = $jobj(firstId);

        return firstIdObject.outerWidth();
    };

    $ax.public.fn.height = function() {
        var firstId = this.getElementIds()[0];
        if(!firstId) return undefined;

        var object = $ax.getObjectFromElementIdDisregardHex(firstId);
        if(object && (object.type == 'layer' || object.generateCompound)) {
            var boundingRect = _getWidgetBoundingRect(firstId);
            return boundingRect.height;
        }

        var firstIdObject = $jobj(firstId);

        return firstIdObject.outerHeight();
    };

    $ax.public.fn.readAttribute = function(object, attribute) {
        if(object && object.hasAttribute(attribute)) {
            return object.getAttribute(attribute);
        }
        return null;
    };

    $ax.public.fn.left = function (relative) {
        var firstId = this.getElementIds()[0];
        if(!firstId) return undefined;

        var left = _getLoc(firstId, false, false, relative);
        var body = $('body');
        if(body.css('position') == 'relative') left -= (Number(body.css('left').replace('px', '')) + Math.max(0, ($(window).width() - body.width()) / 2));
        return left;
    };

    $ax.public.fn.top = function(relative) {
        var firstId = this.getElementIds()[0];
        return firstId && _getLoc(firstId, true, false, relative);
    };

    var _getLoc = function(id, vert, high, relative) {
        var mathFunc = high ? 'max' : 'min';
        var prop = vert ? 'top' : 'left';

        var obj = $jobj(id);
        var oldDisplay = obj.css('display');
        var displaySet = false;
        if(oldDisplay == 'none') {
            obj.css('display', '');
            displaySet = true;
        }
        var loc = $ax.getNumFromPx(obj.css(prop));
        if (!relative) {
            var parents = $ax('#' + id).getParents(true)[0];
            for (var i = 0; i < parents.length; i++) {
                var parent = $jobj($ax.visibility.getWidgetFromContainer(parents[0]));
                // Rdo has no element, but id is still included
                if (!parent.length) continue;
                loc += $ax.getNumFromPx(parent.css(prop));
            }
        }

        if(high) loc += obj[vert ? 'height' : 'width']();

        // Special Layer code
        if($ax.getTypeFromElementId(id) == 'layer') {
            var first = true;
            var children = $obj(id).objs;
            for(var i = 0; i < children.length; i++) {
                var childId = $ax.getElementIdFromPath([children[i].id], { relativeTo: id });
                var childProp = _getLoc(childId, vert, high, relative);
                if(first) loc = childProp;
                else loc = Math[mathFunc](loc, childProp);
                first = false;
            }
        }

        if(displaySet) obj.css('display', oldDisplay);

        //        var body = $('body');
        //        if (body.css('position') == 'relative') loc -= (Number(body.css(loc).replace('px', '')) + Math.max(0, ($(window).width() - body.width()) / 2));
        return loc;
    };

    var _getLayerChildrenDeep = $ax.public.fn.getLayerChildrenDeep = function (layerId, includeLayers) {
        var deep = [];
        var children = $ax('#' + layerId).getChildren()[0].children;
        for (var index = 0; index < children.length; index++) {
            var childId = children[index];
            if($ax.public.fn.IsLayer($obj(childId).type)) {
                if(includeLayers) deep.push(childId);
                var recursiveChildren = _getLayerChildrenDeep(childId, includeLayers);
                for (var j = 0; j < recursiveChildren.length; j++) deep.push(recursiveChildren[j]);
            } else deep.push(childId);
        }
        return deep;
    };

    var _getBoundingRectForMultipleWidgets = $ax.public.fn.getBoundingRectForMultipleWidgets = function (widgetsIdArray) {
        if (!widgetsIdArray || widgetsIdArray.constructor !== Array) return undefined;
        if (widgetsIdArray.length == 0) return { left: 0, top: 0, centerPoint: { x: 0, y: 0 }, width: 0, height: 0 };
        var widgetRect = _getBoundingRectForSingleWidget(widgetsIdArray[0], true);
        var boundingRect = { left: widgetRect.left, right: widgetRect.right, top: widgetRect.top, bottom: widgetRect.bottom };

        for (var index = 1; index < widgetsIdArray.length; index++) {
            widgetRect = _getBoundingRectForSingleWidget(widgetsIdArray[index]);
            boundingRect.left = Math.min(boundingRect.left, widgetRect.left);
            boundingRect.top = Math.min(boundingRect.top, widgetRect.top);
            boundingRect.right = Math.max(boundingRect.right, widgetRect.right);
            boundingRect.bottom = Math.max(boundingRect.bottom, widgetRect.bottom);
        }

        var centerx = (boundingRect.right - boundingRect.left) / 2 + boundingRect.left;
        var centery = (boundingRect.bottom - boundingRect.top) / 2 + boundingRect.top;
        boundingRect.centerPoint = { x: centerx, y: centery };
        boundingRect.width = boundingRect.right - boundingRect.left;
        boundingRect.height = boundingRect.bottom - boundingRect.top;
        return boundingRect;
    };

    var _getBoundingRectForSingleWidget = function(widgetId, justSides) {
        var xOffset = window.pageXOffset || document.documentElement.scrollLeft;
        var yOffset = window.pageYOffset || document.documentElement.scrollTop;

        var element = document.getElementById(widgetId);

        var boundingRect;
        var displayChanged = _displayHackStart(element);
        // Don't think compound needs to be handled here
        if(_isCompoundVectorHtml(element)) boundingRect = _getCompoundImageBoundingClientSize(element);
        else {
            var tempBoundingRect = element.getBoundingClientRect();

            boundingRect = {
                left: tempBoundingRect.left + xOffset,
                right: tempBoundingRect.right + xOffset,
                top: tempBoundingRect.top + yOffset,
                bottom: tempBoundingRect.bottom + yOffset
            };
        }

        _displayHackEnd(displayChanged);
        if(justSides) return boundingRect;

        boundingRect.centerPoint = {
            x: (boundingRect.right - boundingRect.left) / 2 + boundingRect.left,
            y: (boundingRect.bottom - boundingRect.top) / 2 + boundingRect.top
        };
        boundingRect.width = Math.round((boundingRect.right - boundingRect.left));
        boundingRect.height = Math.round((boundingRect.bottom - boundingRect.top));

        return boundingRect;
    };

    var emptyRect = { left: 0, top: 0, centerPoint: { x: 0, y: 0 }, width: 0, height: 0 };
    var _getWidgetBoundingRect = $ax.public.fn.getWidgetBoundingRect = function (widgetId) {
        var element = document.getElementById(widgetId);
        if (!element) return emptyRect;

        var object = $obj(widgetId);
        if (object && object.type && $ax.public.fn.IsLayer(object.type) && !_isCompoundVectorComponentHtml(element)) {
            var layerChildren = _getLayerChildrenDeep(widgetId);
            if(!layerChildren) return emptyRect;
            else return _getBoundingRectForMultipleWidgets(layerChildren);
        }
        return _getBoundingRectForSingleWidget(widgetId);
    };

    $ax.public.fn.getPositionRelativeToParent = function(elementId) {
        var element = document.getElementById(elementId);
        var list = _displayHackStart(element);
        var position = $(element).position();
        _displayHackEnd(list);
        return position;
    };

    var _displayHackStart = function(element) {
        // TODO: Options: 1) stop setting display none. Big change for this late in the game. 2) Implement our own bounding.
        // TODO:  3) Current method is look for any parents that are set to none, and and temporarily unblock. Don't like it, but it works.
        var parent = element;
        var displays = [];
        while(parent) {
            if(parent.style.display == 'none') {
                displays.push(parent);
                //use block to overwrites default hidden objects' display
                parent.style.display = 'block';
            }
            parent = parent.parentElement;
        }

        return displays;
    };

    var _displayHackEnd = function(displayChangedList) {
        for (var i = 0; i < displayChangedList.length; i++) displayChangedList[i].style.display = 'none';
    };


    var _isCompoundVectorHtml = $ax.public.fn.isCompoundVectorHtml = function (hElement) { return  hElement.hasAttribute('widgetwidth'); }
    var _isCompoundVectorComponentHtml = function (hElement) {return hElement.hasAttribute('widgettopleftx'); }

});

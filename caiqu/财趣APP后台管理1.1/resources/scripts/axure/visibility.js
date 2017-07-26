$axure.internal(function($ax) {
    var document = window.document;
    var _visibility = {};
    $ax.visibility = _visibility;

    var _defaultHidden = {};
    var _defaultLimbo = {};

    // ******************  Visibility and State Functions ****************** //

    var _isIdVisible = $ax.visibility.IsIdVisible = function(id) {
        return $ax.visibility.IsVisible(window.document.getElementById(id));
    };

    $ax.visibility.IsVisible = function(element) {
        //cannot use css('visibility') because that gets the effective visiblity
        //e.g. won't be able to set visibility on panels inside hidden panels
        return element.style.visibility != 'hidden';
    };

    $ax.visibility.SetIdVisible = function(id, visible) {
        $ax.visibility.SetVisible(window.document.getElementById(id), visible);
        // Hide lightbox if necessary
        if(!visible) {
            $jobj($ax.repeater.applySuffixToElementId(id, '_lightbox')).remove();
            $ax.flyoutManager.unregisterPanel(id, true);
        }
    };

    var _setAllVisible = function(query, visible) {
        for(var i = 0; i < query.length; i++) _visibility.SetVisible(query[i], visible);
    }

    $ax.visibility.SetVisible = function(element, visible) {
        //todo -- ahhhh! I really don't want to add this, I don't know why it is necessary (right now sliding panel state out then in then out breaks
        //and doesn't go hidden on the second out if we do not set display here.
        if(visible) {
            //hmmm i will need to remove the class here cause display will not be overwriten by set to ''
            if($(element).hasClass('ax_default_hidden')) $(element).removeClass('ax_default_hidden');
            if($(element).hasClass('ax_default_unplaced')) $(element).removeClass('ax_default_unplaced');
            element.style.display = '';
            element.style.visibility = 'visible';
        } else {
            element.style.display = 'none';
            element.style.visibility = 'hidden';
        }
    };

    //use this to save & restore DP's scroll position when show/hide
    //key => dp's id (not state's id, because it seems we can change state while hiding)
    //value => first state's id & scroll position
    //NOTE: we only need to store one scroll position for one DP, and remove the key after shown.
    var DPStateAndScroll = {}
    var _setWidgetVisibility = $ax.visibility.SetWidgetVisibility = function(elementId, options) {
        // If limboed, just fire the next action then leave.
        if(_limboIds[elementId]) {
            $ax.action.fireAnimationFromQueue(elementId, $ax.action.queueTypes.fade);
            return;
        }

        options.containInner = true;
        var query = $jobj(elementId);
        var parentId = query.parent().attr('id');
        var axObj = $obj(elementId);
        if($ax.public.fn.IsDynamicPanel(axObj.type)) {
            //if dp has scrollbar, save its scroll position
            if(axObj.scrollbars != 'none') {
                var shownState = $ax.dynamicPanelManager.getShownState(elementId);
                //before hiding, try to save scroll location
                if(!options.value && shownState) {
                    DPStateAndScroll[elementId] = {
                        shownId: shownState.attr('id'),
                        left: shownState.scrollLeft(),
                        top: shownState.scrollTop()
                    }
                }
            }

            _pushPanelContainer(elementId);
            var complete = options.onComplete;
            options.onComplete = function () {
                if(complete) complete();
                _popPanelContainer(elementId);
                //after showing dp, restore the scoll position
                if(options.value && shownState) {
                    var scrollstate = DPStateAndScroll[elementId];
                    if(scrollstate && scrollstate.shownId === shownState.attr('id')) {
                        if(scrollstate.left) shownState.scrollLeft(scrollstate.left);
                        if(scrollstate.top) shownState.scrollTop(scrollstate.top);
                    }
                    delete DPStateAndScroll[elementId];
                }
            }
            options.containerExists = true;
        }
        _setVisibility(parentId, elementId, options);

        //set the visibility of the annotation box as well if it exists
        var ann = document.getElementById(elementId + "_ann");
        if(ann) _visibility.SetVisible(ann, options.value);

        //set ref visibility for ref of flow shape, if that exists
        var ref = document.getElementById(elementId + '_ref');
        if(ref) _visibility.SetVisible(ref, options.value);
    };

    var _setVisibility = function(parentId, childId, options) {
        var wrapped = $jobj(childId);
        var completeTotal = 1;
        var visible = $ax.visibility.IsIdVisible(childId);

        if(visible == options.value) {
            $ax.action.fireAnimationFromQueue(childId, $ax.action.queueTypes.fade);
            return;
        }

        var child = $jobj(childId);
        var size = options.size || child;

        var isIdFitToContent = $ax.dynamicPanelManager.isIdFitToContent(parentId);
        //fade and resize won't work together when there is a container... but we still needs the container for fit to content DPs
        var needContainer = options.easing && options.easing != 'none' && (options.easing != 'fade' || isIdFitToContent);
        var cullPosition = options.cull ? options.cull.css('position') : '';
        var containerExists = options.containerExists;

        var isFullWidth = $ax.dynamicPanelManager.isPercentWidthPanel($obj(childId));

        // If fixed fit to content panel, then we must set size on it. It will be size of 0 otherwise, because container in it is absolute position.
        var needSetSize = false;
        var sizeObj = {};
        if(needContainer) {
            var sizeId = '';
            if($ax.dynamicPanelManager.isIdFitToContent(childId)) sizeId = childId;
            else {
                var panelId = $ax.repeater.removeSuffixFromElementId(childId)[0];
                if($ax.dynamicPanelManager.isIdFitToContent(panelId)) sizeId = panelId;
            }

            if (sizeId) {
                needSetSize = true;

                sizeObj = $jobj(sizeId);
                var newSize = options.cull || sizeObj;
                sizeObj.width(newSize.width());
                sizeObj.height(newSize.height());
            }
        }

        var wrappedOffset = { left: 0, top: 0 };
        if(needContainer) {
            var childObj = $obj(childId);
            if(options.cull) {
                var containerWidth = options.cull.width();
                var containerHeight = options.cull.height();
            } else {
                if(childObj && ($ax.public.fn.IsLayer(childObj.type) || childObj.generateCompound)) {
                    var boundingRectangle = $ax.public.fn.getWidgetBoundingRect(childId);
                    wrappedOffset.left = boundingRectangle.left;
                    wrappedOffset.top = boundingRectangle.top;
                    containerWidth = boundingRectangle.width;
                    containerHeight = boundingRectangle.height;
                } else {
                    containerWidth = $ax('#' + childId).width();
                    containerHeight = $ax('#' + childId).height();
                }
            }

            //var fixedInfo = $ax.dynamicPanelManager.getFixedInfo(childId);
            //var childObj = $obj(childId);
            //if(childObj && (childObj.type == 'layer' || childObj.generateCompound)) {
            //    var boundingRectangle = $ax.public.fn.getWidgetBoundingRect(childId);
            //    wrappedOffset.left = boundingRectangle.left;
            //    wrappedOffset.top = boundingRectangle.top;
            //    var containerWidth = boundingRectangle.width;
            //    var containerHeight = boundingRectangle.height;
            //} else {
            //    containerWidth = $ax('#' + childId).width();
            //    containerHeight = $ax('#' + childId).height();
            //}

            //if(options.cull) {
            //    containerWidth = options.cull.width();
            //    containerHeight = options.cull.height();
            //}

            var containerId = childId + '_container';
//            var container = _makeContainer(containerId, options.cull || boundingRectangle, isFullWidth, options.easing == 'flip', wrappedOffset, options.containerExists);
            var container = _makeContainer(containerId, containerWidth, containerHeight, isFullWidth, options.easing == 'flip', wrappedOffset, options.containerExists);

            if(options.containInner) {
                wrapped = _wrappedChildren(containerExists ? $(child.children()[0]) : child);
                completeTotal = wrapped.length;
                if(!containerExists) container.prependTo(child);

                // Offset items if necessary
                if(wrappedOffset.left != 0 || wrappedOffset.top != 0) {
                    for(var i = 0; i < wrapped.length; i++) {
                        var inner = $(wrapped[i]);
                        inner.css('left', $ax.getNumFromPx(inner.css('left')) - wrappedOffset.left);
                        inner.css('top', $ax.getNumFromPx(inner.css('top')) - wrappedOffset.top);
                        // Parent layer is now size 0, so have to have to use conatiner since it's the real size.
                        //  Should we use container all the time? This may make things easier for fit panels too.
                        size = container;
                    }
                }
            } else if(!containerExists) container.insertBefore(child);
            if(!containerExists) wrapped.appendTo(container);

            if (options.value && options.containInner) {
                //has to set children first because flip to show needs childerns invisible 
                _setAllVisible(wrapped, false);
                _updateChildAlignment(childId);
                _setAllVisible(child, true);
            }
        }

        var completeCount = 0;
        var onComplete = function () {
            completeCount++;
            if(needContainer && completeCount == completeTotal) {
                var css = {};
                //_getFixedCss(css, container, isFullWidth);

                if(options.containInner && (wrappedOffset.left != 0 || wrappedOffset.top != 0)) {

                    for (i = 0; i < wrapped.length; i++) {
                        inner = $(wrapped[i]);
                        inner.css('left', $ax.getNumFromPx(inner.css('left')) + wrappedOffset.left);
                        inner.css('top', $ax.getNumFromPx(inner.css('top')) + wrappedOffset.top);
                    }
                }

                if(options.containInner && !options.value) {
                    _setAllVisible(child, false);
                    _setAllVisible(wrapped, true);
                }

                if (containerExists) container.attr('style', 'position:relative;');
                else {
                    wrapped.insertBefore(container);
                    container.remove();
                }
                //child.css(css);

                if(childObj && $ax.public.fn.IsDynamicPanel(childObj.type) && window.modifiedDynamicPanleParentOverflowProp) {
                    child.css('overflow', 'hidden');
                    window.modifiedDynamicPanleParentOverflowProp = false;
                }
            }

            if(!needContainer || completeTotal == completeCount) {
                if(options.cull) options.cull.css('position', cullPosition);
                if(needSetSize) {
                    sizeObj.css('width', 'auto');
                    sizeObj.css('height', 'auto');
                }
                options.onComplete && options.onComplete();

                if(options.fire) {
                    $ax.event.raiseSyntheticEvent(childId, options.value ? 'onShow' : 'onHide');
                    $ax.action.fireAnimationFromQueue(childId, $ax.action.queueTypes.fade);
                }
            }
        };

        if(!options.easing || options.easing == 'none') {
            $ax.visibility.SetIdVisible(childId, options.value);
            completeTotal = 1;
            onComplete();
        } else if(options.easing == 'fade') {
            if(options.value) {
                // Can't use $ax.visibility.SetIdVisible, because we only want to set visible, we don't want to display, fadeIn will handle that.
                wrapped.css('visibility', 'visible');
                wrapped.fadeIn({
                    queue: false,
                    duration: options.duration, 
                    complete: onComplete
                });
            } else {
                // Fading here is being strange...
                wrapped.animate({ opacity: 0 }, { duration: options.duration, easing: 'swing', queue: false, complete: function() {
                    $ax.visibility.SetIdVisible(childId, false);
                    wrapped.css('opacity', '');

                    onComplete();
                }});
            }
        } else if (options.easing == 'flip') {
            //this container will hold 
            var innerContainer = $('<div></div>');
            innerContainer.attr('id', containerId + "_inner");
            innerContainer.css({
                position: 'relative',
                'width': containerWidth,
                'height': containerHeight
            });

            innerContainer.appendTo(container);
            wrapped.appendTo(innerContainer);

            if(childObj && $ax.public.fn.IsDynamicPanel(childObj.type)) var containerDiv = child;
            else containerDiv = parentId ? $jobj(parentId) : child.parent();

            completeTotal = 1;
            var flipdegree;
            var requestAnimFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame || window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };

            var originForUpOrDown = '100% ' + containerHeight / 2 + 'px';
            if(options.value) {
                //options.value == true means in or show, note to get here, the element must be currently hidden
                //to show, we need to first flip it 180deg without animation
                switch(options.direction) {
                    case 'right':
                    case 'left':
                        _setRotateTransformation(innerContainer, 'rotateY(180deg)');
                    flipdegree = options.direction === 'right' ? 'rotateY(360deg)' : 'rotateY(0deg)';
                    break;
                    case 'up':
                    case 'down':
                    innerContainer.css({
                        '-webkit-transform-origin': originForUpOrDown,
                        '-ms-transform-origin': originForUpOrDown,
                        'transform-origin': originForUpOrDown,
                    });
                    _setRotateTransformation(innerContainer, 'rotateX(180deg)');
                    flipdegree = options.direction === 'up' ? 'rotateX(360deg)' : 'rotateX(0deg)';
                    break;
                }

                var onFlipShowComplete = function() {
                    child.css({
                        'display': '',
                        'visibility': 'visible'
                    });

                    wrapped.insertBefore(innerContainer);
                    innerContainer.remove();

                    onComplete();
                };

                innerContainer.css({
                    '-webkit-backface-visibility': 'hidden',
                    'backface-visibility': 'hidden'
                });

                child.css({
                    'display': '',
                    'visibility': 'visible'
                });

                wrapped.css({
                    'display': '',
                    'visibility': 'visible'
                });

                innerContainer.css({
                    '-webkit-transition-duration': options.duration + 'ms',
                    'transition-duration': options.duration + 'ms'
                });

                requestAnimFrame(function () {
                    _setRotateTransformation(innerContainer, flipdegree, containerDiv, onFlipShowComplete, options.duration);
                });
            } else { //hide or out
                switch(options.direction) {
                    case 'right':
                    case 'left':
                        //if(!childObj.generateCompound) _setRotateTransformation(wrapped, 'rotateY(0deg)');
                        flipdegree = options.direction === 'right' ? 'rotateY(180deg)' : 'rotateY(-180deg)';
                        break;
                    case 'up':
                    case 'down':
                        //_setRotateTransformation(wrapped, 'rotateX(0deg)');
                        innerContainer.css({
                            '-webkit-transform-origin': originForUpOrDown,
                            '-ms-transform-origin': originForUpOrDown,
                            'transform-origin': originForUpOrDown,
                        });
                        flipdegree = options.direction === 'up' ? 'rotateX(180deg)' : 'rotateX(-180deg)';
                    break;
                }

                var onFlipHideComplete = function() {
                    wrapped.insertBefore(innerContainer);
                    child.css({
                        'display': 'none',
                        'visibility': 'hidden'
                    });
                    innerContainer.remove();

                    onComplete();
                };

                innerContainer.css({
                    '-webkit-backface-visibility': 'hidden',
                    'backface-visibility': 'hidden',
                    '-webkit-transition-duration': options.duration + 'ms',
                    'transition-duration': options.duration + 'ms'
                });

                requestAnimFrame(function () {
                    _setRotateTransformation(innerContainer, flipdegree, containerDiv, onFlipHideComplete, options.duration);
                });
            }
        } else {
            if(options.value) {
                _slideStateIn(childId, childId, options.easing, options.direction, options.duration, size, false, onComplete, wrapped);
            } else {
                var tops = [];
                var lefts = [];
                for(var i = 0; i < wrapped.length; i++) {
                    var currWrapped = $(wrapped[i]);
                    tops.push(currWrapped.css('top'));
                    lefts.push(currWrapped.css('left'));
                }

                var onOutComplete = function () {
                    for(i = 0; i < wrapped.length; i++) {
                        currWrapped = $(wrapped[i]);
                        $ax.visibility.SetIdVisible(currWrapped.attr('id'), false);
                        currWrapped.css('top', tops[i]);
                        currWrapped.css('left', lefts[i]);
                    }
                    onComplete();
                };
                _slideStateOut(size, childId, options.easing, options.direction, options.duration, onOutComplete, wrapped);
            }
        }
        // If showing, go through all rich text objects inside you, and try to redo alignment of them
        if(options.value && !options.containInner) {
            _updateChildAlignment(childId);
        }
    };

    var _updateChildAlignment = function(childId) {
        var descendants = $jobj(childId).find('*');
        for(var i = 0; i < descendants.length; i++) {
            var decendantId = descendants[i].id;
            // This check is probably redundant? UpdateTextAlignment should ignore any text objects that haven't set the vAlign yet.
            if($ax.getTypeFromElementId(decendantId) != 'richTextPanel') continue;
            $ax.style.updateTextAlignmentForVisibility(decendantId);
        }
    };

    var _wrappedChildren = function(child) {
        var children = child.children();
        var valid = [];
        for(var i = 0; i < children.length; i++) if($ax.visibility.IsVisible(children[i])) valid.push(children[i]);
        return $(valid);
    };

    var _setRotateTransformation = function(elementsToSet, transformValue, elementParent, flipCompleteCallback, flipDurationMs) {
        if(flipCompleteCallback) {
            //here we didn't use 'transitionend' event to fire callback
            //when show/hide on one element, changing transition property will stop the event from firing
            window.setTimeout(flipCompleteCallback, flipDurationMs);
        }

        elementsToSet.css({
            '-webkit-transform': transformValue,
            '-moz-transform': transformValue,
            '-ms-transform': transformValue,
            '-o-transform': transformValue,
            'transform': transformValue
        });

        //when deal with dynamic panel, we need to set it's parent's overflow to visible to have the 3d effect
        //NOTE: we need to set this back when both flips finishes in DP, to prevents one animation finished first and set this back
        if(elementParent && elementParent.css('overflow') === 'hidden') {
            elementParent.css('overflow', 'visible');
            window.modifiedDynamicPanleParentOverflowProp = true;
        }
    };

    $ax.visibility.GetPanelState = function(id) {
        var children = $jobj(id).children();
        if(panelContainerCount[id]) children = children.children().children();
        for(var i = 0; i < children.length; i++) {
            if(children[i].style && $ax.visibility.IsVisible(children[i])) return children[i].id;
        }
        return '';
    };

    var panelContainerCount = {};
    $ax.visibility.SetPanelState = function(id, stateId, easingOut, directionOut, durationOut, easingIn, directionIn, durationIn, showWhenSet) {
        var show = !$ax.visibility.IsIdVisible(id) && showWhenSet;
        if(show) $ax.visibility.SetIdVisible(id, true);

        // Exit here if already at desired state.
        if($ax.visibility.IsIdVisible(stateId)) {
            if(show) $ax.event.raiseSyntheticEvent(id, 'onShow');
            $ax.action.fireAnimationFromQueue(id, $ax.action.queueTypes.setState);
            return;
        }

        _pushPanelContainer(id);

        var state = $jobj(stateId);
        var oldStateId = $ax.visibility.GetPanelState(id);
        var oldState = $jobj(oldStateId);
        //pin to browser
        $ax.dynamicPanelManager.adjustFixed(id, oldState.width(), oldState.height(), state.width(), state.height());

        _bringPanelStateToFront(id, oldStateId);

        var fitToContent = $ax.dynamicPanelManager.isIdFitToContent(id);
        var resized = false;
        if(fitToContent) {
            // Set resized
            resized = state.width() != oldState.width() || state.height() != oldState.height();
        }

        //edge case for sliding
        var movement = (directionOut == 'left' || directionOut == 'up' || state.children().length == 0) && oldState.children().length != 0 ? oldState : state;
        var onCompleteCount = 0;
        var onComplete = function () {
            //move this call from _setVisibility() for animate out.
            //Because this will make the order of dp divs consistence: the showing panel is always in front after both animation finished
            //tested in the cases where one panel is out/show slower/faster/same time/instantly. 
            _bringPanelStateToFront(id, stateId);

            if (window.modifiedDynamicPanleParentOverflowProp) {
                var parent = id ? $jobj(id) : child.parent();
                parent.css('overflow', 'hidden');
                window.modifiedDynamicPanleParentOverflowProp = false;
            }

            $ax.dynamicPanelManager.fitParentPanel(id);
            $ax.dynamicPanelManager.updatePanelPercentWidth(id);
            $ax.dynamicPanelManager.updatePanelContentPercentWidth(id);
            $ax.action.fireAnimationFromQueue(id, $ax.action.queueTypes.setState);
            $ax.event.raiseSyntheticEvent(id, "onPanelStateChange");
            $ax.event.leavingState(oldStateId);
            _popPanelContainer(id);
        };
        // Must do state out first, so if we cull by new state, location is correct
        _setVisibility(id, oldStateId, {
            value: false,
            easing: easingOut,
            direction: directionOut,
            duration: durationOut,
            containerExists: true,
            onComplete: function() {
//                if(easingIn !== 'flip') _bringPanelStateToFront(id, stateId);
                if (++onCompleteCount == 2) onComplete();
            },
            settingChild: true,
            size: movement,
            //cull for 
            cull: easingOut == 'none' || state.children().length == 0 ? oldState : state
        });

        _setVisibility(id, stateId, {
            value: true,
            easing: easingIn,
            direction: directionIn,
            duration: durationIn,
            containerExists: true,
            onComplete: function () {
//                if (easingIn === 'flip') _bringPanelStateToFront(id, stateId);
                if (++onCompleteCount == 2) onComplete();
            },
            settingChild: true,
            //size for offset
            size: movement
        });

        if(show) $ax.event.raiseSyntheticEvent(id, 'onShow');
        if(resized) $ax.event.raiseSyntheticEvent(id, 'onResize');
    };

    var _pushPanelContainer = function(id) {
        var count = panelContainerCount[id];
        if(count) panelContainerCount[id] = count + 1;
        else {
            var jobj = $jobj(id);
            var children = jobj.children();
            var css = {
                position: 'relative',
                top: 0,
                left: 0
            };
            for(var i = 0; i < children.length; i++) {
                var child = $(children[i]);
                var childContainer = $('<div></div>');
                childContainer.attr('id', child.attr('id') + '_container');
                childContainer.css(css);
                child.after(childContainer);
                childContainer.append(child);
            }
            var container = $('<div></div>');
            container.attr('id', id + '_container');
            container.css(css);
            container.append(jobj.children());
            jobj.append(container);
            panelContainerCount[id] = 1;
        }
    };

    var _popPanelContainer = function(id) {
        var count = panelContainerCount[id];
        if(!count) return;
        count--;
        panelContainerCount[id] = count;
        if(count != 0) return;

        var jobj = $jobj(id);
        var container = $jobj(id + '_container');
        jobj.append(container.children());
        container.remove();
        var children = jobj.children();
        for(var i = 0; i < children.length; i++) {
            var childContainer = $(children[i]);
            var child = $(childContainer.children()[0]);
            childContainer.after(child);
            childContainer.remove();
        }
    };

//    var _makeContainer = function (containerId, rect, isFullWidth, isFlip, offset, containerExists) {
    var _makeContainer = function (containerId, width, height, isFullWidth, isFlip, offset, containerExists) {
        if(containerExists) var container = $jobj(containerId);
        else {
            container = $('<div></div>');
            container.attr('id', containerId);
        }
        var css = {
            position: 'absolute',
            width: width,
            height: height,
        };

        if(!containerExists) {
            // If container exists, may be busy updating location. Will init and update it correctly.
            css.top = offset.top;
            css.left = offset.left;
        }


        if(isFlip) {
            css.perspective = '800px';
            css.webkitPerspective = "800px";
            css.mozPerspective = "800px";
        } else css.overflow = 'hidden';

        //perspective on container will give us 3d effect when flip
        //if(!isFlip) css.overflow = 'hidden';

        // Rect should be a jquery not axquery obj
        //_getFixedCss(css, rect.$ ? rect.$() : rect, fixedInfo, isFullWidth);
        
        container.css(css);
        return container;
    };

    var CONTAINER_SUFFIX = "_container";
    _visibility.getWidgetFromContainer = function(id) {
        var containerIndex = id.indexOf(CONTAINER_SUFFIX);
        if(containerIndex == -1) return id;
        return id.substr(0, containerIndex) + id.substr(containerIndex + CONTAINER_SUFFIX.length);
    };

    var _getFixedCss = function(css, rect, fixedInfo, isFullWidth) {
        // todo: **mas** make sure this is ok
        if(fixedInfo.fixed) {
            css.position = 'fixed';

            if(fixedInfo.horizontal == 'left') css.left = fixedInfo.x;
            else if(fixedInfo.horizontal == 'center') {
                css.left = isFullWidth ? '0px' : '50%';
                css['margin-left'] = fixedInfo.x;
            } else if(fixedInfo.horizontal == 'right') {
                css.left = 'auto';
                css.right = fixedInfo.x;
            }

            if(fixedInfo.vertical == 'top') css.top = fixedInfo.y;
            else if(fixedInfo.vertical == 'middle') {
                css.top = '50%';
                css['margin-top'] = fixedInfo.y;
            } else if(fixedInfo.vertical == 'bottom') {
                css.top = 'auto';
                css.bottom = fixedInfo.y;
            }
        } else {
            css.left = Number(rect.css('left').replace('px', '')) || 0;
            css.top = Number(rect.css('top').replace('px', '')) || 0;
        }
    };

    var _slideStateOut = function(container, stateId, easingOut, directionOut, durationOut, onComplete, jobj) {
        var width = container.width();
        var height = container.height();

        if(directionOut == "right") {
            $ax.move.MoveWidget(stateId, width, 0, easingOut, durationOut, false, onComplete, false, jobj);
        } else if(directionOut == "left") {
            $ax.move.MoveWidget(stateId, -width, 0, easingOut, durationOut, false, onComplete, false, jobj);
        } else if(directionOut == "up") {
            $ax.move.MoveWidget(stateId, 0, -height, easingOut, durationOut, false, onComplete, false, jobj);
        } else if(directionOut == "down") {
            $ax.move.MoveWidget(stateId, 0, height, easingOut, durationOut, false, onComplete, false, jobj);
        }
    };

    var _slideStateIn = function(id, stateId, easingIn, directionIn, durationIn, container, makePanelVisible, onComplete, jobj) {
        var width = container.width();
        var height = container.height();

        for(var i = 0; i < jobj.length; i++) {
            var child = $(jobj[i]);
            var oldTop = $ax.getNumFromPx(child.css('top'));
            var oldLeft = $ax.getNumFromPx(child.css('left'));
            if (directionIn == "right") {
                child.css('left', oldLeft - width + 'px');
            } else if(directionIn == "left") {
                child.css('left', oldLeft + width + 'px');
            } else if(directionIn == "up") {
                child.css('top', oldTop + height + 'px');
            } else if(directionIn == "down") {
                child.css('top', oldTop - height + 'px');
            }
        }

        if (makePanelVisible) $ax.visibility.SetIdVisible(id, true);
        for(i = 0; i < jobj.length; i++) $ax.visibility.SetIdVisible($(jobj[i]).attr('id'), true);

        if(directionIn == "right") {
            $ax.move.MoveWidget(stateId, width, 0, easingIn, durationIn, false, onComplete, false, jobj);
        } else if(directionIn == "left") {
            $ax.move.MoveWidget(stateId, -width, 0, easingIn, durationIn, false, onComplete, false, jobj);
        } else if(directionIn == "up") {
            $ax.move.MoveWidget(stateId, 0, -height, easingIn, durationIn, false, onComplete, false, jobj);
        } else if(directionIn == "down") {
            $ax.move.MoveWidget(stateId, 0, height, easingIn, durationIn, false, onComplete, false, jobj);
        }
    };

    $ax.visibility.GetPanelStateId = function(dpId, index) {
        var itemNum = $ax.repeater.getItemIdFromElementId(dpId);
        var panelStateId = $ax.repeater.getScriptIdFromElementId(dpId) + '_state' + index;
        return $ax.repeater.createElementId(panelStateId, itemNum);
    };

    $ax.visibility.GetPanelStateCount = function(id) {
        var states = $jobj(id).children();
        if(panelContainerCount[id]) states = states.children();
        return states.length;
    };

    var _bringPanelStateToFront = function(dpId, stateid) {
        var focusedElement = undefined;
        if(IE || FIREFOX) focusedElement = $(document.activeElement);

        if(panelContainerCount[dpId]) dpId = stateid + '_container';
        $('#' + stateid).appendTo($('#' + dpId));
        //when bring a panel to front, it will be focused, and the previous front panel should fire blur event if it's lastFocusedClickableSelector
        //ie(currently 11) and firefox(currently 34) doesn't fire blur event, this is the hack to fire it manually
        if(focusedElement && focusedElement.is(window.lastFocusedClickableSelector)) focusedElement.triggerHandler('blur');
    };

    var _limboIds = _visibility.limboIds = {};
    // limboId's is a dictionary of id->true, essentially a set.
    var _addLimboAndHiddenIds = $ax.visibility.addLimboAndHiddenIds = function(newLimboIds, newHiddenIds, query) {
        var limboedByMaster = {};
        for(var key in newLimboIds) {
            if (!$ax.public.fn.IsReferenceDiagramObject($ax.getObjectFromElementId(key).type)) continue;
            var ids = $ax.model.idsInRdo(key);
            for(var i = 0; i < ids.length; i++) limboedByMaster[ids[i]] = true;
        }

        var hiddenByMaster = {};
        for(key in newHiddenIds) {
            if (!$ax.public.fn.IsReferenceDiagramObject($ax.getObjectFromElementId(key).type)) continue;
            ids = $ax.model.idsInRdo(key);
            for(i = 0; i < ids.length; i++) hiddenByMaster[ids[i]] = true;
        }

        // Extend with children of rdos
        newLimboIds = $.extend(newLimboIds, limboedByMaster);
        newHiddenIds = $.extend(newHiddenIds, hiddenByMaster);

        // something is only visible if it's not hidden and limboed

        //if(!skipSetting) {
        query.each(function(diagramObject, elementId) {
            // Rdos already handled, contained widgets are limboed by the parent, and sub menus should be ignored
            if ($ax.public.fn.IsReferenceDiagramObject(diagramObject.type) || $ax.public.fn.IsTableCell(diagramObject.type) || diagramObject.isContained || $jobj(elementId).hasClass('sub_menu')) return;
            if(diagramObject.type == 'table' && $jobj(elementId).parent().hasClass('ax_menu')) return;
            var shouldBeVisible = Boolean(!newLimboIds[elementId] && !newHiddenIds[elementId]);
            var isVisible = Boolean(_isIdVisible(elementId));
            if(shouldBeVisible != isVisible) {
                _setWidgetVisibility(elementId, { value: shouldBeVisible });
            }
        });
        //}

        _limboIds = _visibility.limboIds = $.extend(_limboIds, newLimboIds);

    };

    var _clearLimboAndHidden = $ax.visibility.clearLimboAndHidden = function(ids) {
        _limboIds = _visibility.limboIds = {};
    };

    $ax.visibility.clearLimboAndHiddenIds = function(ids) {
        for(var i = 0; i < ids.length; i++) delete _limboIds[ids[i]];
    };

    $ax.visibility.resetLimboAndHiddenToDefaults = function() {
        _clearLimboAndHidden();
        _addLimboAndHiddenIds(_defaultLimbo, _defaultHidden, $ax('*'));
    };

    $ax.visibility.initialize = function() {
        // initialize initial visible states
        $(".ax_default_hidden").each(function (index, diagramObject) {
            _defaultHidden[diagramObject.id] = true;
        });

        $(".ax_default_unplaced").each(function (index, diagramObject) {
            _defaultLimbo[diagramObject.id] = true;
        });

        $ax.visibility.addLimboAndHiddenIds(_defaultLimbo, _defaultHidden, $ax('*'));
    };

});
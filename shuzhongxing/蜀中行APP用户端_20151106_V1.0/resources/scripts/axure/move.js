$axure.internal(function($ax) {
    var _move = {};
    $ax.move = _move;

    //todo may want to create $ax.rotate if we add more rotate functions

    var widgetMoveInfo = {};

    $ax.move.GetWidgetMoveInfo = function() {
        return $.extend({}, widgetMoveInfo);
    };

    $ax.move.MoveWidget = function (id, x, y, easing, duration, to, animationCompleteCallback, shouldFire, jobj, layerId) {
        $ax.drag.LogMovedWidgetForDrag(id);

        // If using custom jquery object, then even if panel is fixed, custom query shouldn't be treated as fixed
        var fixedInfo = jobj ? {} : $ax.dynamicPanelManager.getFixedInfo(id);

        var widget = $('#' + id);
        if(!jobj) jobj = $jobj(id);

        var horzProp = 'left';
        var vertProp = 'top';
        var horzX = to ? x - Number(jobj.css('left').replace('px', '')) : x;
        var vertY = to ? y - Number(jobj.css('top').replace('px', '')) : y;


        if(fixedInfo.horizontal == 'right') {
            horzProp = 'right';
            horzX = to ? $(window).width() - x - Number(jobj.css('right').replace('px', '')) - widget.width() : -x;
        } else if(fixedInfo.horizontal == 'center') {
            if(to) horzX = x - $(window).width() / 2;
        }

        if(fixedInfo.vertical == 'bottom') {
            vertProp = 'bottom';
            vertY = to ? $(window).height() - y - Number(jobj.css('bottom').replace('px', '')) - widget.height() : -y;
        } else if(fixedInfo.vertical == 'middle') {
            vertProp = 'margin-top';
            if(to) vertY = y - $(window).height() / 2;
        }
        var cssStyles = {};

        if(!$ax.dynamicPanelManager.isPercentWidthPanel($obj(id))) cssStyles[horzProp] = '+=' + horzX;
        cssStyles[vertProp] = '+=' + vertY;

        var query = jobj.add($jobj(id + '_ann')).add($jobj(id + '_ref'));
        if(easing == 'none') {
            query.animate(cssStyles, { duration: 0, queue: false });
            if(animationCompleteCallback) animationCompleteCallback();
            //if this widget is inside a layer, we should just remove the layer from the queue
            if(shouldFire) $ax.action.fireAnimationFromQueue(layerId || id, $ax.action.queueTypes.move);
        } else {
            query.animate(cssStyles, { duration: duration, easing: easing, queue: false, complete: function() {
                if(animationCompleteCallback) animationCompleteCallback();
                if(shouldFire) $ax.action.fireAnimationFromQueue(layerId || id, $ax.action.queueTypes.move);
            }});
        }

        //moveinfo is used for moving 'with this'
        var moveInfo = new Object();
        moveInfo.x = horzX;
        moveInfo.y = vertY;
        moveInfo.options = {};
        moveInfo.options.easing = easing;
        moveInfo.options.duration = duration;
        widgetMoveInfo[id] = moveInfo;

        $ax.event.raiseSyntheticEvent(id, "onMove");
    };

    _move.nopMove = function(id) {
        var moveInfo = new Object();
        moveInfo.x = 0;
        moveInfo.y = 0;
        moveInfo.options = {};
        moveInfo.options.easing = 'none';
        moveInfo.options.duration = 0;
        widgetMoveInfo[id] = moveInfo;
    };

    //rotationDegree: total degree to rotate
    //centerPoint: the center of the circular path
    _move.circularMove = function(id, degreeDelta, centerPoint, easing, duration, fireAnimationQueue, raiseOnMove) {
        if(degreeDelta === 0) {
            if(raiseOnMove) $ax.event.raiseSyntheticEvent(id, "onMove");
            if(fireAnimationQueue) $ax.action.fireAnimationFromQueue(id, $ax.action.queueTypes.move);
            return;
        }
        var elem = $jobj(id);
        var rotation = { degree: 0 };

        if(!easing || easing === 'none' || duration <= 0) {
            duration = 1;
            easing = 'linear'; //it doesn't matter anymore here...
        }

        $(rotation).animate({ degree: degreeDelta }, {
            duration: duration,
            easing: easing,
            queue: false,
            step: function(newDegree) {
                var deg = newDegree - rotation.degree;
                var widgetCenter = $ax.public.fn.getWidgetBoundingRect(id).centerPoint;
                //console.log("widget center of " + id + " x " + widgetCenter.x + " y " + widgetCenter.y);
                var widgetNewCenter = _getPointAfterRotate(deg, widgetCenter, centerPoint);

                var xdelta = widgetNewCenter.x - widgetCenter.x;
                var ydelta = widgetNewCenter.y - widgetCenter.y;

                if(xdelta < 0) elem.css('left', '-=' + -xdelta);
                else if(xdelta > 0) elem.css('left', '+=' + xdelta);

                if(ydelta < 0) elem.css('top', '-=' + -ydelta);
                else if(ydelta > 0) elem.css('top', '+=' + ydelta);
            },
            complete: function() {
                if(fireAnimationQueue) $ax.action.fireAnimationFromQueue(id, $ax.action.queueTypes.move);
                if(raiseOnMove) $ax.event.raiseSyntheticEvent(id, "onMove");
            }
        });
    };

    var _getPointAfterRotate = function(angleInDegrees, pointToRotate, centerPoint) {
        var angleInRadians = angleInDegrees * (Math.PI / 180);
        var cosTheta = Math.cos(angleInRadians);
        var sinTheta = Math.sin(angleInRadians);

        var newx = (cosTheta * (pointToRotate.x - centerPoint.x) - sinTheta * (pointToRotate.y - centerPoint.y) + centerPoint.x);
        var newy = (sinTheta * (pointToRotate.x - centerPoint.x) + cosTheta * (pointToRotate.y - centerPoint.y) + centerPoint.y);

        return { x: newx, y: newy };
    };

    //rotate a widget by degree, center is 50% 50%
    _move.rotate = function (id, degree, easing, duration, to, shouldFire) {
        var currentDegree = _getRotationDegrees(id);
        if(to) degree = degree - currentDegree;

        if(degree === 0) {
            $ax.event.raiseSyntheticEvent(id, "onRotate");
            if (shouldFire) $ax.action.fireAnimationFromQueue(id, $ax.action.queueTypes.rotate);
            return;
        }

        var query = $jobj(id).add($jobj(id + '_ann')).add($jobj(id + '_ref'));

        //if no animation, setting duration to 1, to prevent RangeError in rotation loops without animation
        if(!easing || easing === 'none' || duration <= 0) {
            duration = 1;
            easing = 'linear'; //it doesn't matter anymore here...
        }

        var pPos = id.indexOf('p');

        var widgetId = pPos >= 1 ? id.substring(0, pPos) : id;


        var rotation = { degree: 0 };
        $(rotation).animate({ degree: degree }, {
            duration: duration,
            easing: easing,
            queue: false,
            step: function (now) {
                var degreeDelta = now - rotation.degree;
                var newDegree = currentDegree + degreeDelta;

                query.css({
                    '-webkit-transform': "rotate(" + newDegree + "deg)",
                    '-moz-transform': "rotate(" + newDegree + "deg)",
                    '-ms-transform': "rotate(" + newDegree + "deg)",
                    '-o-transform': "rotate(" + newDegree + "deg)",
                    'transform': "rotate(" + newDegree + "deg)"
                });

                currentDegree = newDegree;
            },
            complete: function() {
                if (shouldFire) $ax.action.fireAnimationFromQueue(widgetId, $ax.action.queueTypes.rotate);
                $ax.event.raiseSyntheticEvent(widgetId, "onRotate");
            }
        });
    };

    var _getRotationDegrees = function(elementId) {
        var element = document.getElementById(elementId);

        //var transformString = element.style.transform ||
        //    element.style.OTransform ||
        //    element.style.msTransform ||
        //    element.style.MozTransform ||
        //    element.style.webkitTransform;

        var transformString = element.style['transform'] ||
            element.style['-o-transform'] ||
            element.style['-ms-transform'] ||
            element.style['-moz-transform'] ||
            element.style['-webkit-transform'];

        if(transformString) {
            var rotateRegex = /rotate\(([-?0-9]+)deg\)/;
            var degreeMatch = rotateRegex.exec(transformString);
            if(degreeMatch && degreeMatch[1]) return parseFloat(degreeMatch[1]);
        }

        if(window.getComputedStyle) {
            var st = window.getComputedStyle(element, null);
        } else {
            console.log('rotation is not supported for ie 8 and below in this version of axure rp');
            return 0;
        }

        var tr = st.getPropertyValue("transform") ||
            st.getPropertyValue("-o-transform") ||
            st.getPropertyValue("-ms-transform") ||
            st.getPropertyValue("-moz-transform") ||
            st.getPropertyValue("-webkit-transform");
            

        if(!tr || tr === 'none') return 0;
        var values = tr.split('(')[1];
        values = values.split(')')[0],
        values = values.split(',');

        var a = values[0];
        var b = values[1];

        var radians = Math.atan2(b, a);
        if(radians < 0) {
            radians += (2 * Math.PI);
        }

        var angle = Math.round(radians * (180 / Math.PI));

        return angle;
    };

//    var generateFilter = function(deg) {
//        var rot, cos, sin, matrix;
//
//        rot=deg>=0 ? Math.PI*deg/180 : Math.PI*(360+deg)/180;
//        cos=Math.cos(rot);
//        sin=Math.sin(rot);
//        matrix='M11='+cos+',M12='+(-sin)+',M21='+sin+',M22='+cos+',SizingMethod="auto expand"';
//        return 'progid:DXImageTransform.Microsoft.Matrix('+matrix+')';
//    }
});
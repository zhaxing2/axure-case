$axure.internal(function($ax) {
    $ax.public.fn.matrixMultiply = function(matrix, vector) {
        if(!matrix.tx) matrix.tx = 0;
        if(!matrix.ty) matrix.ty = 0;
        var outX = matrix.m11 * vector.x + matrix.m12 * vector.y + matrix.tx;
        var outY = matrix.m21 * vector.x + matrix.m22 * vector.y + matrix.ty;
        return { x: outX, y: outY };
    }

    $ax.public.fn.matrixInverse = function(matrix) {
        if(!matrix.tx) matrix.tx = 0;
        if(!matrix.ty) matrix.ty = 0;

        var determinant = matrix.m11*matrix.m22 - matrix.m12*matrix.m21;
        //var threshold = (M11 * M11 + M22 *M22 + M12 *M12+ M21 *M21) / 100000;
        //if(determinant.DeltaEquals(0, threshold) && determinant < 0.01) {
        //    return Invalid;
        //}
        return  {
            m11 : matrix.m22/determinant,
            m12 : -matrix.m12/determinant,
            tx : (matrix.ty*matrix.m12 - matrix.tx*matrix.m22)/determinant,
            m21: -matrix.m21 / determinant,
            m22: matrix.m11 / determinant,
            ty: (matrix.tx * matrix.m21 - matrix.ty * matrix.m11) / determinant
        };
    }


    $ax.public.fn.matrixMultiplyMatrix = function (matrix1, matrix2) {
        if (!matrix1.tx) matrix1.tx = 0;
        if (!matrix1.ty) matrix1.ty = 0;
        if (!matrix2.tx) matrix2.tx = 0;
        if (!matrix2.ty) matrix2.ty = 0;

        return {
            m11: matrix1.m12*matrix2.m21 + matrix1.m11*matrix2.m11,
            m12: matrix1.m12*matrix2.m22 + matrix1.m11*matrix2.m12,
            tx: matrix1.m12 * matrix2.ty + matrix1.m11 * matrix2.tx + matrix1.tx,
            m21: matrix1.m22 * matrix2.m21 + matrix1.m21 * matrix2.m11,
            m22: matrix1.m22 * matrix2.m22 + matrix1.m21 * matrix2.m12,
            ty: matrix1.m22 * matrix2.ty + matrix1.m21 * matrix2.tx + matrix1.ty,
        };
    }


    $ax.public.fn.transformFromElement = function (element) {
        var st = window.getComputedStyle(element, null);

        var tr = st.getPropertyValue("-webkit-transform") ||
            st.getPropertyValue("-moz-transform") ||
            st.getPropertyValue("-ms-transform") ||
            st.getPropertyValue("-o-transform") ||
            st.getPropertyValue("transform");

        if (tr.indexOf('none') < 0) {
            var matrix = tr.split('(')[1];
            matrix = matrix.split(')')[0];
            matrix = matrix.split(',');
            for (var l = 0; l < matrix.length; l++) {
                matrix[l] = Number(matrix[l]);
            }

        } else { matrix = [1.0, 0.0, 0.0, 1.0, 0.0, 0.0]; }

        return matrix;
        // matrix[0] = cosine, matrix[1] = sine. 
        // Assuming the element is still orthogonal.
    }

    $ax.public.fn.vectorMinus = function(vector1, vector2) { return { x: vector1.x - vector2.x, y: vector1.y - vector2.y }; }

    $ax.public.fn.vectorPlus = function (vector1, vector2) { return { x: vector1.x + vector2.x, y: vector1.y + vector2.y }; }

    $ax.public.fn.vectorMidpoint = function (vector1, vector2) { return { x: (vector1.x + vector2.x) / 2.0, y: (vector1.y + vector2.y) / 2.0 }; }

    $ax.public.fn.fourCornersToBasis = function (fourCorners) {
        return {
            widthVector: $ax.public.fn.vectorMinus(fourCorners.widgetTopRight, fourCorners.widgetTopLeft),
            heightVector: $ax.public.fn.vectorMinus(fourCorners.widgetBottomLeft, fourCorners.widgetTopLeft)
        };
    }

    $ax.public.fn.matrixString = function(m11, m21, m12, m22, tx, ty) {
        return "Matrix(" + m11 + "," + m21 + "," + m12 + "," + m22 + ", " + tx + ", " + ty + ")";
    }
    
    $ax.public.fn.getWidgetBoundingRect = function (widgetId) {
        var emptyRect = { left: 0, top: 0, centerPoint: { x: 0, y: 0 }, width: 0, height: 0 };
        var element = document.getElementById(widgetId);
        if (!element) return emptyRect;

        var object = $obj(widgetId);
        if (object && object.type && $ax.public.fn.IsLayer(object.type) && !_isCompoundVectorComponentHtml(element)) {
            var layerChildren = _getLayerChildrenDeep(widgetId);
            if (!layerChildren) return emptyRect;
            else return _getBoundingRectForMultipleWidgets(layerChildren);
        }
        return _getBoundingRectForSingleWidget(widgetId);
    };

    var _isCompoundVectorComponentHtml = $ax.public.fn.isCompoundVectorComponentHtml = function (hElement) { return hElement.hasAttribute('widgettopleftx'); }

    var _getLayerChildrenDeep = $ax.public.fn.getLayerChildrenDeep = function (layerId, includeLayers, includeHidden) {
        var deep = [];
        var children = $ax('#' + layerId).getChildren()[0].children;
        for (var index = 0; index < children.length; index++) {
            var childId = children[index];
            if(!includeHidden && !$ax.visibility.IsIdVisible(childId)) continue;
            if ($ax.public.fn.IsLayer($obj(childId).type)) {
                if (includeLayers) deep.push(childId);
                var recursiveChildren = _getLayerChildrenDeep(childId, includeLayers);
                for (var j = 0; j < recursiveChildren.length; j++) deep.push(recursiveChildren[j]);
            } else deep.push(childId);
        }
        return deep;
    };

    var _getBoundingRectForMultipleWidgets = function (widgetsIdArray, relativeToPage) {
        if (!widgetsIdArray || widgetsIdArray.constructor !== Array) return undefined;
        if (widgetsIdArray.length == 0) return { left: 0, top: 0, centerPoint: { x: 0, y: 0 }, width: 0, height: 0 };
        var widgetRect = _getBoundingRectForSingleWidget(widgetsIdArray[0], relativeToPage, true);
        var boundingRect = { left: widgetRect.left, right: widgetRect.right, top: widgetRect.top, bottom: widgetRect.bottom };

        for (var index = 1; index < widgetsIdArray.length; index++) {
            widgetRect = _getBoundingRectForSingleWidget(widgetsIdArray[index], relativeToPage);
            boundingRect.left = Math.min(boundingRect.left, widgetRect.left);
            boundingRect.top = Math.min(boundingRect.top, widgetRect.top);
            boundingRect.right = Math.max(boundingRect.right, widgetRect.right);
            boundingRect.bottom = Math.max(boundingRect.bottom, widgetRect.bottom);
        }

        boundingRect.centerPoint = { x: (boundingRect.right + boundingRect.left) / 2.0, y: (boundingRect.bottom + boundingRect.top) / 2.0 };
        boundingRect.width = boundingRect.right - boundingRect.left;
        boundingRect.height = boundingRect.bottom - boundingRect.top;
        return boundingRect;
    };

    var _getBoundingRectForSingleWidget = function (widgetId, relativeToPage, justSides) {
        var xOffset = window.pageXOffset || document.documentElement.scrollLeft;
        var yOffset = window.pageYOffset || document.documentElement.scrollTop;

        var element = document.getElementById(widgetId);
        var boundingRect, tempBoundingRect, position;
        var displayChanged = _displayHackStart(element);

        if(_isCompoundVectorHtml(element)) {
            tempBoundingRect =  _getCompoundImageBoundingClientSize(widgetId);
            position = { left: tempBoundingRect.left, top: tempBoundingRect.top };
        } else {
            tempBoundingRect = element.getBoundingClientRect();
            position = $(element).position();
        }
        if(!relativeToPage) {
            // Check for flip. If so, first correct any layer weirdness going on, then account for flip of actual widget
            var layers = $ax('#' + widgetId).getParents(true, ['layer'])[0];
            var flip = '';
            var mirrorWidth = 0;
            var mirrorHeight = 0;
            for (var i = 0; i < layers.length; i++) {
                var layerPos = $jobj(layers[i]).position();
                position.left += layerPos.left;
                position.top += layerPos.top;

                var outer = $ax.visibility.applyWidgetContainer(layers[i], true, true);
                if(outer.length) {
                    var outerPos = outer.position();
                    position.left += outerPos.left;
                    position.top += outerPos.top;
                }

                var inner = $jobj(layers[i] + '_container_inner');
                if(inner.length) {
                    flip = inner.data('flip');
                    mirrorWidth = $ax.getNumFromPx(inner.css('width'));
                    mirrorHeight = $ax.getNumFromPx(inner.css('height'));
                }
            }
            // Now account for flip
            if(flip == 'x') position.top = mirrorHeight - position.top - tempBoundingRect.height;
            else if(flip == 'y') position.left = mirrorWidth - position.left - tempBoundingRect.width;
        }

        boundingRect = {
            left: relativeToPage ? tempBoundingRect.left + xOffset : position.left,
            right: relativeToPage ? tempBoundingRect.right + xOffset : position.left + tempBoundingRect.width,
            top: relativeToPage ? tempBoundingRect.top + yOffset : position.top,
            bottom: relativeToPage ? tempBoundingRect.bottom + yOffset : position.top + tempBoundingRect.height
        };

        _displayHackEnd(displayChanged);
        if (justSides) return boundingRect;

        boundingRect.width = boundingRect.right - boundingRect.left;
        boundingRect.height = boundingRect.bottom - boundingRect.top;

        boundingRect.centerPoint = {
            x: boundingRect.width / 2 + boundingRect.left,
            y: boundingRect.height / 2 + boundingRect.top
        };

        return boundingRect;
    };

    $ax.public.fn.getPositionRelativeToParent = function (elementId) {
        var element = document.getElementById(elementId);
        var list = _displayHackStart(element);
        var position = $(element).position();
        _displayHackEnd(list);
        return position;
    };

    var _displayHackStart = function (element) {
        // TODO: Options: 1) stop setting display none. Big change for this late in the game. 2) Implement our own bounding.
        // TODO:  3) Current method is look for any parents that are set to none, and and temporarily unblock. Don't like it, but it works.
        var parent = element;
        var displays = [];
        while (parent) {
            if (parent.style.display == 'none') {
                displays.push(parent);
                //use block to overwrites default hidden objects' display
                parent.style.display = 'block';
            }
            parent = parent.parentElement;
        }

        return displays;
    };

    var _displayHackEnd = function (displayChangedList) {
        for (var i = 0; i < displayChangedList.length; i++) displayChangedList[i].style.display = 'none';
    };


    var _isCompoundVectorHtml = $ax.public.fn.isCompoundVectorHtml = function (hElement) { return hElement.hasAttribute('widgetwidth'); }

    $ax.public.fn.compoundIdFromComponent = function(id) {

        var pPos = id.indexOf('p');
        var dashPos = id.indexOf('-');
        if (pPos < 1) return id;
        else if (dashPos < 0) return id.substring(0, pPos);
        else return id.substring(0, pPos) + id.substring(dashPos);
    }

    $ax.public.fn.l2 = function (x, y) { return Math.sqrt(x * x + y * y); }

    var _getCompoundImageBoundingClientSize = function (elementId) {
        var query = $jobj(elementId);

        //if(query[0].style.visibility == 'hidden' || query[0].style.display == 'none') {
        //    return {
        //        width: 0,
        //        height: 0,
        //        left: 0,
        //        right: 0,
        //        top: 0,
        //        bottom: 0in
        //    };
        //}

        var fourCorners = _getFourCorners(query);

        var maxLeft = Math.min(fourCorners.widgetBottomRight.x, fourCorners.widgetTopRight.x, fourCorners.widgetBottomLeft.x, fourCorners.widgetTopLeft.x);
        var maxRight = Math.max(fourCorners.widgetBottomRight.x, fourCorners.widgetTopRight.x, fourCorners.widgetBottomLeft.x, fourCorners.widgetTopLeft.x);
        var maxTop = Math.min(fourCorners.widgetBottomRight.y, fourCorners.widgetTopRight.y, fourCorners.widgetBottomLeft.y, fourCorners.widgetTopLeft.y);
        var maxBottom = Math.max(fourCorners.widgetBottomRight.y, fourCorners.widgetTopRight.y, fourCorners.widgetBottomLeft.y, fourCorners.widgetTopLeft.y);
        return {
            width: maxRight - maxLeft,
            height: maxBottom - maxTop,
            left: maxLeft,
            right: maxRight,
            top: maxTop,
            bottom: maxBottom
        };

    }

    var _getFieldFromStyle = $ax.public.fn.GetFieldFromStyle = function (query, field) {
        var raw = query[0].style[field];
        if (!raw) raw = query.css(field);
        return Number(raw.replace('px', ''));
    }


    var _getCornersFromComponent = $ax.public.fn.getCornersFromComponent = function (query) {
        var matrix = $ax.public.fn.transformFromElement(query[0]);
        var currentMatrix = { m11: matrix[0], m21: matrix[1], m12: matrix[2], m22: matrix[3], tx: matrix[4], ty: matrix[5] };
        var dimensions = {};

        dimensions.left = _getFieldFromStyle(query, 'left');
        dimensions.top = _getFieldFromStyle(query, 'top');
        dimensions.width = _getFieldFromStyle(query, 'width');
        dimensions.height = _getFieldFromStyle(query, 'height');
        //var transformMatrix1 = { m11: 1, m12: 0, m21: 0, m22: 1, tx: -invariant.x, ty: -invariant.y };
        //var transformMatrix2 = { m11: 1, m12: 0, m21: 0, m22: 1, tx: 500, ty: 500 };

        var halfWidth = dimensions.width * 0.5;
        var halfHeight = dimensions.height * 0.5;
        var preTransformTopLeft = { x: -halfWidth, y: -halfHeight };
        var preTransformBottomLeft = { x: -halfWidth, y: halfHeight };
        var preTransformTopRight = { x: halfWidth, y: -halfHeight };

        return {
            relativeTopLeft: $ax.public.fn.matrixMultiply(currentMatrix, preTransformTopLeft),
            relativeBottomLeft: $ax.public.fn.matrixMultiply(currentMatrix, preTransformBottomLeft),
            relativeTopRight: $ax.public.fn.matrixMultiply(currentMatrix, preTransformTopRight),
            centerPoint: { x: dimensions.left + halfWidth, y: dimensions.top + halfHeight },
            originalDimensions: dimensions,
            transformShift: { x: matrix[4], y: matrix[5] }
        }
    }

    var _getFourCorners = $ax.public.fn.getFourCorners = function (query) {
        var childId = $ax.public.fn.getComponentId(query[0].id, 'p000');
        var firstChildElement = document.getElementById(childId);

        var ohLookTheresAContainerHere = { x: 0.0, y: 0.0 };

        for (var i = 0; i < query[0].children.length; i++) {
            var node = query[0].children[i];
            if (node.id.indexOf(query[0].id) >= 0 && node.id.indexOf('container') >= 0) {
                ohLookTheresAContainerHere = {
                    x: Number( node.style.left.replace('px', '')), y: Number(node.style.top.replace('px', ''))
                };
            }
        }


        var list = _displayHackStart(firstChildElement);
        var thisElt = $jobj(childId);
        var elementCorners = _getCornersFromComponent(thisElt);
        _displayHackEnd(list);
        var transformedWidth = $ax.public.fn.vectorMinus(elementCorners.relativeTopRight, elementCorners.relativeTopLeft);
        var transformedHeight = $ax.public.fn.vectorMinus(elementCorners.relativeBottomLeft, elementCorners.relativeTopLeft);

        var relativeToWorld = {
            m11: transformedWidth.x,
            m12: transformedHeight.x,
            m21: transformedWidth.y,
            m22: transformedHeight.y,
            tx: elementCorners.centerPoint.x + elementCorners.transformShift.x + ohLookTheresAContainerHere.x,
            ty: elementCorners.centerPoint.y + elementCorners.transformShift.y + ohLookTheresAContainerHere.y
        }
        var widgetBottomRightRotated = { x: Number(thisElt[0].getAttribute('widgetbottomrightx')), y: Number(thisElt[0].getAttribute('widgetbottomrighty')) };
        var widgetTopRightRotated = { x: Number(thisElt[0].getAttribute('widgettoprightx')), y: Number(thisElt[0].getAttribute('widgettoprighty')) };
        var widgetBottomLeftRotated = { x: Number(thisElt[0].getAttribute('widgetbottomleftx')), y: Number(thisElt[0].getAttribute('widgetbottomlefty')) };
        var widgetTopLeftRotated = { x: Number(thisElt[0].getAttribute('widgettopleftx')), y: Number(thisElt[0].getAttribute('widgettoplefty')) };

        return {
            widgetBottomRight: $ax.public.fn.matrixMultiply(relativeToWorld, widgetBottomRightRotated),
            widgetTopRight: $ax.public.fn.matrixMultiply(relativeToWorld, widgetTopRightRotated),
            widgetBottomLeft: $ax.public.fn.matrixMultiply(relativeToWorld, widgetBottomLeftRotated),
            widgetTopLeft: $ax.public.fn.matrixMultiply(relativeToWorld, widgetTopLeftRotated)
        };
    }

    $ax.public.fn.rotationMatrix = function (angleInDegrees) {
        var angleInRadians = angleInDegrees * (Math.PI / 180);
        var cosTheta = Math.cos(angleInRadians);
        var sinTheta = Math.sin(angleInRadians);

        return { m11: cosTheta, m12: -sinTheta, m21: sinTheta, m22: cosTheta, tx: 0.0, ty: 0.0 };
    }


    $ax.public.fn.setTransformHowever = function (transformString) {
        return {
            '-webkit-transform': transformString,
            '-moz-transform': transformString,
            '-ms-transform': transformString,
            '-o-transform': transformString,
            'transform': transformString
        };
    }
});
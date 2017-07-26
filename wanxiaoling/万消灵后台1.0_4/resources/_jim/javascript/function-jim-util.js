(function( window, undefined) {
  var $simulation = jQuery("#simulation"), debugEnabled = false;
  
  /* START PREVENT RIGHT-CLICK CONTEXT MENU AND OTHERS */
  jQuery("html").bind("mouseup, mousedown", function(event) {
    if(event.button === 2) {
      this.oncontextmenu = function() { return false; };
    }
  });
  
  if($.browser.msie && $.browser.version<9) {
	jQuery("html")[0].attachEvent("ondragstart", function(event) {
	  if($(event.target || event.srcElement).is("img"))
    	return false;
    });
  }
  /* END PREVENT RIGHT-CLICK CONTEXT MENU AND OTHERS */
  
  /* START PROTOTYPICAL ADDITIONS */
  if(!Array.prototype.contains) {
    Array.prototype.contains = function(value) {
      if (value) {
        var array = this, i, iLen, org;
        for (i=0, iLen=array.length; i<iLen; i+=1) {
          org = array[i];
          if(org instanceof jQuery) {
            org = org[0];
          }
          if(value instanceof jQuery) {
            value = value[0];
          }
          if (org === value) {
            return true;
          }
        }
      }
      return false;
    };
  }
  
  if (!Array.prototype.indexOf){
	  Array.prototype.indexOf = function(elt /*, from*/)
	  {
		var len = this.length >>> 0;

		var from = Number(arguments[1]) || 0;
		from = (from < 0)
			 ? Math.ceil(from)
			 : Math.floor(from);
		if (from < 0)
		  from += len;

		for (; from < len; from++)
		{
		  if (from in this &&
			  this[from] === elt)
			return from;
		}
		return -1;
	};
  }
  
  /* IE: string has no trim function */
  if(!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }
  
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(str) {
      return this.indexOf(str) === 0;
    };
  }
  
  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(suffix) {
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
  }

  jQuery.expr[":"].econtains = function(obj, index, meta, stack) {
    return (obj.textContent || obj.innerText || $(obj).text() || "").toLowerCase() === meta[3].toLowerCase();
  };

  /* Rick Stahl: http://www.west-wind.com/WebLog/posts/282495.aspx */
  if(!String.repeat) {
    String.repeat = function(chr, count) {
      var str = "", x;
      for (x=0; x<count; x+=1) {
        str += chr;
      }
      return str;
    };
  }

  if(!String.prototype.padL) {
    String.prototype.padL = function(width, pad) {
      var length;
      if (!width || width < 1) {
        return this;
      }
      if (!pad) {
        pad = " ";
      }
      length = width - this.length;
      if (length < 1) {
        return this.substr(0, width);
      }
      return (String.repeat(pad, length) + this).substr(0, width);
    };
  }

  if(!String.prototype.padR) {
    String.prototype.padR = function(width, pad) {
      var length;
      if (!width || width < 1) {
        return this;
      }
      if (!pad) {
        pad = " ";
      }
      length = width - this.length;
      if (length < 1) {
        this.substr(0, width);
      }
      return (this + String.repeat(pad, length)).substr(0, width);
    };
  }

  if(!Date.prototype.formatDate) {
    Date.prototype.formatDate = function(format) {
      var date = this, month, year, hours;
      if (!format) {
        format = "MM/dd/yyyy";
      }
      month = date.getMonth() + 1;
      year = date.getFullYear();
      format = format.replace("MM", month.toString().padL(2, "0"));
      if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
      } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2, 2));
      }
      format = format.replace("dd", date.getDate().toString().padL(2, "0"));
      hours = date.getHours();
      if (format.indexOf("t") > -1) {
        if (hours > 11) {
          format = format.replace("t", "pm");
        } else {
          format = format.replace("t", "am");
        }
      }
      if (format.indexOf("HH") > -1) {
        format = format.replace("HH", hours.toString().padL(2, "0"));
      }
      if (format.indexOf("hh") > -1) {
        if (hours > 12) {
          hours = hours - 12;
        }
        if (hours === 0) {
          hours = 12;
        }
        format = format.replace("hh", hours.toString().padL(2, "0"));
      }
      if (format.indexOf("mm") > -1) {
        format = format.replace("mm", date.getMinutes().toString().padL(2, "0"));
      }
      if (format.indexOf("ss") > -1) {
        format = format.replace("ss", date.getSeconds().toString().padL(2, "0"));
      }
      return format;
    };
  }
  /* END PROTOTYPICAL ADDITIONS */

  /* START JQUERY EXTENSION */
  jQuery.fn.extend({
    "jimForceVisibility": function() {
      var $hidden = this.parentsUntil("#simulation").andSelf().filter(function() { return jQuery(this).css('display') == 'none'; });
      this.data("hiddenElements", $hidden);        
      var t, tLen, $target;
      for(t=0, tLen=(jimUtil.exists($hidden)) ? $hidden.length : 0; t<tLen; t+=1) {
         $target = jQuery($hidden[t]);
         if($target.jimGetType()=== itemType.panel || $target.jimGetType() === itemType.datarow){
            $target.removeClass('hidden'); 
            //$hidden.show(); //jimUtil.show() modify the visibility of sibling panels but the original state of each of these panels isn't restored on jimUndoVisibility
         }else{
            jimUtil.show($target);
         }
      }
      return this;
    },
    "jimUndoVisibility": function() {
      var $hidden = this.data("hiddenElements");
      if(jimUtil.exists($hidden)) {
          var t, tLen, $target;
          for(t=0, tLen=$hidden.length; t<tLen; t+=1) {
             $target = jQuery($hidden[t]);
             if($target.jimGetType()=== itemType.panel || $target.jimGetType() === itemType.datarow){
                $target.addClass('hidden'); 
             }else{
                $target.hide();
             }
          }
        this.data("hiddenElements",null);
      }
      return this;
    },
    "jimPosition": function(returnBBox) {
      var scroll = jimUtil.getScrollPosition(), paneWidth = jimUtil.getSidePanelWidth(), simulationBounds = jQuery("#simulation")[0].getBoundingClientRect(), position, zoom = 1;
      var zoom = jimUtil.getZoom();
      this.jimForceVisibility();
      position = jQuery.extend({}, this[0].getBoundingClientRect());
      position.height= position.bottom - position.top;
      position.width= position.right - position.left;
      position.top = position.top + (scroll.top*(1/zoom)) - simulationBounds.top;
      position.left = position.left - paneWidth + (scroll.left*(1/zoom)) - simulationBounds.left;
      
      if(!jimUtil.exists(returnBBox)  || returnBBox===false){
          position.top +=(position.height - (this[0].offsetHeight/(1/jimUtil.getTotalScale())))/2;
          position.height = this[0].offsetHeight;
          position.left +=(position.width - (this[0].offsetWidth/(1/jimUtil.getTotalScale())))/2;
          position.width = this[0].offsetWidth;
      } 
      //apply scale
	  position.top = position.top*(1/jimUtil.getTotalScale());
	  position.left = position.left*(1/jimUtil.getTotalScale());
      //end scale
	  if(!jimUtil.exists(returnBBox)  || returnBBox===false){
	      position.bottom = position.top + position.height;
	      position.right= position.left + position.width;
	  }
	  else{
	      position.bottom = position.top + (position.height*(1/jimUtil.getTotalScale()));
	      position.right= position.left + (position.width*(1/jimUtil.getTotalScale()));
	  }
      
      this.jimUndoVisibility();
      
      return position;
    },
    
    "jimGetType": function() {
      var classes = this.attr("class"), i, iLen, type;
      if(classes !== undefined) {
        classes = classes.split(" ");
        for(i=0, iLen=classes.length; i<iLen; i+=1) {
          type = classes[i];
          if(itemType.hasOwnProperty(type)) {
            return itemType[type];
          }
        }
      }
    },
    "jimGetCanvasName": function() {
      return this.closest(".screen, .template, .master").attr("name");
    },
    "jimOuterHeight": function() {
    	var height = this.outerHeight();
    	if(this[0].nodeName === "svg"){
    		height = this[0].getBBox().height;
    	}
        return height;
      },
    "jimOuterWidth": function() {
    	var width = this.outerWidth();
    	if(this[0].nodeName === "svg"){
    		width = this[0].getBBox().width;
    	}
        return width;
      }
  });
  /* START JQUERY EXTENSION */

  var itemType = {
    "label": 1,
    "image": 2,
    "richtext": 3,
    "table": 4,
    "cell": 5,
    "rectangle": 6,
    "dynamicpanel": 7,
    "panel": 8,
    "text": 9,
    "password": 10,
    "textarea": 11,
    "checkbox": 12,
    "radiobutton": 13,
    "date": 14,
    "time": 15,
    "file": 16,
    "selectionlist": 17,
    "multiselectionlist": 18,
    "dropdown": 19,
    "radiobuttonlist": 20,
    "checkboxlist": 21,
    "tree": 22,
    "treenode": 23,
    "menu": 24,
    "menunode": 25,
    "datalist": 26,
    "headerrow": 27,
    "datarow": 28,
    "datacell": 29,
    "summary": 30,
    "index": 31,
    "master": 32,
    "simulation": 33,
    "screen": 34,
    "template": 35,
    "texttable": 36,
    "textcell": 37,
    "line": 38,
    "button": 39,
    "imagemap": 40,
    "html": 41,
    "url": 42,
    "document": 43,
    "flash": 44,
    "website": 45,
    "group": 46,
    "ellipse": 47,
    "triangle": 48,
    "callout" : 49,
    "svgContainer":50,
    "shapewrapper":51,
    "nativedropdown": 52,
    "datagrid": 53
  };
     
  var eventTypes = [
  "click",
  "mouseup",
  "mousedown",
  "doubleclick",
  "rightclick",
  "toggle",
  "keyup",
  "keydown",
  "mouseover",
  "mouseenter",
  "mouseleave",
  "change",
  "focusin",
  "focusout",
  "pageload",
  "pageunload",
  "dragstart",
  "drag",
  "dragend",
  "swipeup",
  "swipedown",
  "swipeleftup",
  "swipeleft",
  "swipeleftdown",
  "swiperightup",
  "swiperight",
  "swiperightdown",
  "pinchopen",
  "pinchclose",
  "rotateleft",
  "rotateright",
  "taphold",
  "orientatiportrait",
  "orientationlandscape",
  "windowresize"
  ];

  /* START UTILITY FUNCTIONS */
  var jimUtil = {
    "eventTypes" : eventTypes, 
      
    "debug": function(error) {
      if (debugEnabled && window.console) {
        if(typeof(error) === "string") {
          console.log(error);
        } else if(typeof(error) === "object") {
          console.dir(error);
        }
      }
    },
    "getKeys": function(o) {
      var accumulator = [], property;
      for(property in o) {
        if(o.hasOwnProperty(property)) {
          accumulator.push(property);
        }
      }
      return accumulator;
    },
    "isArray": function(obj) {
      return (obj.constructor.toString().indexOf("Array") === -1) ? false : true;
    },
    "getValues": function(o, filter) {
      var accumulator = [], property;
      for(property in o) {
        if(o.hasOwnProperty(property) && !filter.contains(property)) {
          accumulator.push(o[property]);
        }
      }
      return accumulator;
    },
    "unique": function(array) {
      var r = [], i, n, x, y;
      o: for (i=0, n=array.length; i<n; i+=1) {
        for(x=0, y=r.length; x<y; x+=1) {
          if (r[x].key === array[i].key) {
            continue o;
          }
        }
        r[r.length] = array[i];
      }
      return r;
    },
    "toArray": function(arrayLike) {
      var array, i, iLen;
      if(jimUtil.isArray(arrayLike)) {
        return arrayLike;
      } else {
        array = [];
        if(jimUtil.exists(arrayLike)) {
          if (typeof(arrayLike) === "string") {
            arrayLike = arrayLike.split(",");
          }
          for (i=0, iLen=arrayLike.length; i<iLen; i+=1) {
            array.push(arrayLike[i]);
          }
        }
        return array;
      }
    },
    "escapeRegex": function(value) {
      var acEscape, reReplace;
      acEscape = [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^' ];
      reReplace = new RegExp('(\\' + acEscape.join('|\\') + ')', 'g');
      return value.replace(reReplace, '\\$1');
    },
    "exists": function(o) {
      return (typeof o !== "undefined" && o !== null);
    },
	"getCurrentScreen": function() {
      return jQuery.map(jQuery(".screen:visible"), function(canvas, i) {return canvas.id;})[0];
    },
    "getCanvases": function() {
      return jQuery.map(jQuery(".screen:visible, .template:visible, .master"), function(canvas, i) {return canvas.id;});
    },
    "hasCanvas": function(canvas) {
      return jimUtil.getCanvases().contains(canvas);
    },
    "getScrollPosition": function() {
        var $scrollableElement;
        if(jimUtil.isMobileDevice())
  	      	$scrollableElement = jQuery("#simulation");
  	  else if(window.jimMobile) 
  	      	$scrollableElement =  jQuery(".ui-page-active");
  	  else 
  	      	$scrollableElement = jQuery("#simulation");
              
        return {
          "top": $scrollableElement.scrollTop(),
          "left": $scrollableElement.scrollLeft()
        };
      },
    "getSidePanelWidth": function() {
      return $simulation.position().left;
    },
    "viewportHeight": function() {
      return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body.clientHeight;
    },
    "viewportWidth": function() {
      return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body.clientWidth;
    },
    "scrollbarWidth": 0,
    "getScrollbarWidth": function() {
      /*! Copyright (c) 2008 Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net) Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.*/
      if (jimUtil.scrollbarWidth === 0) {
        if (jQuery.browser.msie) {
          var $textarea1 = jQuery('<textarea cols="10" rows="2"></textarea>').css({position : 'absolute', top : -1000, left : -1000}).appendTo('body'),
          $textarea2 = jQuery('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({position : 'absolute', top : -1000, left : -1000}).appendTo('body');
          jimUtil.scrollbarWidth = $textarea1.width() - $textarea2.width();
          $textarea1.add($textarea2).remove();
        } else {
          var $div = jQuery('<div />').css({width : 100, height : 100, overflow : 'auto', position : 'absolute', top : -1000, left : -1000}).prependTo('body').append('<div />').find('div').css({width : '100%', height : 200});
          jimUtil.scrollbarWidth = 100 - $div.width();
          $div.parent().remove();
        }
      }
      return jimUtil.scrollbarWidth;
    },
    /* based on idea: http://onemarco.com/2008/11/12/callbacks-and-binding-and-callback-arguments-and-references/ */
    "createCallback": function(action, opts) {
      return function() {
        var args = opts.args || [],
            scope = opts.scope || this,
            fargs = (opts.supressArgs === true) ? [] : jimUtil.toArray(arguments);
        action.apply(scope, fargs.concat(args));
      };
    },
    "isAnnotationInactive": function() {
      return (typeof(annotation) === "undefined" || !annotation.isActive());
    },
    "createUIEffectOptions": function(effect, callback) {
        var options = jimUtil.createAnimationOptions(effect);
        if(effect) {
      	  if(effect.type) {
             jQuery.extend(options, {"effect": effect.type});
          }
          if(effect.direction) {
            jQuery.extend(options, {"direction": effect.direction});
          }
          if(effect.times) {
            jQuery.extend(options, {"times": effect.times});
          }
          if(callback) {
        	jQuery.extend(options, {"complete": callback});
          }
        	  
        }
        return options;
      },
    "createAnimationOptions": function(effect,callback) {
      var options = {};
      if(effect) {
    	if(effect.duration) {
          jQuery.extend(options, {"duration": effect.duration});
        }
        if(effect.easing) {
          jQuery.extend(options, {"easing": effect.easing});
        }
        if(callback) {
          jQuery.extend(options, {"always":callback});
        }
        jQuery.extend(options, {"queue": false});
      }
      return options;
    },
    "showCallback": function(args) {
      if(jimUtil.exists(args) && jimUtil.exists(args.target)) {
        if(args.effect && args.effect.type && args.effect.type === "pulsate") {
          jQuery.effects.restore(args.target, ["opacity"]);
        }
        switch(args.target.jimGetType()) {
          case itemType.panel:
			if(window.PIE) {
		      $(args.target).siblings().find('.pie').addBack().each(function(){
		    	PIE.detach(this);
		      });
		    }
		    args.target.siblings().addClass("hidden").css("display", "").end().css({"z-index": "", "position": "", "top": "", "left": ""});
		    if(window.PIE) {
		      $(args.target).find('.pie:not(.shape)').addBack().each(function() {
		    	PIE.detach(this);
		    	if($(this).hasClass('pie')) {
		    	  PIE.attach(this);
		    	}
		      });
		    };   
            break;
          case itemType.menunode:
            if(!(args.target.parent(".menu").is(".vertical")))
                args.target.css("display", "table-cell");
            break;
        }
      }
    },
    "forceReflow": function($target) {
      if(jQuery.browser.webkit) {
        document.styleSheets[0].addRule('.force-reflow-webkit', '');
      } else {
        var $element = ($target && $target instanceof jQuery) ? $target : jQuery("body");
        $element.addClass("force-reflow").removeClass("force-reflow");
      }
    },
    "show": function($targets, args) {
      var t, tLen, $target, options, deferred = jQuery.Deferred();
      for(t=0, tLen=(jimUtil.exists($targets)) ? $targets.length : 0; t<tLen; t+=1) {
        $target = jQuery($targets[t]);  
        if($target.parent(".layout.horizontal").length) {
          $target.css("display", "inline-block");
        }
        if(args && args.effect) {
          /* TODO: add .stop() to interrupt animation */
          if(args.effect.type==="pulsate") {
            $.effects.save($target, ["opacity"]);
          }
          options = jimUtil.createUIEffectOptions(args.effect, function() {
            jimUtil.showCallback({"target": $target, "effect": args.effect});
            deferred.resolve($targets, args);
          });
		  if (window.PIE) { 
		    $target.show();
            $target.find(".pie").andSelf().each(function() {
              //force redraw
              $(this)[0].fireEvent("onresize");
            });
          }
          $target.hide().show(options);
        } else if (args && args.transition) {
          transition.start($target, $target.siblings(":visible"), args.transition, false).done(function() {
            jimUtil.showCallback({"target": $target});
            deferred.resolve($targets, args);
          });
        } else {
          $target.show();
		  if (window.PIE){ 
              $target.find(".pie").andSelf().each(function(){
            	  //force redraw
            	  $(this)[0].fireEvent("onresize");
              });
           }
          jimUtil.showCallback({"target": $target});
          deferred.resolve($targets, args);
        }
      }
      jimUtil.forceReflow();
      return deferred.promise();
    },
    "jimFocusOn": function($target, settings) {
    	if(jimUtil.exists($target) && $target.length && $target.is(":visible")) {
            var type = $target.jimGetType()
 	        switch(type) {
 	        case itemType.text:
 	        case itemType.password:
 	        case itemType.date:
 	        case itemType.time:
 	        case itemType.datetime:
 	          $target.find("input").focus();
 	          break;
 	        case itemType.file:
 	          $target.find("input:first").focus();
 	          break;
 	       case itemType.textarea:
			  $target.find("textarea").focus();
			  break;
 	        default:
 	          $target.focus();
 	          break;
 	      }
       }
    },
    "jimPointTo": function($target, settings) {
      if(jimUtil.exists($target) && $target.length && $target.is(":visible")) {
        var type = $target.jimGetType(), targetOffset, scrollParents, i,iLen, $current, current, offsetTop, offsetLeft,dynamicPanel, scrollTop, scrollLeft, accumulatedScrollTop, accumulatedScrollLeft, isMobile = /iPhone|iPad|iPod/.test(navigator.userAgent);
        if(!window.jimMobile && isMobile){
		  scrollParents = $target.parents(".firer:not(.screen, .template, .dynamicpanel, .cellcontainer, .datacell, .ui-page), .cellcontainer > .layout, .datacell > .layout, #simulation");
        } else if(isMobile || window.jimMobile) {
		  scrollParents = $target.parents(".firer:not(.screen, .template, .dynamicpanel, .cellcontainer, .datacell, #simulation), .cellcontainer > .layout, .datacell > .layout, .ui-page");
		} else {
		  scrollParents = $target.parents(".firer:not(.screen, .template, .dynamicpanel, .cellcontainer, .datacell, .ui-page), .cellcontainer > .layout, .datacell > .layout, #simulation");
		}
        accumulatedScrollTop = $target[0].offsetTop;
        accumulatedScrollLeft = $target[0].offsetLeft;
    	        
        for(i=0, iLen=scrollParents.length; i<iLen; i+=1) {
          current = scrollParents[i];
          $current = jQuery(current);
          scrollTop = 0;
          scrollLeft = 0;
          /* vertical scroll */
          if(current.offsetHeight < current.scrollHeight) {
            scrollTop = accumulatedScrollTop; 
            if(accumulatedScrollTop+current.clientHeight > current.scrollHeight) {
              accumulatedScrollTop= scrollTop+current.clientHeight-current.scrollHeight;
            } else {
              accumulatedScrollTop = 0;
            }
          }
          /* horizontal scroll */
          if(current.offsetWidth < current.scrollWidth) {
            scrollLeft = accumulatedScrollLeft;
            if(scrollLeft+current.clientWidth > current.scrollWidth) {
              accumulatedScrollLeft= scrollLeft+current.clientWidth-current.scrollWidth;
            } else {
              accumulatedScrollLeft = 0;
            }
          }
          /* do scroll */
          if(isMobile && current === document.body) {
            window.scrollTo(scrollLeft, scrollTop);
          } else {
        	var properties = {};
      		if(!settings || !settings.scroll || settings.scroll === "scrollxy") {
      		  jQuery.extend(properties, {"scrollTop": scrollTop, "scrollLeft": scrollLeft});
      		} else if(settings.scroll === "scrollx") {
      		  jQuery.extend(properties, {"scrollLeft":scrollLeft});
      		} else if(settings.scroll === "scrolly") {
      		  jQuery.extend(properties,{"scrollTop": scrollTop});
      		} 
        	  
      		if(settings && settings.effect)
        		jQuery(current).animate(properties, settings.effect);
      		else
      			jQuery(current).animate(properties, undefined);
      		
          }
          /* calculate current parent offset */
          if($current.is(".panel")){
            dynamicPanel = $current.parent()[0];
            offsetTop = dynamicPanel.offsetTop;
            offsetLeft = dynamicPanel.offsetLeft;
          }else{
            offsetTop = current.offsetTop;
            offsetLeft = current.offsetLeft;
          }
          accumulatedScrollTop += offsetTop;
          accumulatedScrollLeft += offsetLeft;  
        }
       
      }
    },
    "toHTML": function(value) {
      switch(typeof(value)) {
        case "string":
          value = value = value.toString();
          value = value.replace(/<br>/g, "\n");
          /*value = value.replace(/&/g, "&amp;");*/
          value = value.replace(/</g, "&lt;");
          value = value.replace(/>/g, "&gt;");
          value = value.replace(/" {2}"/g, " &nbsp;");
          value = value.replace(/\t/g, " &nbsp; &nbsp; &nbsp;");
          value = value.replace(/\r/g, "");
          value = value.replace(/\n/g, "<br />");
          break;
        case "boolean":
          value = value.toString();
          break;
      }
      return value;
    },
    "fromHTML": function(value) {
      if(typeof(value) === "string") {
        value = value.replace(/&lt;/g, "<");
        value = value.replace(/&gt;/g, ">");
        value = value.replace(/" &nbsp"/g, "  ");
        value = value.replace(/ &nbsp; &nbsp; &nbsp;/g, "   ");
        value = value.replace(/<br \/>/g, "\n");
      }
      return value;
    },
    "toJS": function(value) {
      if(typeof(value) === "string") {
        value = value.replace(/<br>/g, "\n");
      }
      return value;
    },
    "decodeURI": function(uri, force) {
      var components = uri.split("/"), c, cLen;
      for(c=0, cLen = components.length; c<cLen; c+=1) {
        components[c] = decodeURIComponent(components[c]);
      }
      return components.join("/");
    },
    "encodeURI": function(uri) {
      var components = uri.split("/"), c, cLen;
      for(c=0, cLen = components.length; c<cLen; c+=1) {
        components[c] = encodeURIComponent(components[c]);
      }
      return components.join("/");
    },
    "insertInto": function(args) {
      var $target, $parent, checkIntersect, positionIndex, position, event, $insert, $child, targetOffset, targetPosition, parentPosition, containment, point, positionType, x, y, index, insert, childOffset;
      $target = args.target;
      $parent = args.parent;
      position = args.position;
      positionIndex= args.positionIndex;
      checkIntersect = args.checkIntersect;
      event = args.event;
      if(jimUtil.exists($target) && jimUtil.exists($parent)) {
        if($parent.children('#'+$target.attr("id")).length) { /* already contained */
          if(jimUtil.exists(position)) {
            $target.css({"position": position.type, "top": position.top, "left": position.left});
          }
        } else {
          $layout = $parent.children(".layout");
          if($layout.length > 0) { /* container has non-free layout or rounded border */
            $insert = $layout.find("td.insertionpoint:first");
            if($insert.length) { /* container has non-free layout */
              switch($target.jimGetType()) {
                case itemType.group:
                case itemType.shapewrapper:
                  positionType = "relative";
                  break;
                default:
                  positionType = "static";
                  break;
              }
              insert = "append";
    
              if(jimUtil.exists(positionIndex) || jimUtil.exists(position) || jimUtil.exists(event) && event.type === "dragend") {
                if(jimUtil.exists(position)) {
                  x = position.left;
                  y = position.top;
                  index = (!jimUtil.exists(position.index)) ? -1 : position.index;
                } else {
                  targetOffset = $target.offset();
                  x = targetOffset.left;
                  y = targetOffset.top;
                  index = -1;
                }
            	if(jimUtil.exists(positionIndex)){
            		index = positionIndex;
            	}
    
                $insert.children().each(function(i, child){
                  $child = jQuery(child);
                  if(index === i) {
                    insert = "before";
                  } else {
                    childOffset = $child.offset();
                    if($insert.hasClass("vertical")) {
                      containment = {
                        "top": childOffset.top,
                        "bottom": childOffset.top + $child.outerHeight()
                      };
                      if(y <= containment.top) {
                        insert = "before";
                      } else if(containment.top <= y && y <= containment.bottom) {
                        insert = (y-containment.top < containment.bottom-y) ? "before" : "after";
                      }
                    } else {
                      containment = {
                        "left": childOffset.left,
                        "right": childOffset.left + $child.jimOuterWidth()
                      };
                      if(x <= containment.left) {
                        insert = "before";
                      } else if(containment.left <= x && x <= containment.right) {
                        insert = (x-containment.left < containment.right-x) ? "before" : "after";
                      }
                    }
                  }
                  return (insert === "append");
                });
              }
    
              switch(insert) {
                case "before":
                  $target.insertBefore($child).css({"position": positionType, "top": "", "left": "", "display": ""});
                  break;
                case "after":
                  $target.insertAfter($child).css({"position": positionType, "top": "", "left": "", "display": ""});
                  break;
                case "append":
                  $target.appendTo($insert).css({"position": positionType, "top": "", "left": "", "display": ""});
                  break;
              }
            } else { /* container has rounded border */
              $parent = $layout;
              if(jimUtil.intersect($target, $parent)) {
                parentPosition = $parent.jimPosition();
                targetPosition = $target.jimPosition();
                $target.appendTo($parent).css({"position": "absolute", "top": targetPosition.top - parentPosition.top + $parent.scrollTop() - parseInt($parent.css("border-top-width"),10), "left": targetPosition.left - parentPosition.left  + $parent.scrollLeft() - parseInt($parent.css("border-left-width"),10)});
              } else {
                $target.appendTo($parent).css({"position": "absolute", "top": "0px", "left": "0px"});
              }
            }
          } else { /* container has free layout */
            if(jimUtil.exists(position) && (jimUtil.exists(position.top) || jimUtil.exists(position.left))) {
              $target.appendTo($parent).css({"position": position.type, "top": position.top, "left": position.left});
            } else {
              var posType = "absolute";
              if(jimUtil.exists(position) && jimUtil.exists(position.type))
            	  posType = position.type;
              if(jimUtil.intersect($target, $parent) || (jimUtil.exists(checkIntersect) && !checkIntersect)) {
                parentPosition = $parent.jimPosition();
                targetPosition = $target.jimPosition();
                $target.appendTo($parent).css({"position": posType, "top": targetPosition.top - parentPosition.top + $parent.scrollTop() - parseInt($parent.css("border-top-width"),10), "left": targetPosition.left - parentPosition.left  + $parent.scrollLeft() - parseInt($parent.css("border-left-width"),10)});
              } else {
                $target.appendTo($parent).css({"position": posType, "top": "0px", "left": "0px"});
              }
            }
          }
        }
      }
    },
    "intersect": function(src, $over) {
      var target, targetOffset, over, overOffset,cursorX,cursorY;
      if(jimUtil.exists(src) && jimUtil.exists($over)) {
        if(src instanceof jQuery) {
          switch($over.jimGetType()) {
            case itemType.dynamicpanel:
              $over = ($over.children("div:visible").length === 0) ? $over.children(".default") : $over.children("div:visible:first");
              break;
          }
          targetOffset = src.offset(), overOffset = $over.offset();
          target = {
            "top": targetOffset.top,
            "left": targetOffset.left,
            "bottom": targetOffset.top + src.jimOuterHeight(),
            "right": targetOffset.left + src.jimOuterWidth()
          };
          over = {
            "top": overOffset.top,
            "left": overOffset.left,
            "bottom": overOffset.top + $over.jimOuterHeight(),
            "right": overOffset.left + $over.jimOuterWidth()
          };

          return (target.top >= over.top && target.bottom <= over.bottom) && (target.left >= over.left && target.right <= over.right);
        } else if (src instanceof jQuery.Event) {
            switch($over.jimGetType()) {
              case itemType.dynamicpanel:
                $over = ($over.children("div:visible").length === 0) ? $over.children(".default") : $over.children("div:visible:first");
                break;
            }
            var rotationAngle = jimUtil.getRotationDegrees($over);
            var scroll = jimUtil.getScrollPosition(), simulationBounds = jQuery("#simulation")[0].getBoundingClientRect();
            over = $over.jimPosition();
            over.top = over.top*(jimUtil.getTotalScale()) - scroll.top + simulationBounds.top;
            over.left = over.left*(jimUtil.getTotalScale()) - scroll.left + simulationBounds.left;
            over.right = over.right*(jimUtil.getTotalScale()) - scroll.left + simulationBounds.left;
            over.bottom = over.bottom*(jimUtil.getTotalScale()) - scroll.top + simulationBounds.top;
            /*touch events has specific x,y position for each finger**/
            if(src.originalEvent.sourceEvent.changedTouches && src.originalEvent.sourceEvent.changedTouches.length==1){
              cursorX =src.originalEvent.sourceEvent.changedTouches[0].pageX;
              cursorY =src.originalEvent.sourceEvent.changedTouches[0].pageY;
            } else {
              cursorX =src.originalEvent.pageX;
              cursorY =src.originalEvent.pageY;
            }
            
            if(rotationAngle!=0){
              var rotatedCursor =jimUtil.calculateRotatedPoint(over,cursorX,cursorY,rotationAngle);
              cursorX = rotatedCursor.x;
              cursorY = rotatedCursor.y;     
            }
            
            return (over.top <= cursorY && cursorY <= over.bottom) && (over.left <= cursorX && cursorX <= over.right);
          }
        }
        return false;
      },
      "getRotationDegrees": function($obj) {
        var angle = 0; 
        var matrix = $obj.css("-webkit-transform") ||
        $obj.css("-moz-transform")    ||
        $obj.css("-ms-transform")     ||
        $obj.css("-o-transform")      ||
        $obj.css("transform");
        if(jQuery.browser.msie && jQuery.browser.version<=8) {
            var filter = $obj.css("filter");
            if(filter===undefined || filter==="auto")
            	return angle;
            filter = filter.slice(filter.indexOf("M11=")+4,filter.length);
            var a = filter.substring(0, filter.indexOf(","));
            filter = filter.slice(filter.indexOf("M21=")+4,filter.length);
            var b = filter.substring(0, filter.indexOf(","));
            angle = ((Math.round(Math.atan2(b, a) * (180/Math.PI)) + 360) % 360);
        }
        else if(matrix && matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            angle = ((Math.round(Math.atan2(b, a) * (180/Math.PI)) + 360) % 360);
        }
        return angle;
      },
      "calculateRotatedPoint": function(bounds,pointX, pointY, angle) {
        var rotatedX = pointX, rotatedY=pointY;
        if(angle!=0){
            var centerX = bounds.left + ((bounds.right-bounds.left)/2);
            var centerY = bounds.top + ((bounds.bottom-bounds.top)/2);
            var distanceX = pointX - centerX;
            var distanceY = pointY - centerY;
            var radiansAngle = angle * (Math.PI/180);

            rotatedX = parseInt((centerX + distanceX * Math.cos(radiansAngle) + distanceY * Math.sin(radiansAngle)));
            rotatedY = parseInt((centerY - distanceX * Math.sin(radiansAngle) + distanceY * Math.cos(radiansAngle)));
        }
        
        return {
        "x": rotatedX,
        "y": rotatedY
        };
      },
      "calculateRotationShift": function(angle,$target) {
        var shiftX, shiftY;
        var nonRotatedWidth = $target[0].clientWidth;
        var nonRotatedHeight = $target[0].clientHeight;
        
        if($target.is(".shape")){
            nonRotatedWidth = $target.closest(".shapewrapper")[0].clientWidth;
            nonRotatedHeight = $target.closest(".shapewrapper")[0].clientHeight;
        }
        
        var bounds = {
            "left":0,
            "top":0,
            "right":nonRotatedWidth,
            "bottom":nonRotatedHeight
        };
        
        var topLeft = jimUtil.calculateRotatedPoint(bounds, 0,0,angle);
        var topRight = jimUtil.calculateRotatedPoint(bounds, nonRotatedWidth,0,angle);
        var bottomLeft = jimUtil.calculateRotatedPoint(bounds, 0,nonRotatedHeight,angle);
        var bottomRight = jimUtil.calculateRotatedPoint(bounds, nonRotatedWidth,nonRotatedHeight,angle);

        var minX = Math.min(Math.min(Math.min(topLeft.x, topRight.x), bottomLeft.x), bottomRight.x);
        var minY = Math.min(Math.min(Math.min(topLeft.y, topRight.y), bottomLeft.y), bottomRight.y);
        var maxX = Math.max(Math.max(Math.max(topLeft.x, topRight.x), bottomLeft.x), bottomRight.x);
        var maxY = Math.max(Math.max(Math.max(topLeft.y, topRight.y), bottomLeft.y), bottomRight.y);
        
        var rotatedWidth = maxX -minX;
        var rotatedHeight = maxY -minY;
        
        shiftX =(nonRotatedWidth - rotatedWidth)/2;        
        shiftY =(nonRotatedHeight - rotatedHeight)/2;
        return {
        "x": shiftX,
        "y": shiftY
        };
      },
      "getActivePanel": function($dynamicPanel) {
            if(jimUtil.exists($dynamicPanel) && $dynamicPanel.is(".dynamicpanel")){
                var $panels, $panel, i, iLen
                $panels = $dynamicPanel.children(".panel");
                for(i=0, iLen = $panels.length; i < iLen; i += 1) {
                    $panel = jQuery($panels[i]);
                    if($panel.css("display")!== "none")
                        return $panel;  
                }
            }
      },
      "getScrollContainerSize":function($scrollableContainer) {
        var viewportHeight = parseInt($scrollableContainer.closest(".firer").css("height"),10),
        viewportWidth = parseInt($scrollableContainer.closest(".firer").css("width"),10);
        if($scrollableContainer.hasClass('ui-page')){
        	viewportHeight = viewportHeight * (1/jimUtil.getScale());
        	viewportWidth = viewportWidth * (1/jimUtil.getScale());
        }
        return { "width": viewportWidth, "height": viewportHeight }
      },
      "getScrollContentsSize":function($scrollableContainer) {
        var contentsWidth, contentsHeight;
        var viewportHeight = parseInt($scrollableContainer.closest(".firer").css("height"),10),
        viewportWidth = parseInt($scrollableContainer.closest(".firer").css("width"),10);
        
        var $deviceSimulatedVerticalScroll = $scrollableContainer.children(".verticalScroll"),
        $deviceSimulatedHorizontalScroll = $scrollableContainer.children(".horizontalScroll");

        if($deviceSimulatedVerticalScroll.length>0) {
          var scrollValue = parseFloat(jQuery($deviceSimulatedVerticalScroll[0]).css("height"));
          contentsHeight = parseInt(Math.round(viewportHeight * viewportHeight / scrollValue));
        }else if($scrollableContainer.css("overflow-y")!=="hidden"){
          contentsHeight = parseInt($scrollableContainer[0].scrollHeight,10);
        }else{
          contentsHeight = viewportHeight;
        }
        
        if($deviceSimulatedHorizontalScroll.length>0) {
          var scrollValue = parseFloat(jQuery($deviceSimulatedHorizontalScroll[0]).css("width"));
          contentsWidth = parseInt(Math.round(viewportWidth * viewportWidth / scrollValue));
        }else if($scrollableContainer.css("overflow-x")!=="hidden"){
          contentsWidth = parseInt($scrollableContainer[0].scrollWidth,10);
        }else{
          contentsWidth = viewportWidth;
        }
   
        return { "width": contentsWidth, "height": contentsHeight }
      },
      "getPageMinSize": function($canvas) {
          var $child, $children,$alignmentBox, i, iLen, minX, minY, maxX, maxY;
          if($canvas.parents(".master").size()>0){
        	$children =jQuery();
  			var $childrenTemp = $canvas.children(".firer, .shapewrapper");
	      	  for(var i=0, iLen = $childrenTemp.length; i < iLen; i += 1) {
	              $child = jQuery($childrenTemp[i]);
	              if($child.css('display')!='none')
	            	  $children.push($childrenTemp[i]);
	      	  }
          }
  		  else $children = $canvas.children(".firer, .shapewrapper");
          
          $jimContainer = jQuery("#jim-container");
          //mobile devices
          var deviceWidth =parseInt($jimContainer.css("width"));
          var deviceHeight =parseInt($jimContainer.css("height"));
          
          if(isNaN(deviceWidth) || isNaN(deviceHeight)){
        	  // web prototypes
        	  deviceWidth = $("#jim-body").outerWidth();
        	  deviceHeight = $("#jim-body").outerHeight();
          }
          
          var lockVerticalScroll = jQuery(".screen.growth-horizontal").length>0 || jQuery(".screen.growth-none").length>0;
          var lockHorizontalScroll = jQuery(".screen.growth-vertical").length>0 || jQuery(".screen.growth-none").length>0;
          if($canvas.parents(".screen").size()<=0 || isNaN(deviceWidth) || isNaN(deviceHeight)){
        	  lockVerticalScroll = false;
        	  lockHorizontalScroll = false;
          }
                
          if(jimUtil.exists($children)) {
            for(i=0, iLen = $children.length; i < iLen; i += 1) {
                $child = jQuery($children[i]);
                $alignmentBox = $child.closest("#alignmentBox");
                if($child.is(".dynamicpanel"))
                    $child = jimUtil.getActivePanel($child);
                if(jimUtil.exists($child) && jimUtil.exists($alignmentBox)){
                    var position = $child.jimPosition(true);
                    var boxPosition = $alignmentBox.jimPosition();
                    position.left-= boxPosition.left;
                    position.right-= boxPosition.left;
                    position.top-= boxPosition.top;
                    position.bottom-= boxPosition.top;
                    	if ((!lockVerticalScroll && !lockHorizontalScroll) || position.top >= 0 && position.top <= deviceHeight || (position.top < 0 && (position.bottom) >= 0)){
                    		minX = jimUtil.exists(minX) ? Math.min(minX,position.left) : position.left;
                    		maxX = jimUtil.exists(maxX) ? Math.max(maxX,position.right) : position.right;
                    	}
                    	if ((!lockVerticalScroll && !lockHorizontalScroll) || position.left >= 0 && position.left <= deviceWidth || (position.left < 0 && (position.right) >= 0)){
                    		minY = jimUtil.exists(minY) ? Math.min(minY,position.top) : position.top;
                    		maxY = jimUtil.exists(maxY) ? Math.max(maxY,position.bottom) : position.bottom;
                    	}
                }
            }
         }
         
         minX =jimUtil.exists(minX) ? Math.max(minX,0) : 0;
 		 minY =jimUtil.exists(minY) ? Math.max(minY,0) : 0;
         maxX =jimUtil.exists(maxX) ? Math.max(maxX,0) : 0;
         maxY =jimUtil.exists(maxY) ? Math.max(maxY,0) : 0;
         return {
             "width": maxX,
             "height": maxY,
 			 "x": minX,
 			 "y": minY,
 			 "lockVerticalScroll":lockVerticalScroll,
 			 "lockHorizontalScroll":lockHorizontalScroll
 			 };
      },
      "refreshPageMinSize": function() {
          var $screen = jQuery(".screen:last"),
              $template = jQuery(".template:last");
          var $screenBgBox = jQuery(".screen:last > #backgroundBox");
          var $templateBgBox = jQuery(".template:last > #backgroundBox");
          
          var $canvas = jQuery(".screen:last > #alignmentBox,.template:last > #alignmentBox");
          var $jimContainer = jQuery("#jim-container");
	      var deviceWidth =parseInt($jimContainer.css("width"));
	      var deviceHeight =parseInt($jimContainer.css("height"));
	          
	      if(isNaN(deviceWidth) || isNaN(deviceHeight)){
	      	// web prototypes
	        deviceWidth = $("#jim-body").outerWidth();
	        deviceHeight = $("#jim-body").outerHeight();
	      }
	          
	      var lockVerticalScroll = jQuery(".screen.growth-horizontal").length>0 || jQuery(".screen.growth-none").length>0;
	      var lockHorizontalScroll = jQuery(".screen.growth-vertical").length>0 || jQuery(".screen.growth-none").length>0;
	      if($canvas.parents(".screen").size()<=0 || isNaN(deviceWidth) || isNaN(deviceHeight)){
	        lockVerticalScroll = false;
	        lockHorizontalScroll = false;
	      }

          
          var scrollableElement;
	      if(jimUtil.isMobileDevice())
	      	scrollableElement = jQuery("#simulation")[0];
	      else if(window.jimMobile) 
	      	scrollableElement =  jQuery(".ui-page")[0];
	      else 
	      	scrollableElement = jQuery("#simulation")[0];
	      //Don't use previous size of background boxes to calculate the scrollableElement scroll size.  
	      $screenBgBox.css("width",0 + "px");
          $templateBgBox.css("width", 0+ "px");
          $screenBgBox.css("height", 0 + "px");
          $templateBgBox.css("height", 0 + "px");
          

          var scrollWidth =scrollableElement.scrollWidth 
		  var scrollHeight = scrollableElement.scrollHeight;
		  if(window.jimMobile){
			scrollWidth = Math.max(scrollWidth,deviceWidth);
			scrollHeight = Math.max(scrollHeight,deviceHeight);
		 }
          var w = scrollWidth/ jimUtil.getScale();
          var h = scrollHeight / jimUtil.getScale();
          
          $screenBgBox.css("width", w + "px");
          $templateBgBox.css("width", w + "px");
          $screenBgBox.css("height", h + "px");
          $templateBgBox.css("height", h + "px");

          
      },
      "calculateMasterMinSize": function($target) {
  		if($target.parents(".masterinstance").size()>0) {
  			var $master = $target.parents(".masterinstance:first"),
  				$masterAlignBox = $target.parents(".masterinstance:first #alignmentBox"),
  				newMinSize = jimUtil.getPageMinSize($masterAlignBox);
  		
  			$master.css("min-width", newMinSize.width-newMinSize.x + "px");
  			$master.css("width", newMinSize.width-newMinSize.x + "px");
  			$master.css("min-height", newMinSize.height-newMinSize.y + "px");
  			$master.css("height", newMinSize.height-newMinSize.y + "px");
  		}
  		else if($target.is("#simulation")) {
  			var $master, $masterAlignBox, newMinSize,
  				$masters = $target.find(".masterinstance");
  			for(i=0, iLen = $masters.length; i < iLen; i += 1) {
  				$master = jQuery($masters[i]);
  				$masterAlignBox = $master.find("#alignmentBox"),
  				newMinSize = jimUtil.getPageMinSize($masterAlignBox);
  			
  				$master.css("min-width", newMinSize.width-newMinSize.x + "px");
  				$master.css("width", newMinSize.width-newMinSize.x + "px");
  				$master.css("min-height", newMinSize.height-newMinSize.y + "px");
  				$master.css("height", newMinSize.height-newMinSize.y + "px");
  			}
  		}
  	  },
      "resizeCell": function($cell, newCellWidth,newCellHeight,effect,updateTableFlag) {
         var i,iLen,ownerIndex, $currentCell, $columnCells, $rowCells, $table,oldTableWidth, cellDeltaWidth, oldTableHeight,cellDeltaHeight;
         if(jimUtil.exists($cell) && ($cell.is(".cellcontainer") || $cell.is(".datacell") || $cell.is(".textcell") )){
             ownerIndex = $cell.index() +1;
             $table = $cell.closest("table");
             $columnCells = $table.children("tbody, thead").children("tr").children(":nth-child("+ownerIndex+")");
             $rowCells = $cell.closest("tr").children();
             if(jimUtil.exists(newCellWidth)){
                 oldTableWidth = parseInt($table.css("width"),10);
                 cellDeltaWidth = newCellWidth - parseInt($cell.css("width"),10);
                 
              
                 for(i=0, iLen = $columnCells.length; i < iLen; i += 1) {
                    $currentCell = jQuery($columnCells[i]);
                    
                    var cellProperties = {"width":  Math.max(newCellWidth,1)};
                	if(effect)
                		$currentCell.animate(cellProperties, effect);
              	  	else
              	  		$currentCell.css(cellProperties);
                 }
				 
				 if(updateTableFlag=== undefined || updateTableFlag){
					 var tableProperties = {"width":  oldTableWidth + cellDeltaWidth};
					 if(effect)
						 $table.animate(tableProperties, effect);
					 else
						 $table.css(tableProperties);
				}
             }
            
            
             if(jimUtil.exists(newCellHeight)){
				 oldTableHeight = parseInt($table.css("height"),10);
                 cellDeltaHeight = newCellHeight - parseInt($cell.css("height"),10);
				 
                for(i=0, iLen = $rowCells.length; i < iLen; i += 1) {
                    $currentCell = jQuery($rowCells[i]);
                    var cellProperties = {"height":  Math.max(newCellHeight,1)};
                	if(effect)
                		$currentCell.animate(cellProperties, effect);
              	  	else
              	  		$currentCell.css(cellProperties);
				}
				if(!$cell.closest("tr").hasClass("hidden")){
					if(updateTableFlag=== undefined || updateTableFlag){
						var tableProperties = {"height":  oldTableHeight + cellDeltaHeight};
						if(effect)
							$table.animate(tableProperties, effect);
						else
							$table.css(tableProperties);
					}
				}
             }
             
         }
      },
      "resizeRow": function($row, newRowWidth, newRowHeight, effect) {
         var i,iLen,ownerIndex, $currentCell, $columnCells, $rowCells,newCellWidth, $table;
         if(jimUtil.exists($row) && ($row.is(".headerrow") || $row.is(".datarow"))){
              if(!jimUtil.exists(newRowWidth) || isNaN(parseInt(newRowWidth, 10)))
                newRowWidth = parseInt($row.css("width"),10);
              else
                newRowWidth= Math.max(newRowWidth,0);
              
              if(!jimUtil.exists(newRowHeight) || isNaN(parseInt(newRowHeight, 10)))
                newRowHeight = parseInt($row.css("height"),10)    
              else           
                newRowHeight= Math.max(newRowHeight,0);
              
              $rowCells = $row.children(".cellcontainer, .datacell, .textcell");
              var cellPercentages = jimUtil.getCellsPercentage($row.closest("table"),$rowCells);
              $table = $row.closest("table");
              
              var tableProperties = {"width": newRowWidth};
          	  if(effect)
          		$table.animate(tableProperties, effect);
        	  else
        		$table.css(tableProperties);
          	  
              if(jimUtil.exists(newRowWidth)){
                for(i=0, iLen = $rowCells.length; i < iLen; i += 1) {
                    $currentCell = jQuery($rowCells[i]);
                    var cellBorderLeftWidth = isNaN(jimEvent.fn.getCurrentStyle('border-left-width', $currentCell)) ? 0 : jimEvent.fn.getCurrentStyle('border-left-width', $currentCell);
                    var cellBorderRightWidth = isNaN(jimEvent.fn.getCurrentStyle('border-right-width', $currentCell)) ? 0 : jimEvent.fn.getCurrentStyle('border-right-width', $currentCell);
                
                    newCellWidth =   Math.max(((newRowWidth /100) * cellPercentages.width[i])-cellBorderLeftWidth - cellBorderRightWidth,1);
                    
                    jimUtil.resizeCell($currentCell,newCellWidth,undefined,effect,false);
                }
              }
 
              if(jimUtil.exists(newRowHeight)){
                 jimUtil.resizeCell(jQuery($rowCells[0]),undefined,newRowHeight,effect);
              } 
         }
      },
      "resizeTable": function($table, newTableWidth, newTableHeight, effect, callback) {
         var i,iLen, $cells ,$currentCell, tableWidth, tableHeight, cellWidth,cellHeight;
         if(jimUtil.exists($table) && ($table.is(".table") || $table.is(".datalist"))){
              if(!jimUtil.exists(newTableWidth) || isNaN(parseInt(newTableWidth, 10)))
                newTableWidth = parseInt($table.css("width"),10);
              else{
                var tableBorderLeftWidth = isNaN(jimEvent.fn.getCurrentStyle('border-left-width', $table)) ? 0 : jimEvent.fn.getCurrentStyle('border-left-width', $table);
                var tableBorderRightWidth = isNaN(jimEvent.fn.getCurrentStyle('border-right-width', $table)) ? 0 : jimEvent.fn.getCurrentStyle('border-right-width', $table);
                newTableWidth= Math.max(newTableWidth - tableBorderLeftWidth - tableBorderRightWidth - jimEvent.fn.getCurrentStyle('padding-left', $table) - jimEvent.fn.getCurrentStyle('padding-right', $table),0);
              }
              if(!jimUtil.exists(newTableHeight) || isNaN(parseInt(newTableHeight, 10)))
                newTableHeight = parseInt($table.css("height"),10)    
              else{     
                var tableBorderTopWidth = isNaN(jimEvent.fn.getCurrentStyle('border-top-width', $table)) ? 0 : jimEvent.fn.getCurrentStyle('border-left-width', $table);
                var tableBorderBottomWidth = isNaN(jimEvent.fn.getCurrentStyle('border-bottom-width', $table)) ? 0 : jimEvent.fn.getCurrentStyle('border-right-width', $table);     
                newTableHeight= Math.max(newTableHeight - tableBorderTopWidth - tableBorderBottomWidth - jimEvent.fn.getCurrentStyle('padding-top', $table) - jimEvent.fn.getCurrentStyle('padding-bottom', $table),0);
              }
              $cells = $table.children("tbody, thead").children("tr").children(".cellcontainer, .datacell, .textcell");
              var cellPercentages = jimUtil.getCellsPercentage($table,$cells);
              
              for(i=0, iLen = $cells.length; i < iLen; i += 1) {
                $currentCell = jQuery($cells[i]);
                var cellBorderLeftWidth = isNaN(jimEvent.fn.getCurrentStyle('border-left-width', $currentCell)) ? 0 : jimEvent.fn.getCurrentStyle('border-left-width', $currentCell);
                var cellBorderRightWidth = isNaN(jimEvent.fn.getCurrentStyle('border-right-width', $currentCell)) ? 0 : jimEvent.fn.getCurrentStyle('border-right-width', $currentCell);
                var cellBorderTopWidth = isNaN(jimEvent.fn.getCurrentStyle('border-top-width', $currentCell)) ? 0 : jimEvent.fn.getCurrentStyle('border-left-width', $currentCell);
                var cellBorderBottomWidth = isNaN(jimEvent.fn.getCurrentStyle('border-bottom-width', $currentCell)) ? 0 : jimEvent.fn.getCurrentStyle('border-right-width', $currentCell);     
                
                var cellProperties = {"width": Math.max(((newTableWidth /100) * cellPercentages.width[i])-cellBorderLeftWidth- cellBorderRightWidth,1),"height": Math.max(((newTableHeight/100) * cellPercentages.height[i])-cellBorderTopWidth - cellBorderBottomWidth,1)};
            	if(effect)
            		$currentCell.animate(cellProperties, effect);
          		else
          			$currentCell.css(cellProperties);
                
              }
              var tableProperties = {"width": newTableWidth,"height": newTableHeight};
          	  if(effect){
          		if(callback)
          			jQuery.extend(effect, {"always": callback});
          		$table.animate(tableProperties, effect);
          	  }else
        		$table.css(tableProperties);
          } 
      },   
      "getCellsPercentage": function($table, $cells){
        var i,iLen, $cell,cellWidth,cellHeight;
        var tableWidth = parseInt($table.css("width"),10);    
        var tableHeight = parseInt($table.css("height"),10);    
        var widthPerc = [];
        var heightPerc = [];
        for(i=0, iLen = $cells.length; i < iLen; i += 1) {
            $cell = jQuery($cells[i]);
            var cellBorderLeftWidth = isNaN(jimEvent.fn.getCurrentStyle('border-left-width', $cell)) ? 0 : jimEvent.fn.getCurrentStyle('border-left-width', $cell);
            var cellBorderRightWidth = isNaN(jimEvent.fn.getCurrentStyle('border-right-width', $cell)) ? 0 : jimEvent.fn.getCurrentStyle('border-right-width', $cell);
            var cellBorderTopWidth = isNaN(jimEvent.fn.getCurrentStyle('border-top-width', $cell)) ? 0 : jimEvent.fn.getCurrentStyle('border-left-width', $cell);
            var cellBorderBottomWidth = isNaN(jimEvent.fn.getCurrentStyle('border-bottom-width', $cell)) ? 0 : jimEvent.fn.getCurrentStyle('border-right-width', $cell);     
                
            cellWidth= Math.max(parseInt($cell.css("width"),10) +cellBorderLeftWidth + cellBorderRightWidth,0);
            cellHeight= Math.max(parseInt($cell.css("height"),10) + cellBorderTopWidth + cellBorderBottomWidth,0);
            widthPerc[i]= (cellWidth / tableWidth)*100;
            heightPerc[i]= (cellHeight / tableHeight)*100;
        } 
        return {
             "width": widthPerc,
             "height": heightPerc};
      },
	  "hexToRgb": function (hex) {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});

		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	  },
	  "rgbToHex": function (rgb) {
		try {
			if(rgb.startsWith("rgb(")) {
				var colorInput = rgb.substring(4, rgb.length-1);
				colors = colorInput.split(",");
				var result = "#";
				for(i=0, iLen=colors.length; i<iLen; i+=1) {
				  result += jimUtil.toHex(parseInt(colors[i]));
				}
			
				return result;
			}
			else return rgb;
		
		} catch(error) {
			return rgb;
		}
	  },
	  "toHex": function (N) {
		 if (N==null) return "00";
		 N=parseInt(N); if (N==0 || isNaN(N)) return "00";
		 N=Math.max(0,N); N=Math.min(N,255); N=Math.round(N);
		 return "0123456789ABCDEF".charAt((N-N%16)/16)
			  + "0123456789ABCDEF".charAt(N%16);
	  },
	  "getScale" : function(){
	      var scale=1;
	      if(window.jimUtil.scale != undefined && window.jimUtil.scale != 'none' && window.jimUtil.scale != 0){
	    	  scale = window.jimUtil.scale/100;
	      }
	      if(scale==0)
	    	  scale=1;
	      
	      return scale;
	  },
	  "getZoom" : function(){
	      var zoom=1;
	      if(window.jimMobile) {
	     	 zoom = window.jimMobile.getZoom();
	       }
	      if(zoom==0)
	    	  zoom=1;
	      
	      return zoom;
	  },
	  "getTotalScale" : function(){
	      return (1/jimUtil.getZoom())*(jimUtil.getScale());
	  },
	  "isChrome" : function(){
		   	var expChrome = /Chrome\/([0-9]+).([0-9]+)/g ;
		   	var match = expChrome.exec(window.navigator.userAgent);
		   	return match ;
	},
	  "isChromeLocal" : function(){
	   	var expChrome = /Chrome\/([0-9]+).([0-9]+)/g ;
	   	var match = expChrome.exec(window.navigator.userAgent);
	   	return match && Number(match[1]) >= 5 && window.location.href.indexOf('file://') >= 0;
	  },
	  "chromeExtension" : false,
	  "getBaseID" : function(id){
		  var regExp = "^r[0-9]+_";
		  if(id.match(regExp)){
			return id.substring(id.indexOf("_")+1);  
		  }
		  return id;
	  },
	  "isIE" : function () {
		  return jQuery.browser.msie || jimUtil.isIE11();
	  },
	  "isIE11" : function(){
		  return !!navigator.userAgent.match(/Trident\/7\./);
	  },
	  "isMobileDevice": function() {
			var userAgent = navigator.userAgent;
			var mobileTypes = {
			  android: userAgent.match(/Android/),
			  ios: userAgent.match(/(iPhone|iPad|iPod)/),
			  windows: userAgent.match(/Windows Phone/)
			};

			if(mobileTypes.android || mobileTypes.ios || mobileTypes.windows)
			  return true;
			else
			  return false;
	  },
	  "isOnScreen": function($element, x, y) {
		    if(x == null || typeof x == 'undefined') x = 1;
		    if(y == null || typeof y == 'undefined') y = 1;
		    
		    var win = $(window);
		    var viewport = {
		        top : win.scrollTop(),
		        left : win.scrollLeft()
		    };
		    viewport.right = viewport.left + win.width();
		    viewport.bottom = viewport.top + win.height();
		    
		    var height = $element.outerHeight();
		    var width = $element.outerWidth();
		 
		    if(!width || !height){
		        return false;
		    }
		    
		    var bounds = $element.offset();
		    bounds.right = bounds.left + width;
		    bounds.bottom = bounds.top + height;
		    
		    var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
		    
		    if(!visible){
		      return false;   
		    }
		    
		    var deltas = {
		      top : Math.min( 1, ( bounds.bottom - viewport.top ) / height),
		      bottom : Math.min(1, ( viewport.bottom - bounds.top ) / height),
		      left : Math.min(1, ( bounds.right - viewport.left ) / width),
		      right : Math.min(1, ( viewport.right - bounds.left ) / width)
		    };
		    
		    return (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y;
		    
		}
    };
  /* END UTILITY FUNCTIONS */

  /* expose utilities to the global object */
  window.itemType = itemType;
  window.jimUtil = jimUtil;
})(window);

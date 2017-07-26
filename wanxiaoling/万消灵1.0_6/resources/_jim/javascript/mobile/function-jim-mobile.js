/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function(window, undefined) {
	  var zoomLevels = [50, 75, 100, 150];
	  
	    $('#gestureTool').customSelect();
		$('.gesturecontrol span.customSelect').html("Gestures");
		
	  /* rotate */
	  jQuery("#rotateDevice").bind("click", function(event) {
	    var isPortrait = jQuery('#jim-container.portrait');
		if(isPortrait && isPortrait.length===1) {
		  if($.browser.msie) {
			  rotateToLandscape();			  
			  jimMobile.resetWidgets();
			  if($.browser.version<9)
				  restoreZoom(jimMobile.getZoom());
			  jQuery('.orientationlandscape').trigger("orientationlandscape");
			  jQuery(window).trigger("resize");
			  jQuery(window).trigger("reloadScrollBars");
		  }
		  else {
			  $('#jim-mobile').fadeOut('slow', function() { 
				  rotateToLandscape();
				  $('#jim-mobile').fadeIn("slow", function() {
					jimMobile.resetWidgets();
					jQuery('.orientationlandscape').trigger("orientationlandscape");
					jQuery(window).trigger("resize");
					jQuery(window).trigger("reloadScrollBars");
				  });
			  });
		  }
		}
		else {
		  if($.browser.msie) {
			  rotateToPortrait();
			  jimMobile.resetWidgets();
			  if($.browser.version<9)
				  restoreZoom(jimMobile.getZoom());
			  jQuery('.orientationportrait').trigger("orientationportrait");
		      jQuery(window).trigger("resize");
		      jQuery(window).trigger("reloadScrollBars");
		  }
		  else {
			  $('#jim-mobile').fadeOut('slow', function() {
				  rotateToPortrait();
				  $('#jim-mobile').fadeIn("slow", function() {
					jimMobile.resetWidgets();
					jQuery('.orientationportrait').trigger("orientationportrait");
					jQuery(window).trigger("resize");
					jQuery(window).trigger("reloadScrollBars");
				  });
			  });
		  }
		}
	  });
	  
	  function rotateToLandscape() {
		  var transX = parseFloat(50 / ((parseInt(jQuery("#jim-mobile").css("width")) + ".0") / (parseInt(jQuery("#jim-mobile").css("height")) + ".0")));
		  if(jQuery("#jim-body").is(".mobilecustom, .android_phone, .android_tablet, .google_glass")) {
			  jQuery('#jim-case').css('-moz-transform', "rotate(90deg)");
			  jQuery('#jim-case').css('-webkit-transform', "rotate(90deg)");
			  jQuery('#jim-case').css('transform', "rotate(90deg)");
			  jQuery('#jim-case').css('-ms-transform', "rotate(90deg)");
			  if($.browser.msie && $.browser.version<9) {
				  jQuery('#jim-case').css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=1)');
			  }
			  jQuery('#jim-case').css('-moz-transform-origin', transX + "% 50% 0");
			  jQuery('#jim-case').css('-webkit-transform-origin', transX + "% 50% 0");
			  jQuery('#jim-case').css('transform-origin', transX + "% 50% 0");
			  jQuery('#jim-case').css('-ms-transform-origin', transX + "% 50%");
		  }
		  
		  var width = jQuery("#jim-mobile").css("width");
		  jQuery("#jim-mobile").css('width', jQuery("#jim-mobile").css("height"));
		  jQuery("#jim-mobile").css('height', width);
		  jQuery('#jim-mobile').addClass("landscape").removeClass("portrait");
		  jQuery('#jim-container').addClass("landscape").removeClass("portrait");
		  jQuery('#jim-case').addClass("landscape").removeClass("portrait");
		  jQuery('.ui-page > .horizontalScroll').css("width", 0);
		  jQuery('.ui-page > .verticalScroll').css("height", 0);
		  jQuery('.ui-page > .horizontalScroll').css("margin-top", 0);
		  jQuery('.ui-page > .horizontalScroll').css("margin-left", 0);
		  jQuery('.ui-page > .verticalScroll').css("margin-top", 0);
		  jQuery('.ui-page > .verticalScroll').css("margin-left", 0);
	  }
	  
	  function rotateToPortrait() {
		  if(jQuery("#jim-body").is(".mobilecustom, .android_phone, .android_tablet, .google_glass")) {
			  jQuery('#jim-case').css('-moz-transform', "rotate(0deg)");
			  jQuery('#jim-case').css('-webkit-transform', "rotate(0deg)");
			  jQuery('#jim-case').css('transform', "rotate(0deg)");
			  jQuery('#jim-case').css('-ms-transform', "rotate(0deg)");
			  if($.browser.msie && $.browser.version<9) {
				  jQuery('#jim-case').css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=0);');
			  }
			  jQuery('#jim-case').css('-moz-transform-origin', "");
			  jQuery('#jim-case').css('-webkit-transform-origin', "");
			  jQuery('#jim-case').css('transform-origin', "");
			  jQuery('#jim-case').css('-ms-transform-origin', "");
		  }
		  
		  var width = jQuery("#jim-mobile").css("width");
		  jQuery("#jim-mobile").css('width', jQuery("#jim-mobile").css("height"));
		  jQuery("#jim-mobile").css('height', width);
		  jQuery('#jim-mobile').addClass("portrait").removeClass("landscape");
		  jQuery('#jim-container').addClass("portrait").removeClass("landscape");
		  jQuery('#jim-case').addClass("portrait").removeClass("landscape");
		  jQuery('.ui-page > .horizontalScroll').css("width", 0);
		  jQuery('.ui-page > .verticalScroll').css("height", 0);
		  jQuery('.ui-page > .horizontalScroll').css("margin-top", 0);
		  jQuery('.ui-page > .horizontalScroll').css("margin-left", 0);
		  jQuery('.ui-page > .verticalScroll').css("margin-top", 0);
		  jQuery('.ui-page > .verticalScroll').css("margin-left", 0);
	  } 
	  
	  /* gesture tool */
	  jQuery("#gestureTool").val(0);
	  if($.browser.msie) {
		$(document).ready(function() {
		  document.getElementById('gestureTool').selectedIndex=0;
		});
	  }
	  
	  jQuery("#gestureTool").change(function(event) {
	    var tools = jQuery("#gestureTool").prop("selectedIndex");
	    jimMobile.disableTools();
		switch(tools) {
		  case 0:
			enableTouchTool();
			jimMobile.tool = "touch";
		    break;
		  case 1:
			enablePinchTool();
			jimMobile.tool = "pinch";
		    break;
		  case 2:
			enableRotateTool();
			jimMobile.tool = "rotate";
		    break;
		  default:
			break;
		}
	  });
	
	  function enableTouchTool() {
		  jQuery("#jim-container").addClass("touch");
	  };
	  
	  function enablePinchTool() {
		  $page = jQuery("#jim-container");
		  var cursor1 = '<div id="cursor1" class="cursor"></div>';
		  var cursor2 = '<div id="cursor2" class="cursor"></div>';	
		  var m1, m2, doPinch=false;
		  var Y, target;
		  var zoomLev = jimMobile.getZoom();
		  
		  $page.bind("mousemove", function(e, data) {
			if(doPinch === false) {
				$("#cursor1").css({left:(e.pageX - $page.offset().left)*zoomLev-50, top:(e.pageY - $page.offset().top)*zoomLev+50});
				$("#cursor2").css({left:(e.pageX - $page.offset().left)*zoomLev+50, top:(e.pageY - $page.offset().top)*zoomLev-50});
		    }
			else {
				Y = ((e.pageY - $page.offset().top)*zoomLev - m2);
				if(Y<-35)
				Y=-35;
				else if(Y>35)
				Y=35;
				$("#cursor1").css({left:m1-50-Y, top:m2+50+Y});
				$("#cursor2").css({left:m1+50+Y, top:m2-50-Y});
			}
		  });
		  
		  $page.bind("drag", function(e, data) {
			return true;
		  });
			
		  $page.bind("dragstart", function(e, data) {
			m1 = (e.pageX - $page.offset().left)*zoomLev; //pos actual del ratón
			m2 = (e.pageY - $page.offset().top)*zoomLev;
			doPinch=true;
			target = e.target;
			return true;
		  });
			
		  $page.bind("mouseup", function(e, data) {
			  if(doPinch) {
				 doPinch=false;
			   if(m2-((e.pageY - $page.offset().top)*zoomLev)<0)
				 jQuery(target).closest(".firer").trigger("pinchopen");
			   else if(m2-((e.pageY - $page.offset().top)*zoomLev)>0) 
				 jQuery(target).closest(".firer").trigger("pinchclose");
			  }
		  });
		  
		  $page.bind("mouseenter", function(e, data) {
			if(doPinch===false) {
				$page.append(cursor1+cursor2);
				zoomLev = jimMobile.getZoom();
			}
		  });
		  
		  $page.bind("mouseleave", function(e, data) {
			if(doPinch===false) {
				jQuery("#cursor1").remove();
				jQuery("#cursor2").remove();
			}
		  });  
	  };
	
	  function enableRotateTool() {
		  $page = jQuery("#jim-container");
		  var cursor1 = '<div id="cursor1" class="cursor"></div>';
		  var cursor2 = '<div id="cursor2" class="cursor"></div>';
		  var m1, m2, doRotate=false;
		  var angleRad, target;
		  var distance = 142;
		  var zoomLev = jimMobile.getZoom();
		  
		  $page.bind("mousemove", function(e, data) {
			if(doRotate === false) {
				$("#cursor1").css({left:(e.pageX - $page.offset().left)*zoomLev-50, top:(e.pageY - $page.offset().top)*zoomLev+50});
				$("#cursor2").css({left:(e.pageX - $page.offset().left)*zoomLev+50, top:(e.pageY - $page.offset().top)*zoomLev-50});
		    }
			else {
				var v1x=m1-50;
				var v1y=m2+50;
				var v2x=(e.pageX - $page.offset().left)*zoomLev;
				var v2y=(e.pageY - $page.offset().top)*zoomLev;
				var distX = v2x - v1x;
				var distY = v1y - v2y;
				angleRad = Math.atan(distY/distX);
				if(distX<0)
				  angleRad= angleRad + Math.PI;	
				  
				if(angleRad>(3*Math.PI/4))
				  angleRad=3*Math.PI/4;
				else if(angleRad<-(Math.PI/4))
				  angleRad=-Math.PI/4;
				
				var X = Math.round(distance * Math.cos( angleRad ) );
				var Y = Math.round(distance * Math.sin( angleRad ) );
				
				$("#cursor1").css({left:m1-50, top:m2+50});
				$("#cursor2").css({left:m1-50+X, top:m2+50-Y});
			}
		  });
		  
		  $page.bind("drag", function(e, data) {
			return true;
		  });
			
		  $page.bind("dragstart", function(e, data) {
			m1 = (e.pageX - $page.offset().left)*zoomLev; //pos actual del ratón
			m2 = (e.pageY - $page.offset().top)*zoomLev;
			doRotate=true;
			target = e.target;
			return true;
		  });
			
		  $page.bind("mouseup", function(e, data) {
			if(doRotate) {
			  doRotate=false;
			  if((angleRad*180/Math.PI)<45)
				jQuery(target).closest(".firer").trigger("rotateright");
			  else if((angleRad*180/Math.PI)>45) 
				jQuery(target).closest(".firer").trigger("rotateleft");
			}
		  });
		  
		  $page.bind("mouseenter", function(e, data) {
			if(doRotate===false) {
			  $page.append(cursor1+cursor2);
			  zoomLev = jimMobile.getZoom();
			}
		  });
		  
		  $page.bind("mouseleave", function(e, data) {
			if(doRotate===false) {
				jQuery("#cursor1").remove();
				jQuery("#cursor2").remove();
			}
		  }); 
	  };
	
	  /* zoom */
	  if($.browser.msie && $.browser.version<9) {
		  if(jQuery("#zoomValue").attr("disabled")===undefined)
			  jQuery("#zoomValue").attr("disabled", "disabled");
		  jQuery(".zoomcontrol").attr("title", "Your browser doesn't support the zoom feature");
	  }
	  else {
		  jQuery("#zoomValue").change(function(event) {
		    var zoom = jQuery("#zoomValue").prop("selectedIndex");
			switch(zoom) {
			  case 0:
				setZoom(zoomLevels[0]/100);
			    break;
			  case 1:
				setZoom(zoomLevels[1]/100);
			    break;
			  case 2:
				setZoom(zoomLevels[2]/100);
			    break;
			  case 3:
				setZoom(zoomLevels[3]/100);
				break;
			  default:
				break;
			}
		  });
	  }
		 
	  function setZoom(zoomLev) {
		  var $mobile = jQuery('#jim-mobile');
		  $mobile.css('-webkit-transform-origin', '50% 0 0');
		  $mobile.css('-webkit-transform', "scale(" + zoomLev + ")");
		  $mobile.css('-moz-transform-origin', '50% 0 0');
		  $mobile.css('-moz-transform', "scale(" + zoomLev + ")");
		  $mobile.css('-o-transform-origin', '50% 0 0');
		  $mobile.css('-o-transform', "scale(" + zoomLev + ")");
		  $mobile.css('-ms-transform-origin', '50% 0'); //IE9
		  $mobile.css('-ms-transform', "scale(" + zoomLev + ")");
		  $mobile.css('transform-origin', '50% 0');
		  $mobile.css('transform', "scale(" + zoomLev + ")");
		  
		  if($.browser.msie && $.browser.version<9) {
			  var $container = jQuery('#jim-container'),
			  oldZoom = 1/jimMobile.getZoom();
			  $mobile.css('zoom', zoomLev);
			  $container.css('top', parseInt(((parseInt($container.css("top"))/oldZoom) *zoomLev)));
			  $container.css('left', parseInt(((parseInt($container.css("left"))/oldZoom) *zoomLev)));
		  }
		  
		  //TODO
		  //Change the cursor images if touch to give the "zoom" to mouse pointer. 
	  };
	  
	  function restoreZoom(zoomLev) {
		  var zoom = 1/zoomLev,
		  $container = jQuery('#jim-container'),
		  $mobile = jQuery('#jim-mobile'),
		  oldZoom = 1/jimMobile.getZoom();
		  
		  $container.css("top", "");
		  $container.css("left", "");

		  var top = $container.css("top");
		  var left = $container.css("left");
		  $mobile.css("width", "");
		  $mobile.css("height", "");
			  
		  if(oldZoom===1 && zoomLev===1) {}
		  else {
			  $container.css('top', parseInt(parseInt((parseInt(top)) *zoom)));
			  $container.css('left', parseInt(parseInt((parseInt(left)) *zoom)));
		  }
	  }
	  
	  function indexOf(zoomLevels, currentLevel) {
		  var value = parseInt(currentLevel);
		  for (var i=0; i < zoomLevels.length; i++) {
			if (zoomLevels[i] == value)
			  return i;
		  }
		  return -1;
	  };

	  
	  /* other */
	  var jimMobile = {
		"orientation": function() {
			var width = parseInt(jQuery("#simulation").css("width"));
			var height = parseInt(jQuery("#simulation").css("height"));
			return (width<height) ? "portrait" : "landscape";
		},
		 "isiOSDevice": function() {
			var userAgent = navigator.userAgent;
			var mobileTypes = {
			  ios: userAgent.match(/(iPhone|iPad|iPod)/)
			};

			if(mobileTypes.ios)
			  return true;
			else
			  return false;
		 },
		"tool": "touch",
		"load": function() {
		  if(jimUtil.isMobileDevice()) {
			if(jQuery("#jim-mobile").length) {
				var simulation = jQuery("#simulation");
				jQuery("#jim-mobile").detach();
				jQuery("#jim-body").append(simulation);
			}
			jQuery("body").removeClass("showComments");
			jQuery("#toppanel").removeClass("open hidden").addClass("hidden");
			jQuery("#sidepanel").removeClass("open hidden").addClass("hidden");
			jQuery("#jim-body").removeClass("controlled full").addClass("full");
			jQuery("#topInfo").removeClass("hidden").addClass("hidden");
		  }
		  jQuery("body").css("display", "block");
		},
		"loadComponents": function() {
			if(!jimUtil.isMobileDevice()) {
			  if(jQuery("#jim-ipad-kb").length===0 && jQuery("#jim-iphone-kb").length===0) {
			      jimMobile.loadSimulator();
			  }
		      jimMobile.loadScrollBars();
		    }
		 },
		 "unloadComponents": function() {
			if(!jimUtil.isMobileDevice()) {
			  jimMobile.unloadSimulator();
		    }
		 },
		 "getZoom": function() {
			var value = jQuery('#zoomValue :selected').text();
			return 1/(parseInt(value.substring(0, value.indexOf("%")))/100);
		 },
		 "isIOS": function() {
			 return jQuery(".iphone4, .iphone5, .iphone6, .iphone6plus, .ipad").length>0;
		 },
		 "disableTools" : function() {
			$page = jQuery("#jim-container");
			$page.removeClass("touch");
			jQuery("#cursor1").remove();
			jQuery("#cursor2").remove();
			$page.unbind('mousemove');
			$page.unbind('drag');
			$page.unbind('dragstart');
			$page.unbind('mouseup');
			$page.unbind('mouseenter');
			$page.unbind('mouseleave');
			jimMobile.hideWidgets();
			jimMobile.resetWidgets();
		}
	  };
	  window.jimMobile = jimMobile; /* expose to the global object */

})(window);

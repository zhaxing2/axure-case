/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function (window, undefined) {
  jQuery("#simulation")
  .on('mousedown', ".radiobutton", function(event) {
	var $target = jQuery(event.target),
	target = event.target,
	disabled = $target.attr("disabled") && $target.attr("disabled").length>0;
	
	if(!disabled) {
		if(!$target.attr("name")) {
			$target.attr("checked", true);
		}
		else {
			//radios inside groups
			radioGroup($target).each(function() { 
		      if (this===target) { 
		          $(this).attr("checked", true);
		      } else { 
		          $(this).attr("checked", false);
		          jimUtil.forceReflow();
		      } 
		    });
			//radiobutton list
			radioList($target).each(function() { 
		      if (this===target) { 
		          $(this).attr("checked", true);
		      } else { 
		          $(this).attr("checked", false);
		          jimUtil.forceReflow();
		      } 
		    });
		}
	}
  })
  .on('mousedown', ".checkbox", function(event) {
	var $target = jQuery(event.target),
	disabled = $target.attr("disabled") && $target.attr("disabled").length>0,
	selected = ($target.attr("checked") && ($target.attr("checked")==="checked" || $target.attr("checked")===true));
	
	if(!disabled) {
		if(selected===undefined || selected===false) {
			$target.attr("checked", true);
		}
		else if(selected===true) {
			$target.attr("checked", false);
		}
	}
  });
  
  radioGroup = function($radio) { 
	var name = $radio.attr("name"), 
	form = jQuery("#simulation"), 
	radios = $( [] ); 
	if (name) { 
	  if (form) { 
	    radios = $(form).find( "[name='" + name + "']" ); 
	  } else { 
	    radios = $( "[name='" + name + "']", radio.ownerDocument ) 
	    .filter(function() { 
	       return !this.form; 
	    }); 
	  } 
	} 
	return radios; 
  }; 
  
  radioList = function($radio) { 
    var form = $radio.closest(".collapse"), 
	radios = $( [] ); 
	if (form) { 
	  radios = $(form).find(".radiobutton"); 
	} else { 
	  radios.add($radio);
	} 
	return radios; 
  }; 

})(window);
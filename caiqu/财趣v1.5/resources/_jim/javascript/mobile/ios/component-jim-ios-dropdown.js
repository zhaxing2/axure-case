/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function (window, undefined) {
  jQuery("#simulation")
  .on("click", ".nativedropdown > *", function(event, data) {
	var $target = jQuery(event.target.parentElement || event.srcElement.parentElement).closest(".nativedropdown");
	$target.removeClass("pressed").addClass("pressed");
  })
})(window);
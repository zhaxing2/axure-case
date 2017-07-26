/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function(window, undefined) {
    /*********************** START LOCAL METHOD DEFINITION ************************/
    function addHighlightListenerLocal() {
	jQuery("#highlight-select li").mouseup(function () {
			var $option, $imagesmap;
			$option = $(this);
			
			var value = $option[0].attributes[0].value;
						
			$imagesmap = jQuery("#simulation .imagemap" + value.replace(/ ./g,'.imagemap.'));
			$imagesmap.css("background-color", "#ffff99"); 
				
			jimUtil.show(jQuery("#simulation " + value).not(':hidden'), { "effect": { "type": "pulsate", "duration": 1000, "times":2 } }).done(function() { 
				$imagesmap.css("background-color", "");
			});
		});
    }

    /* START MAIN */
    addHighlightListenerLocal();
    /* END MAIN */

})(window);
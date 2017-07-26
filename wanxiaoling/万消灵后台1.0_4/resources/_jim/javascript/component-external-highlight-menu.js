(function ($) {
    'use strict';

    $.fn.extend({
        customMenu: function (options) {
            var defaults = {
                    customClass: 'customMenu'
            },
            options = $.extend(defaults, options),
            prefix = options.customClass,
            $mainDiv = $(this),
            $menu = $mainDiv.children("ul");
            document.getElementById("topInfo").appendChild($menu[0]);
			var $highlightContainer = $(this).closest(".highlight");
            
			$highlightContainer.on("click",function(){
				$highlightContainer.toggleClass("open");
				if($highlightContainer.hasClass("open")){
					$menu.css('left',$highlightContainer[0].offsetLeft);
					$menu.css('width',$highlightContainer[0].offsetWidth);
					$menu.show('slide',{direction:'up'},500);
				}
				else{
					$menu.hide();
				}
            });
            
            var $options = $menu.children("li");
			$options.on("click",function(){
				$highlightContainer.removeClass("open");
				$menu.hide();
			});
			
			$("body").mousedown(function(event){
				if($(event.target).closest(".highlight").length || $(event.target).closest("#highlight-menu").length)return;
				if($highlightContainer.hasClass("open")){
					$highlightContainer.removeClass("open");
					$menu.hide();
				}
			});
			
			window.onresize = function(event){
				$highlightContainer.removeClass("open");
				$menu.hide();
			};
        }
    });
})(jQuery);
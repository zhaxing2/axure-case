/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function(window, undefined) {
  var $navigationTree = jQuery("#navigationtree"),
      $canvasName = jQuery("#infoContent").find("#canvasname");
  $navigationTree
    .click(function(event) {
      var $firer = jQuery(event.target || event.srcElement), $node = $firer.closest("li");
      if($node.length) {
        event.stopPropagation();
        if(($firer.hasClass("icon") && !$node.hasClass("leaf")) || $node.hasClass("folder")) {
          $node.toggleClass("closed").toggleClass("open");
        } else if (!$node.hasClass("folder")) {
          jimMain.navigate($node.children("a").attr("href"), {"transition": "none"});
        }
        return false;
      }
    })
    .bind("load", function(event, target) {
      var name;
      $navigationTree.find(".current").removeClass("current").end().find("a").each(function(i, link) {
        if(link.attributes.href.value === target) {
          link.className += " current";
		  $(link).closest("li").addClass("current");
          return false;
        }
      });
      
      name = lookUpName(target);
      $canvasName.text("/ "+name).attr("title", name);
    });
})(window);
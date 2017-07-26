/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function($) {
	$.fn.caret=function(options){
		var txtbox=this[0];
		if(options) {
			if ($.browser.msie) {
		    	var selRange = txtbox.createTextRange();
				selRange.collapse(true);
				selRange.moveStart('character', options.start);
				selRange.moveEnd('character', options.end);
				selRange.select();
		    } else {
		    	txtbox.selectionStart=options.start;
		    	txtbox.selectionEnd=options.end;
		    }
			txtbox.focus();
			return this;
		}
		else {
			if ($.browser.msie) {
				return getCaretPosIE(txtbox);
		    } else {
		        return getCaretPosGecko(txtbox);
		    }
		}
		
	    function getCaretPosGecko(txtbox) {
	    	txtbox.focus();
	        return {start:txtbox.selectionStart, end:txtbox.selectionEnd};
	    }
		
	    function getCaretPosIE(txtbox) {        
	        return {start:txtbox.value.length, end:txtbox.value.length};
	    }	
	}
})(jQuery);

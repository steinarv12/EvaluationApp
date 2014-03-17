app.directive( "centrisHint", function($window){
	return {
		restrict: 'A',
		link: function( scope, element, attr ){
			// Get access to the text that should be displayed as a hint
			// when our element gains focus. 
			var text = attr.centrisHint;

			// Create the actual hint element. Note that it contains a 
			// inner span element which is solely used to render an "arrow"
			// on the left of the hint element. We create these two elements separately,
			// so we can manipulate the (outer) hint element at will.
			var hintElem = angular.element("<span class='hint'></span>");
			var hintChild = angular.element("<p>" + text + "</p><span class='hint-pointer'&nbsp;</span>");
			hintElem.append(hintChild);
			element.parent().append(hintElem);

			// Set those CSS properties which are necessary for the hint to
			// function properly. The rest (color, font etc.) should be set 
			// by the user of this directive.
			hintElem.css("display", "none");
			hintElem.css("position", "absolute");
			hintElem.css("width", "200px");

			// Create the event handlers for the element itself, where we
			// show/hide the hint element. 
			element.bind("focus", function(){
				// Show the element. Since jqLite doesn't implement show()/hide(), 
				// we must do this manually.
				hintElem.css("display", "");

				// Figure out where the hint should be displayed, by getting the absolute
				// position of the input, and move the hint element to the right of it.
				// We must also take the scroll position of the page into account.
				var elemRect = element[0].getBoundingClientRect();
				// http://ejohn.org/blog/getboundingclientrect-is-awesome/
				hintElem.css("left", elemRect.right);
				hintElem.css("top", elemRect.top + $window.pageYOffset);
			});
			element.bind("blur", function(){
				hintElem.css("display", "none");
			});
		}
	};
});
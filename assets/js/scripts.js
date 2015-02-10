'use strict';

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
	target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$(document).on('click', '.navbar-collapse ul li a', function (e) {
	$('.navbar-toggle:visible').click();
});

// Routes requests from outside of AngularJS.
function requestRouter(router, data) {
	var bodyElm = angular.element('body');
	if (bodyElm.scope && typeof bodyElm.scope === "function") {
		bodyElm.scope().$emit(router, data);
	}
}
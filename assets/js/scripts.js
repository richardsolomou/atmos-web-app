'use strict';

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
	target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
	$('.navbar-toggle:visible').click();
});

function getSerialNumber(str) {
	var bodyElm = angular.element('body');
	if (bodyElm.scope && typeof bodyElm.scope === "function") {
		var scope = bodyElm.scope();
		scope.$emit('JavaRouter', { str: str });
	}
}
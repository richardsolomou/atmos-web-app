'use strict';

angular.module('atmos')
	.controller(
		'HomeCtrl',
		[
			'$rootScope',
			function ($rootScope) {
				function init() {
					$rootScope.currentPage = 'home';
				}

				init();
			}
		]
	);
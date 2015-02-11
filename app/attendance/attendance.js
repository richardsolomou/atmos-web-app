'use strict';

angular.module('atmos')
	.controller(
		'AttendanceCtrl',
		[
			'$rootScope',
			function ($rootScope) {
				function init() {
					$rootScope.currentPage = 'attendance';
				}

				init();
			}
		]
	);
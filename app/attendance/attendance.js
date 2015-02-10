'use strict';

angular.module('atmos')
	.controller(
		'AttendanceCtrl',
		[
			'$scope',
			'$rootScope',
			function ($scope, $rootScope) {
				$rootScope.currentPage = 'attendance';
			}
		]
	);
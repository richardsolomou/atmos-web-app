'use strict';

angular.module('atmos')
	.controller(
		'StudentCardCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'Student',
			'RFIDService',
			'messageCenterService',
			function ($scope, $rootScope, $location, Student, RFIDService, messageCenterService) {
				$rootScope.init = function () {
					$rootScope.currentPage = 'students';
					$scope.student = RFIDService.getStudentID();
				}

				$rootScope.init();
			}
		]
	);
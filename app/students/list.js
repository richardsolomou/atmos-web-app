'use strict';

angular.module('atmos')
	.controller(
		'StudentListCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'Student',
			'messageCenterService',
			function ($scope, $rootScope, $location, Student, messageCenterService) {
				$rootScope.currentPage = 'students';

				$scope.update = function (student_id) {
					$location.path('/students/' + student_id);
				};

				$scope.create = function () {
					$location.path('/students/create');
				};

				Student.query(function (data) {
					$scope.students = data.data;
				}, function (error) {
					messageCenterService.add('danger', error, { status: messageCenterService.status.next });
				});
			}
		]
	);
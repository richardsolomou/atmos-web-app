'use strict';

angular.module('atmos')
	.controller(
		'LecturerListCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'Lecturer',
			'messageCenterService',
			function ($scope, $rootScope, $location, Lecturer, messageCenterService) {
				$rootScope.currentPage = 'lecturers';

				$scope.update = function (lecturer_id) {
					$location.path('/lecturers/' + lecturer_id);
				};

				$scope.create = function () {
					$location.path('/lecturers/create');
				};

				Lecturer.query(function (data) {
					$scope.lecturers = data.data;
				}, function (error) {
					messageCenterService.add('danger', error, { status: messageCenterService.status.next });
				});
			}
		]
	);
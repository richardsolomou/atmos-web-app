'use strict';

angular.module('atmos')
	.controller(
		'LecturerCreateCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'Lecturer',
			'messageCenterService',
			function ($scope, $rootScope, $location, Lecturer, messageCenterService) {
				$rootScope.currentPage = 'lecturers';
				
				$scope.create = function (isValid) {
					if (isValid) {
						Lecturer.create($scope.lecturer, function (data) {
							messageCenterService.add('success', 'Successfully created lecturer.', { status: messageCenterService.status.next });
							$location.path('/lecturers');
						}, function (error) {
							messageCenterService.add('danger', error, { status: messageCenterService.status.next });
						});
					}
				};

				$scope.cancel = function () {
					$location.path('/lecturers');
				};
			}
		]
	);
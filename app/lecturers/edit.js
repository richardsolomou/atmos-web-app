'use strict';

angular.module('atmos')
	.controller(
		'LecturerEditCtrl',
		[
			'$scope',
			'$rootScope',
			'$routeParams',
			'$location',
			'Lecturer',
			'messageCenterService',
			function ($scope, $rootScope, $routeParams, $location, Lecturer, messageCenterService) {
				$rootScope.currentPage = 'lecturers';
				
				$scope.update = function (isValid) {
					if (isValid) {
						Lecturer.update($scope.lecturer, function (data) {
							messageCenterService.add('success', 'Successfully updated lecturer.', { status: messageCenterService.status.next });
							$location.path('/lecturers');
						}, function (error) {
							messageCenterService.add('danger', error, { status: messageCenterService.status.next });
						});
					}
				};

				$scope.cancel = function () {
					$location.path('/lecturers');
				};

				$scope.delete = function (lecturer_id) {
					Lecturer.delete({ lecturer_id: lecturer_id }, function (data) {
						messageCenterService.add('success', 'Successfully deleted lecturer.', { status: messageCenterService.status.next });
						$location.path('/lecturers');
					}, function (error) {
						messageCenterService.add('danger', error, { status: messageCenterService.status.next });
					});
				};

				Lecturer.get({ lecturer_id: $routeParams.lecturer_id }, function (data) {
					$scope.lecturer = data.data;
				}, function (error) {
					messageCenterService.add('danger', error, { status: messageCenterService.status.next });
				});
			}
		]
	);
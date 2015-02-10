'use strict';

angular.module('atmos')
	.controller(
		'StudentEditCtrl',
		[
			'$scope',
			'$rootScope',
			'$routeParams',
			'$location',
			'Student',
			'messageCenterService',
			function ($scope, $rootScope, $routeParams, $location, Student, messageCenterService) {
				$rootScope.currentPage = 'students';

				$scope.update = function (isValid) {
					if (isValid) {
						Student.update($scope.student, function (data) {
							messageCenterService.add('success', 'Successfully updated student.', { status: messageCenterService.status.next });
							$location.path('/students');
						}, function (error) {
							messageCenterService.add('danger', error, { status: messageCenterService.status.next });
						});
					}
				};

				$scope.cancel = function () {
					$location.path('/students');
				};

				$scope.delete = function (student_id) {
					Student.delete({ student_id: student_id }, function (data) {
						messageCenterService.add('success', 'Successfully deleted student.', { status: messageCenterService.status.next });
						$location.path('/students');
					}, function (error) {
						messageCenterService.add('danger', error, { status: messageCenterService.status.next });
					});
				};

				Student.get({ student_id: $routeParams.student_id }, function (data) {
					$scope.student = data.data;
				}, function (error) {
					messageCenterService.add('danger', error, { status: messageCenterService.status.next });
				});
			}
		]
	);
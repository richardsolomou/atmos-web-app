'use strict';

angular.module('atmos')
	.controller(
		'StudentCreateCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'Student',
			'messageCenterService',
			function ($scope, $rootScope, $location, Student, messageCenterService) {
				$rootScope.currentPage = 'students';

				$scope.create = function (isValid) {
					if (isValid) {
						Student.create($scope.student, function (data) {
							messageCenterService.add('success', 'Successfully created student.', { status: messageCenterService.status.next });
							$location.path('/students');
						}, function (error) {
							messageCenterService.add('danger', error, { status: messageCenterService.status.next });
						});
					}
				};

				$scope.cancel = function () {
					$location.path('/students');
				};
			}
		]
	);
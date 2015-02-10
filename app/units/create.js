'use strict';

angular.module('atmos')
	.controller(
		'UnitCreateCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'Unit',
			'messageCenterService',
			function ($scope, $rootScope, $location, Unit, messageCenterService) {
				$rootScope.currentPage = 'units';

				$scope.create = function (isValid) {
					if (isValid) {
						Unit.create($scope.unit, function (data) {
							messageCenterService.add('success', 'Successfully created unit.', { status: messageCenterService.status.next });
							$location.path('/units');
						}, function (error) {
							messageCenterService.add('danger', error, { status: messageCenterService.status.next });
						});
					}
				};

				$scope.cancel = function () {
					$location.path('/units');
				};
			}
		]
	);
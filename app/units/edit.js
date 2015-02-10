'use strict';

angular.module('atmos')
	.controller(
		'UnitEditCtrl',
		[
			'$scope',
			'$rootScope',
			'$routeParams',
			'$location',
			'Unit',
			'messageCenterService',
			function ($scope, $rootScope, $routeParams, $location, Unit, messageCenterService) {
				$rootScope.currentPage = 'units';

				$scope.update = function (isValid) {
					if (isValid) {
						Unit.update($scope.unit, function (data) {
							messageCenterService.add('success', 'Successfully updated unit.', { status: messageCenterService.status.next });
							$location.path('/units');
						}, function (error) {
							messageCenterService.add('danger', error, { status: messageCenterService.status.next });
						});
					}
				};

				$scope.cancel = function () {
					$location.path('/units');
				};

				$scope.delete = function (unit_id) {
					Unit.delete({ unit_id: unit_id }, function (data) {
						messageCenterService.add('success', 'Successfully deleted unit.', { status: messageCenterService.status.next });
						$location.path('/units');
					}, function (error) {
						messageCenterService.add('danger', error, { status: messageCenterService.status.next });
					});
				};

				Unit.get({ unit_id: $routeParams.unit_id }, function (data) {
					$scope.unit = data.data;
				}, function (error) {
					messageCenterService.add('danger', error, { status: messageCenterService.status.next });
				});
			}
		]
	);
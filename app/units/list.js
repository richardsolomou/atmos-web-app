'use strict';

angular.module('atmos')
	.controller(
		'UnitListCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'Unit',
			'messageCenterService',
			function ($scope, $rootScope, $location, Unit, messageCenterService) {
				$rootScope.currentPage = 'units';

				$scope.update = function (unit_id) {
					$location.path('/units/' + unit_id);
				};

				$scope.create = function () {
					$location.path('/units/create');
				};

				Unit.query(function (data) {
					$scope.units = data.data;
				}, function (error) {
					messageCenterService.add('danger', error, { status: messageCenterService.status.next });
				});
			}
		]
	);
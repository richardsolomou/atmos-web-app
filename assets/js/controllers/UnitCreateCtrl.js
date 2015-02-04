'use strict';

angular.module('atmos')
	.controller(
		'UnitCreateCtrl',
		[
			'$scope',
			'$routeParams',
			'$location',
			'UnitsFactory',
			function ($scope, $routeParams, $location, UnitsFactory) {
				$scope.create = function () {
					UnitsFactory.create($scope.unit);
					$location.path('/units');
				};
			}
		]
	);
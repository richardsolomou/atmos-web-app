'use strict';

angular.module('atmos')
	.controller(
		'UnitEditCtrl',
		[
			'$scope',
			'$http',
			'$routeParams',
			'$location',
			'UnitFactory',
			function ($scope, $http, $routeParams, $location, UnitFactory) {
				$scope.update = function () {
					UnitFactory.update($scope.unit);
					$location.path('/units');
				};

				$scope.cancel = function () {
					$location.path('/units');
				};

				UnitFactory.show({ unit_id: $routeParams.unit_id }, function (data) {
					$scope.unit = data.data;
				}, function (err) {
					console.log(err);
				});
			}
		]
	);
'use strict';

angular.module('atmos')
	.controller(
		'UnitListCtrl',
		[
			'$scope',
			'$http',
			'$location',
			'UnitsFactory',
			function ($scope, $http, $location, UnitsFactory) {
				$scope.update = function (unit_id) {
					$location.path('/units/' + unit_id);
				};

				$scope.delete = function (unit_id) {
					UnitsFactory.delete({ unit_id: unit_id });
					UnitsFactory.query(function (data) {
						$scope.units = data.data;
					}, function (err) {
						console.log(err);
					});
				};

				$scope.create = function () {
					$location.path('/units/create');
				};

				UnitsFactory.query(function (data) {
					$scope.units = data.data;
				}, function (err) {
					console.log(err);
				});
			}
		]
	);
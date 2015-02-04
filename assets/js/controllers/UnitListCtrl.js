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
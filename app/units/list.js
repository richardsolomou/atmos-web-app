'use strict';

angular.module('atmos')
	.controller(
		'UnitListCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'Unit',
			function ($scope, $rootScope, $location, Unit) {
				$scope.update = function (unit_id) {
					$location.path('/units/' + unit_id);
				};

				$scope.create = function () {
					$location.path('/units/create');
				};

				function init() {
					$rootScope.currentPage = 'units';

					Unit.query(function (data) {
						$scope.units = data.data;
					});
				}

				init();
			}
		]
	);
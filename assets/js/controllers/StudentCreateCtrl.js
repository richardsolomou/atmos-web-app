'use strict';

angular.module('atmos')
	.controller(
		'StudentCreateCtrl',
		[
			'$scope',
			'$routeParams',
			'$location',
			'StudentsFactory',
			function ($scope, $routeParams, $location, StudentsFactory) {
				$scope.create = function () {
					StudentsFactory.create($scope.student);
					$location.path('/students');
				};
			}
		]
	);
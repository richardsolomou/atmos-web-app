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
				$scope.create = function (isValid) {
					if (isValid) {
						StudentsFactory.create($scope.student);
						$location.path('/students');
					} else {
						console.dir(isValid);
					}
				};
			}
		]
	);
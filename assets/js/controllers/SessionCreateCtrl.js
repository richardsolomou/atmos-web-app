'use strict';

angular.module('atmos')
	.controller(
		'SessionCreateCtrl',
		[
			'$scope',
			'$routeParams',
			'$location',
			'SessionsFactory',
			function ($scope, $routeParams, $location, SessionsFactory) {
				$scope.create = function () {
					SessionsFactory.create($scope.session);
					$location.path('/sessions');
				};
			}
		]
	);
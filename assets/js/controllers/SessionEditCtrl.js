'use strict';

angular.module('atmos')
	.controller(
		'SessionEditCtrl',
		[
			'$scope',
			'$http',
			'$routeParams',
			'$location',
			'SessionFactory',
			function ($scope, $http, $routeParams, $location, SessionFactory) {
				$scope.update = function () {
					SessionFactory.update($scope.session);
					$location.path('/sessions');
				};

				$scope.cancel = function () {
					$location.path('/sessions');
				};

				$scope.delete = function (session_id) {
					SessionFactory.delete({ session_id: session_id });
					$location.path('/sessions');
				};

				SessionFactory.show({ session_id: $routeParams.session_id }, function (data) {
					$scope.session = data.data;
				}, function (err) {
					console.log(err);
				});
			}
		]
	);
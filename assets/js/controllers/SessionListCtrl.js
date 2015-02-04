'use strict';

angular.module('atmos')
	.controller(
		'SessionListCtrl',
		[
			'$scope',
			'$http',
			'$location',
			'SessionsFactory',
			function ($scope, $http, $location, SessionsFactory) {
				$scope.update = function (session_id) {
					$location.path('/sessions/' + session_id);
				};

				$scope.delete = function (session_id) {
					SessionsFactory.delete({ session_id: session_id });
					SessionsFactory.query(function (data) {
						$scope.sessions = data.data;
					}, function (err) {
						console.log(err);
					});
				};

				$scope.create = function () {
					$location.path('/sessions/create');
				};

				SessionsFactory.query(function (data) {
					$scope.sessions = data.data;
				}, function (err) {
					console.log(err);
				});
			}
		]
	);
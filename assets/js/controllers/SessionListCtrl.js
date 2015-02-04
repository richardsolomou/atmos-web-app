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
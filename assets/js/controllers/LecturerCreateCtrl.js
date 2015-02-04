'use strict';

angular.module('atmos')
	.controller(
		'LecturerCreateCtrl',
		[
			'$scope',
			'$routeParams',
			'$location',
			'LecturersFactory',
			function ($scope, $routeParams, $location, LecturersFactory) {
				$scope.create = function () {
					LecturersFactory.create($scope.lecturer, function (data) {
						console.dir(data.data);
					}, function (err) {
						console.dir(err);
					});
					$location.path('/lecturers');
				};
			}
		]
	);
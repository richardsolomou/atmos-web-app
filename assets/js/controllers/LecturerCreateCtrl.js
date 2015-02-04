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
					LecturersFactory.create($scope.lecturer);
					$location.path('/lecturers');
				};
			}
		]
	);
'use strict';

angular.module('atmos')
	.controller(
		'LecturerEditCtrl',
		[
			'$scope',
			'$http',
			'$routeParams',
			'$location',
			'LecturerFactory',
			function ($scope, $http, $routeParams, $location, LecturerFactory) {
				$scope.update = function () {
					LecturerFactory.update($scope.lecturer);
					$location.path('/lecturers');
				};

				$scope.cancel = function () {
					$location.path('/lecturers');
				};

				LecturerFactory.show({ lecturer_id: $routeParams.lecturer_id }, function (data) {
					$scope.lecturer = data.data;
				}, function (err) {
					console.log(err);
				});
			}
		]
	);
'use strict';

angular.module('atmos')
	.controller(
		'LecturerListCtrl',
		[
			'$scope',
			'$http',
			'$location',
			'LecturersFactory',
			function ($scope, $http, $location, LecturersFactory) {
				$scope.update = function (lecturer_id) {
					$location.path('/lecturers/' + lecturer_id);
				};

				$scope.delete = function (lecturer_id) {
					LecturersFactory.delete({ lecturer_id: lecturer_id });
					LecturersFactory.query(function (data) {
						$scope.lecturers = data.data;
					}, function (err) {
						console.log(err);
					});
				};

				$scope.create = function () {
					$location.path('/lecturers/create');
				};

				LecturersFactory.query(function (data) {
					$scope.lecturers = data.data;
				}, function (err) {
					console.log(err);
				});
			}
		]
	);
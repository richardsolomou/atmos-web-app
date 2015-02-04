'use strict';

angular.module('atmos')
	.controller(
		'StudentListCtrl',
		[
			'$scope',
			'$http',
			'$location',
			'StudentsFactory',
			function ($scope, $http, $location, StudentsFactory) {
				$scope.update = function (student_id) {
					$location.path('/students/' + student_id);
				};

				$scope.create = function () {
					$location.path('/students/create');
				};

				StudentsFactory.query(function (data) {
					$scope.students = data.data;
				}, function (err) {
					console.log(err);
				});
			}
		]
	);
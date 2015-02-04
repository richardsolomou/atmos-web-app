'use strict';

angular.module('atmos')
	.controller(
		'StudentEditCtrl',
		[
			'$scope',
			'$http',
			'$routeParams',
			'$location',
			'StudentFactory',
			function ($scope, $http, $routeParams, $location, StudentFactory) {
				$scope.update = function () {
					StudentFactory.update($scope.student);
					$location.path('/students');
				};

				$scope.cancel = function () {
					$location.path('/students');
				};

				$scope.delete = function (student_id) {
					StudentFactory.delete({ student_id: student_id });
					$location.path('/students');
				};

				StudentFactory.show({ student_id: $routeParams.student_id }, function (data) {
					$scope.student = data.data;
				}, function (err) {
					console.log(err);
				});
			}
		]
	);
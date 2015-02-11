'use strict';

angular.module('atmos')
	.controller(
		'StudentListCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'Student',
			function ($scope, $rootScope, $location, Student) {
				$scope.update = function (student_id) {
					$location.path('/students/' + student_id);
				};

				$scope.create = function () {
					$location.path('/students/create');
				};

				function init() {
					$rootScope.currentPage = 'students';

					Student.query(function (data) {
						$scope.students = data.data;
					});
				}

				init();
			}
		]
	);
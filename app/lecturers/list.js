'use strict';

angular.module('atmos')
	.controller(
		'LecturerListCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'Lecturer',
			function ($scope, $rootScope, $location, Lecturer) {
				$scope.update = function (lecturer_id) {
					$location.path('/lecturers/' + lecturer_id);
				};

				$scope.create = function () {
					$location.path('/lecturers/create');
				};

				function init() {
					$rootScope.currentPage = 'lecturers';

					Lecturer.query(function (data) {
						$scope.lecturers = data.data;
					});
				}

				init();
			}
		]
	);
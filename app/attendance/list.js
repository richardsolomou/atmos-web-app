'use strict';

angular.module('atmos')
	.controller(
		'AttendanceListCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'$filter',
			'Attendance',
			function ($scope, $rootScope, $location, $filter, Attendance) {
				$scope.update = function (attendance_id) {
					$location.path('/attendance/' + attendance_id);
				};

				$scope.create = function () {
					$location.path('/attendance/create');
				};

				function init() {
					$rootScope.currentPage = 'attendance';

					Attendance.query(function (data) {
						$scope.attendance = data.data;
						angular.forEach($scope.attendance, function (att) {
							att.attendance_recorded = $filter('date')(att.attendance_recorded, 'HH:mm dd/MM/yyyy');
						});
					});
				}

				init();
			}
		]
	);
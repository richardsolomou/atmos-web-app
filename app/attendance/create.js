'use strict';

angular.module('atmos')
	.controller(
		'AttendanceCreateCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'$filter',
			'Attendance',
			'Student',
			'Session',
			'messageCenterService',
			function ($scope, $rootScope, $location, $filter, Attendance, Student, Session, messageCenterService) {
				$scope.create = function (isValid) {
					if (isValid) {
						$scope.attendance.attendance_recorded = $filter('date')($scope.attendance.attendance_recorded, 'yyyy-MM-dd HH:mm');
						Attendance.create($scope.attendance, function (data) {
							messageCenterService.add('success', 'Successfully created attendance record.', { status: messageCenterService.status.next });
							$location.path('/attendance');
						}, function (error) {
							messageCenterService.add('danger', error);
						});
					}
				};

				$scope.cancel = function () {
					$location.path('/attendance');
				};

				function init() {
					$rootScope.currentPage = 'attendance';
					
					Session.query(function (data) {
						$scope.sessions = data.data;
					});

					Student.query(function (data) {
						$scope.students = data.data;
					});
				}

				init();
			}
		]
	);
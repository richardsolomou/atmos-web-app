'use strict';

angular.module('atmos')
	.controller(
		'GlobalCtrl',
		[
			'$rootScope',
			'$location',
			'$cookies',
			'$route',
			'GooglePlus',
			'SignInService',
			'RFIDService',
			'Attendance',
			function ($rootScope, $location, $cookies, $route, GooglePlus, SignInService, RFIDService, Attendance) {
				$rootScope.currentPage = 'home';

				$rootScope.checkLoggedIn = function () {
					if ($cookies.user == null) return true;
					return false;
				};

				$rootScope.signin = function () {
					GooglePlus.login().then(function (authResult) {
						GooglePlus.getUser().then(function (user) {
							SignInService.signIn(user);
						});
					});
				};

				$rootScope.$on('RFIDRouter', function (e, data) {
					if (data && data.uid) {
						$location.path('/attendance');

						RFIDService.init(data.uid).then(function () {
							var student_id = RFIDService.getStudentID();
							var session_id = RFIDService.getSessionID();
							var attendance_recorded = RFIDService.getAttendanceRecorded();
							Attendance.create({ student_id: student_id, session_id: session_id, attendance_recorded: attendance_recorded }, function (data) {
								console.dir(data);
							}, function (err) {
								console.dir(err);
							});
						}, function (err) {
							console.dir(err);
							if (err.err_type === 'student_card_not_found') {
								// do something
							} else if (err.err_type === 'session_not_found') {
								// do something
							}
						});

						if (!$rootScope.$$phase) $rootScope.$apply();
					}
				});

				$rootScope.$on('SignInRouter', function (e, data) {
					if (data && data.user) {
						SignInService.signIn(data.user);
					}
				});
			}
		]
	);
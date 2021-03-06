'use strict';

angular.module('atmos')
	.controller(
		'AttendanceCreateCtrl',
		[
			'$scope',
			'$sce',
			'$rootScope',
			'$location',
			'$filter',
			'Attendance',
			'Student',
			'Session',
			'messageCenterService',
			function ($scope, $sce, $rootScope, $location, $filter, Attendance, Student, Session, messageCenterService) {
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

					$scope.attendance = {};
					$scope.attendance.attendance_recorded = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm');

					Student.query(function (data) {
						$scope.students = data.data;

						$scope.ao_student_id = {
							suggest: function (term) {
								var q = term.toLowerCase().trim();
								var results = [];

								for (var i = 0; i < $scope.students.length; i++) {
									var student = $scope.students[i];
									if (student && student.student_id && student.student_name) {
										if (student.student_id.toString().indexOf(q) !== -1 || student.student_name.toLowerCase().indexOf(q) !== -1) {
											results.push({
												value: student.student_id,
												obj: student,
												label: $sce.trustAsHtml(
													'<div class="row">' +
														'<div class="col-lg-12">' +
															'<p class="pull-left">' + student.student_name + '</p>' +
															'<p class="pull-right">' + student.student_id + '</p>' +
														'</div>' +
													'</div>'
												)
											});
										}
									}
								}
								return results;
							},
							on_select: function (selected) {
								$scope.attendance.student_id = selected.value;
							}
						};
					});

					Session.query(function (data) {
						$scope.sessions = data.data;

						angular.forEach($scope.sessions, function (session) {
							session.session_from = $filter('date')(session.session_from, 'HH:mm');
							session.session_to = $filter('date')(session.session_to, 'HH:mm, dd/MM/yyyy');
						});

						$scope.ao_session_id = {
							suggest: function (term) {
								var q = term.toLowerCase().trim();
								var results = [];

								for (var i = 0; i < $scope.sessions.length; i++) {
									var session = $scope.sessions[i];
									if (session && session.session_name) {
										if (session.session_name.toLowerCase().indexOf(q) !== -1) {
											results.push({
												value: session.session_id,
												obj: session,
												label: $sce.trustAsHtml(
													'<div class="row">' +
														'<div class="col-lg-12">' +
															'<p class="pull-left">' + session.session_name + '</p>' +
															'<p class="pull-right">' + session.session_from + ' - ' + session.session_to + '</p>' +
														'</div>' +
													'</div>'
												)
											});
										}
									}
								}
								return results;
							},
							on_select: function (selected) {
								$scope.attendance.session_id = selected.value;
							}
						};
					});
				}

				init();
			}
		]
	);
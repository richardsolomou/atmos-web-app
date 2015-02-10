'use strict';

angular.module('atmos')
	.factory(
		'RFIDService',
		function ($http, $q, $filter) {
			var student_id;
			var session_id;
			var attendance_recorded;
			var units = [];
			var sessions = [];

			function init(uid) {
				var deferred = $q.defer();

				async.series(
					[
						function (done) {
							$http.get('api/v2/students/student_card/' + uid)
								.success(function (data) {
									student_id = data.data.student_id;
									return done();
								}).error(function (err) {
									err = new Error('Student card not in database.');
									err.err_type = 'student_card_not_found';
									return done(err);
								});
						},
						function (done) {
							$http.get('api/v2/students/' + student_id + '/units')
								.success(function (data) {
									units = data.data;
									return done();
								}).error(done);
						},
						function (done) {
							angular.forEach(units, function (unit) {
								$http.get('api/v2/units/' + unit.unit_id + '/sessions')
									.success(function (data) {
										sessions = data.data;
										return done();
									}).error(done);
							});
						},
						function (done) {
							angular.forEach(sessions, function (session, key) {
								attendance_recorded = '2015-02-02 10:05';
								attendance_recorded = $filter('date')(attendance_recorded, 'yyyy-MM-dd HH:mm');
								session.session_from = $filter('date')(session.session_from, 'yyyy-MM-dd HH:mm');
								session.session_to = $filter('date')(session.session_to, 'yyyy-MM-dd HH:mm');
								if (attendance_recorded >= session.session_from && attendance_recorded <= session.session_to) {
									session_id = session.session_id;
									return done();
								} else if (sessions.length-1 === key) {
									err = new Error('Session not found.');
									err.err_type = 'session_not_found';
									return done(err);
								}
							});
						}
					],
					function (err) {
						if (err) {
							return deferred.reject(err);
						}

						return deferred.resolve(student_id, session_id, attendance_recorded);
					}
				);

				return deferred.promise;
			}

			return {
				init: init,
				getStudentID: function () {
					return student_id;
				},
				getSessionID: function () {
					return session_id;
				},
				getAttendanceRecorded: function () {
					return attendance_recorded;
				}
			};
		}
	);
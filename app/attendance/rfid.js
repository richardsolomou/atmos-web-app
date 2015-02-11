'use strict';

angular.module('atmos')
	.factory(
		'RFIDService',
		function ($http, $q, $filter, Student, Unit) {
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
							Student.findByCard({ student_card: uid }, function (data) {
								student_id = data.data.student_id;
								return done();
							}, function (err) {
								err = new Error('Student card not in database.');
								err.err_type = 'student_card_not_found';
								return done(err);
							});
						},
						function (done) {
							Student.units({ student_id: student_id }, function (data) {
								units = data.data;
								return done();
							}, done);
						},
						function (done) {
							angular.forEach(units, function (unit) {
								Unit.sessions({ unit_id: unit.unit_id }, function (data) {
									sessions = data.data;
									return done();
								}, done);
							});
						},
						function (done) {
							angular.forEach(sessions, function (session, key) {
								attendance_recorded = $filter('date')(attendance_recorded, 'yyyy-MM-dd HH:mm');
								session.session_from = $filter('date')(session.session_from, 'yyyy-MM-dd HH:mm');
								session.session_to = $filter('date')(session.session_to, 'yyyy-MM-dd HH:mm');
								if (attendance_recorded >= session.session_from && attendance_recorded <= session.session_to) {
									session_id = session.session_id;
									return done();
								} else if (sessions.length-1 === key) {
									var err = new Error('Session not found.');
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

			function getStudentID() {
				return student_id;
			}

			function getSessionID() {
				return session_id;
			}

			function getAttendanceRecorded() {
				return attendance_recorded;
			}

			return {
				init: init,
				getStudentID: getStudentID,
				getSessionID: getSessionID,
				getAttendanceRecorded: getAttendanceRecorded
			};
		}
	);
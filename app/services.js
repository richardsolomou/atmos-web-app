'use strict';

angular.module('atmos')
	.factory(
		'Attendance',
		function ($resource) {
			return $resource('api/v2/attendance/:attendance_id', { attendance_id: '@attendance_id' }, {
				get: { method: 'GET', params: { attendance_id: '@attendance_id' } },
				query: { method: 'GET' },
				create: { method: 'POST', params: { student_id: '@student_id', session_id: '@session_id', attendance_recorded: '@attendance_recorded' } },
				update: { method: 'PUT', params: { attendance_id: '@attendance_id', student_id: '@student_id', session_id: '@session_id', attendance_recorded: '@attendance_recorded' } },
				delete: { method: 'DELETE', params: { attendance_id: '@attendance_id' } }
			});
		}
	)
	.factory(
		'Lecturer',
		function ($resource) {
			return $resource('api/v2/lecturers/:lecturer_id', { lecturer_id: '@lecturer_id' }, {
				get: { method: 'GET', params: { lecturer_id: '@lecturer_id' } },
				query: { method: 'GET' },
				create: { method: 'POST', params: { lecturer_name: '@lecturer_name', lecturer_email: '@lecturer_email' } },
				update: { method: 'PUT', params: { lecturer_id: '@lecturer_id', lecturer_name: '@lecturer_name', lecturer_email: '@lecturer_email' } },
				delete: { method: 'DELETE', params: { lecturer_id: '@lecturer_id' } }
			});
		}
	)
	.factory(
		'Session',
		function ($resource) {
			return $resource('api/v2/sessions/:session_id', { session_id: '@session_id' }, {
				get: { method: 'GET', params: { session_id: '@session_id', populate: 'unit_id' } },
				query: { method: 'GET', params: { populate: 'unit_id' } },
				create: { method: 'POST', params: { session_name: '@session_name', unit_id: '@unit_id', session_room: '@session_room', session_from: '@session_from', session_to: '@session_to' } },
				update: { method: 'PUT', params: { session_id: '@session_id', session_name: '@session_name', unit_id: '@unit_id', session_room: '@session_room', session_from: '@session_from', session_to: '@session_to' } },
				delete: { method: 'DELETE', params: { session_id: '@session_id' } },
				alternatives: { method: 'GET', url: 'api/v2/sessions/:session_id/alternatives', params: { session_id: '@session_id', populate: 'unit_id' }}
			});
		}
	)
	.factory(
		'Student',
		function ($resource) {
			return $resource('api/v2/students/:student_id', { student_id: '@student_id' }, {
				get: { method: 'GET', params: { student_id: '@student_id' } },
				query: { method: 'GET' },
				create: { method: 'POST', params: { student_id: '@student_id', student_name: '@student_name', student_card: '@student_card' } },
				update: { method: 'PUT', params: { student_id: '@student_id', student_name: '@student_name', student_card: '@student_card' } },
				delete: { method: 'DELETE', params: { student_id: '@student_id' } }
			});
		}
	)
	.factory(
		'Unit',
		function ($resource) {
			return $resource('api/v2/units/:unit_id', { unit_id: '@unit_id' }, {
				get: { method: 'GET', params: { unit_id: '@unit_id' } },
				query: { method: 'GET' },
				create: { method: 'POST', params: { unit_title: '@unit_title', unit_code: '@unit_code' } },
				update: { method: 'PUT', params: { unit_id: '@unit_id', unit_title: '@unit_title', unit_code: '@unit_code' } },
				delete: { method: 'DELETE', params: { unit_id: '@unit_id' } }
			});
		}
	);
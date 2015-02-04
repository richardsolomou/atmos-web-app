'use strict';

angular.module('atmos')
	.factory(
		'StudentsFactory',
		function ($resource) {
			return $resource('api/v2/students', {}, {
				query: { method: 'GET' },
				create: { method: 'POST', params: { student_id: '@student_id', student_name: '@student_name', student_card: '@student_card' } }
			})
		}
	);
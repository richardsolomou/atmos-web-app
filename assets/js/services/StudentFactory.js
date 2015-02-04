'use strict';

angular.module('atmos')
	.factory(
		'StudentFactory',
		function ($resource) {
			return $resource('api/v2/students/:student_id', {}, {
				show: { method: 'GET' },
				update: { method: 'PUT', params: { student_id: '@student_id', student_name: '@student_name', student_card: '@student_card' } },
				delete: { method: 'DELETE', params: { student_id: '@student_id' } }
			})
		}
	);
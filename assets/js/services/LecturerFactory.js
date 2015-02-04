'use strict';

angular.module('atmos')
	.factory(
		'LecturerFactory',
		function ($resource) {
			return $resource('api/v2/lecturers/:lecturer_id', {}, {
				show: { method: 'GET' },
				update: { method: 'PUT', params: { lecturer_id: '@lecturer_id', lecturer_name: '@lecturer_name', lecturer_email: '@lecturer_email' } },
				delete: { method: 'DELETE', params: { lecturer_id: '@lecturer_id' } }
			})
		}
	);
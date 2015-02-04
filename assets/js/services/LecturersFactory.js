'use strict';

angular.module('atmos')
	.factory(
		'LecturersFactory',
		function ($resource) {
			return $resource('api/v2/lecturers', {}, {
				query: { method: 'GET' },
				create: { method: 'POST', params: { lecturer_name: '@lecturer_name', lecturer_email: '@lecturer_email' } }
			})
		}
	);
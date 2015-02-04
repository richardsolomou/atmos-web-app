'use strict';

angular.module('atmos')
	.factory(
		'LecturersFactory',
		function ($resource) {
			return $resource('api/v2/lecturers', {}, {
				query: { method: 'GET' },
				create: { method: 'POST' }
			})
		}
	);
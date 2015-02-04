'use strict';

angular.module('atmos')
	.factory(
		'SessionsFactory',
		function ($resource) {
			return $resource('api/v2/sessions?populate=unit_id', {}, {
				query: { method: 'GET' },
				create: { method: 'POST' }
			})
		}
	);
'use strict';

angular.module('atmos')
	.factory(
		'UnitsFactory',
		function ($resource) {
			return $resource('api/v2/units', {}, {
				query: { method: 'GET' },
				create: { method: 'POST' }
			})
		}
	);
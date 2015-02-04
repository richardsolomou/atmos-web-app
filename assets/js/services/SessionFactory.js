'use strict';

angular.module('atmos')
	.factory(
		'SessionFactory',
		function ($resource) {
			return $resource('api/v2/sessions/:session_id?populate=unit_id', {}, {
				show: { method: 'GET' },
				update: { method: 'PUT', params: { session_id: '@session_id' } },
				delete: { method: 'DELETE', params: { session_id: '@session_id' } }
			})
		}
	);
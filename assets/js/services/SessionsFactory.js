'use strict';

angular.module('atmos')
	.factory(
		'SessionsFactory',
		function ($resource) {
			return $resource('api/v2/sessions', {}, {
				query: { method: 'GET', params: { populate: 'unit_id' } },
				create: { method: 'POST', params: { session_name: '@session_name', unit_id: '@unit_id', session_room: '@session_room', session_from: '@session_from', session_to: '@session_to' } }
			})
		}
	);
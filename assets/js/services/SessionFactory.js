'use strict';

angular.module('atmos')
	.factory(
		'SessionFactory',
		function ($resource) {
			return $resource('api/v2/sessions/:session_id', {}, {
				show: { method: 'GET', params: { populate: 'unit_id' } },
				update: { method: 'PUT', params: { session_id: '@session_id', session_name: '@session_name', unit_id: '@unit_id', session_room: '@session_room', session_from: '@session_from', session_to: '@session_to' } },
				delete: { method: 'DELETE', params: { session_id: '@session_id' } }
			})
		}
	);
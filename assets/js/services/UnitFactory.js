'use strict';

angular.module('atmos')
	.factory(
		'UnitFactory',
		function ($resource) {
			return $resource('api/v2/units/:unit_id', {}, {
				show: { method: 'GET' },
				update: { method: 'PUT', params: { unit_id: '@unit_id', unit_title: '@unit_title', unit_code: '@unit_code' } },
				delete: { method: 'DELETE', params: { unit_id: '@unit_id' } }
			})
		}
	);
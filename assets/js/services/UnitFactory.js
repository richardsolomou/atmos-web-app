'use strict';

angular.module('atmos')
	.factory(
		'UnitFactory',
		function ($resource) {
			return $resource('api/v2/units/:unit_id', {}, {
				show: { method: 'GET' },
				update: { method: 'PUT', params: { unit_id: '@unit_id' } },
				delete: { method: 'DELETE', params: { unit_id: '@unit_id' } }
			})
		}
	);
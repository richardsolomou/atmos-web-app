'use strict';

angular.module('atmos')
	.run(
		function ($rootScope, $templateCache) {
			$rootScope.$on('$viewContentLoaded', function () {
				$templateCache.removeAll();
			});
		}
	)
	.controller(
		'GlobalCtrl',
		[
			'$scope',
			'$http',
			'$rootScope',
			function ($scope, $http, $rootScope) {
				$rootScope.str = '';

				$rootScope.$on('JavaRouter', function (e, data) {
					if (data && data.str) {
						var wowStr = data.str;
						$rootScope.str = wowStr;
						if (!$rootScope.$$phase) $rootScope.$apply();
					}
				});

			}
		]
	);
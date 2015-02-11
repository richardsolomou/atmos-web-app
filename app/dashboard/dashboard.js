'use strict';

angular.module('atmos')
	.controller(
		'DashboardCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'$cookies',
			'$cookieStore',
			function ($scope, $rootScope, $location, $cookies, $cookieStore) {
				$scope.logout = function () {
					$cookieStore.remove('user');
					$location.path('/');
				};

				function init() {
					$rootScope.currentPage = 'dashboard';
				
					var user = JSON.parse($cookies.user);
					$scope.user = user;
				}

				init();
			}
		]
	);
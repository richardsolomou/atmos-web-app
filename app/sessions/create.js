'use strict';

angular.module('atmos')
	.controller(
		'SessionCreateCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'Session',
			'UnitsFactory',
			'messageCenterService',
			function ($scope, $rootScope, $location, Session, UnitsFactory, messageCenterService) {
				$rootScope.currentPage = 'sessions';

				$scope.create = function (isValid) {
					if (isValid) {
						Session.create($scope.session, function (data) {
							messageCenterService.add('success', 'Successfully created session.', { status: messageCenterService.status.next });
							$location.path('/sessions');
						}, function (error) {
							messageCenterService.add('danger', error, { status: messageCenterService.status.next });
						});
					}
				};

				$scope.cancel = function () {
					$location.path('/sessions');
				};

				UnitsFactory.query(function (data) {
					$scope.units = data.data;
				}, function (error) {
					messageCenterService.add('danger', error, { status: messageCenterService.status.next });
				});
			}
		]
	);
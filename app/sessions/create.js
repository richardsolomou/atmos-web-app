'use strict';

angular.module('atmos')
	.controller(
		'SessionCreateCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'$filter',
			'Session',
			'Unit',
			'messageCenterService',
			function ($scope, $rootScope, $location, $filter, Session, Unit, messageCenterService) {
				$scope.create = function (isValid) {
					if (isValid) {
						$scope.session.session_from = $filter('date')($scope.session.session_from, 'yyyy-MM-dd HH:mm');
						$scope.session.session_to = $filter('date')($scope.session.session_to, 'yyyy-MM-dd HH:mm');
						Session.create($scope.session, function (data) {
							messageCenterService.add('success', 'Successfully created session.', { status: messageCenterService.status.next });
							$location.path('/sessions');
						}, function (error) {
							messageCenterService.add('danger', error);
						});
					}
				};

				$scope.cancel = function () {
					$location.path('/sessions');
				};

				function init() {
					$rootScope.currentPage = 'sessions';
					
					Unit.query(function (data) {
						$scope.units = data.data;
					});
				}

				init();
			}
		]
	);
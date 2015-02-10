'use strict';

angular.module('atmos')
	.controller(
		'SessionEditCtrl',
		[
			'$scope',
			'$rootScope',
			'$routeParams',
			'$location',
			'Session',
			'Unit',
			'messageCenterService',
			'$filter',
			function ($scope, $rootScope, $routeParams, $location, Session, Unit, messageCenterService, $filter) {
				$rootScope.currentPage = 'sessions';

				$scope.update = function (isValid) {
					if (isValid) {
						Session.update($scope.session, function (data) {
							messageCenterService.add('success', 'Successfully updated session.', { status: messageCenterService.status.next });
							$location.path('/sessions');
						}, function (error) {
							messageCenterService.add('danger', error, { status: messageCenterService.status.next });
						});
					}
				};

				$scope.cancel = function () {
					$location.path('/sessions');
				};

				$scope.delete = function (session_id) {
					Session.delete({ session_id: session_id }, function (data) {
						messageCenterService.add('success', 'Successfully deleted session.', { status: messageCenterService.status.next });
						$location.path('/sessions');
					}, function (error) {
						messageCenterService.add('danger', error, { status: messageCenterService.status.next });
					});
				};

				Session.get({ session_id: $routeParams.session_id }, function (data) {
					$scope.session = data.data;
					$scope.session.session_from = $filter('date')($scope.session.session_from, 'yyyy-MM-dd HH:mm');
					$scope.session.session_to = $filter('date')($scope.session.session_to, 'yyyy-MM-dd HH:mm');
				}, function (error) {
					messageCenterService.add('danger', error, { status: messageCenterService.status.next });
				});

				Unit.query(function (data) {
					$scope.units = data.data;
				}, function (error) {
					messageCenterService.add('danger', error, { status: messageCenterService.status.next });
				});
			}
		]
	);
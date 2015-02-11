'use strict';

angular.module('atmos')
	.controller(
		'SessionEditCtrl',
		[
			'$scope',
			'$rootScope',
			'$routeParams',
			'$location',
			'$filter',
			'Session',
			'Unit',
			'messageCenterService',
			function ($scope, $rootScope, $routeParams, $location, $filter, Session, Unit, messageCenterService) {
				$scope.update = function (isValid) {
					if (isValid) {
						Session.update($scope.session, function (data) {
							messageCenterService.add('success', 'Successfully updated session.', { status: messageCenterService.status.next });
							$location.path('/sessions');
						}, function (error) {
							messageCenterService.add('danger', error);
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

				$scope.edit = function (session_id) {
					$location.path('/sessions/' + session_id);
				};

				$scope.setAlternative = function (primary_session_id, secondary_session_id) {
					Session.setAlternative({ primary_session_id: primary_session_id, secondary_session_id: secondary_session_id }, function (d) {
						getExistingAlternativeSessions();
						getAvailableAlternativeSessions();
						if (!$scope.$$phase) $scope.$apply();
					}, function (err) {
						console.dir(err);
					});
				};

				$scope.removeAlternative = function (alternativesession_id) {
					Session.removeAlternative({ alternativesession_id: alternativesession_id }, function (data) {
						getExistingAlternativeSessions();
						getAvailableAlternativeSessions();
						if (!$scope.$$phase) $scope.$apply();
					}, function (err) {
						console.dir(err);
					});
				};

				function getExistingAlternativeSessions() {
					Session.getAlternatives({ session_id: $routeParams.session_id }, function (data) {
						$scope.alternatives = data.data;
						angular.forEach($scope.alternatives, function (alternative) {
							alternative.session_from = $filter('date')(alternative.session_from, 'yyyy-MM-dd HH:mm');
							alternative.session_to = $filter('date')(alternative.session_to, 'yyyy-MM-dd HH:mm');
						});
					});
				}

				function getAvailableAlternativeSessions() {
					Session.getAvailableAlternatives({ session_id: $routeParams.session_id }, function (data) {
						$scope.availableAlternatives = data.data;
						angular.forEach($scope.availableAlternatives, function (available) {
							available.session_from = $filter('date')(available.session_from, 'yyyy-MM-dd HH:mm');
							available.session_to = $filter('date')(available.session_to, 'yyyy-MM-dd HH:mm');
						});
					});
				}

				function init() {
					$rootScope.currentPage = 'sessions';

					Session.get({ session_id: $routeParams.session_id }, function (data) {
						$scope.session = data.data;
						$scope.session.session_from = $filter('date')($scope.session.session_from, 'yyyy-MM-dd HH:mm');
						$scope.session.session_to = $filter('date')($scope.session.session_to, 'yyyy-MM-dd HH:mm');
					});

					getExistingAlternativeSessions();
					getAvailableAlternativeSessions();					

					Unit.query(function (data) {
						$scope.units = data.data;
					});
				}

				init();
			}
		]
	);
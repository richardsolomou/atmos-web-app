'use strict';

angular.module('atmos')
	.controller(
		'SessionListCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'Session',
			'messageCenterService',
			'$filter',
			function ($scope, $rootScope, $location, Session, messageCenterService, $filter) {
				$rootScope.currentPage = 'sessions';

				$scope.update = function (session_id) {
					$location.path('/sessions/' + session_id);
				};

				$scope.create = function () {
					$location.path('/sessions/create');
				};

				console.dir(Session.alternatives({ session_id: 1 }));

				Session.query(function (data) {
					$scope.sessions = data.data;
					angular.forEach($scope.sessions, function (session) {
						session.session_from = $filter('date')(session.session_from, 'yyyy-MM-dd HH:mm');
						session.session_Bto = $filter('date')(session.session_to, 'yyyy-MM-dd HH:mm');
					});
				}, function (error) {
					messageCenterService.add('danger', error, { status: messageCenterService.status.next });
				});
			}
		]
	);
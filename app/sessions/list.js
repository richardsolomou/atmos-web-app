'use strict';

angular.module('atmos')
	.controller(
		'SessionListCtrl',
		[
			'$scope',
			'$rootScope',
			'$location',
			'$filter',
			'Session',
			function ($scope, $rootScope, $location, $filter, Session) {
				$scope.update = function (session_id) {
					$location.path('/sessions/' + session_id);
				};

				$scope.create = function () {
					$location.path('/sessions/create');
				};

				function init() {
					$rootScope.currentPage = 'sessions';

					Session.query(function (data) {
						$scope.sessions = data.data;
						angular.forEach($scope.sessions, function (session) {
							session.session_from = $filter('date')(session.session_from, 'HH:mm');
							session.session_to = $filter('date')(session.session_to, 'HH:mm, dd/MM/yyyy');
						});
					});
				}

				init();
			}
		]
	);
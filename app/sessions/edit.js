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
			'Student',
			'messageCenterService',
			function ($scope, $rootScope, $routeParams, $location, $filter, Session, Unit, Student, messageCenterService) {
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
						getAlternativeSessions();
						if (!$scope.$$phase) $scope.$apply();
					}, function (err) {
						console.dir(err);
					});
				};

				$scope.removeAlternative = function (alternativesession_id) {
					Session.removeAlternative({ alternativesession_id: alternativesession_id }, function (data) {
						getAlternativeSessions();
						if (!$scope.$$phase) $scope.$apply();
					}, function (err) {
						console.dir(err);
					});
				};

				function getAlternativeSessions() {
					Session.getAvailableAlternatives({ session_id: $routeParams.session_id }, function (data) {
						$scope.availableAlternatives = data.data;
						Session.getAlternatives({ session_id: $routeParams.session_id }, function (data) {
							$scope.alternatives = data.data;
							angular.forEach($scope.availableAlternatives, function (availableAlternative) {
								availableAlternative.session_from = $filter('date')(availableAlternative.session_from, 'HH:mm');
								availableAlternative.session_to = $filter('date')(availableAlternative.session_to, 'HH:mm, dd/MM/yyyy');
								angular.forEach($scope.alternatives, function (alternative) {
									if (alternative.session_id === availableAlternative.session_id) {
										availableAlternative.alternativesession_id = alternative.alternativesession_id;
										availableAlternative.sessionAlternative = true;
									}
								});
							});
						});
					});
				}

				function getStudents() {
					Student.query(function (data) {
						$scope.students = data.data;
						Session.getStudents({ session_id: $routeParams.session_id }, function (sessionStudents) {
							angular.forEach($scope.students, function (student) {
								angular.forEach(sessionStudents.data, function (sessionStudent) {
									if (student.student_id === sessionStudent.student_id) {
										student.sessionStudent = true;
									}
								});
							});
						});
					});
				}

				$scope.editStudent = function (student_id) {
					$location.path('/students/' + student_id);
				}

				function init() {
					$rootScope.currentPage = 'sessions';

					Session.get({ session_id: $routeParams.session_id }, function (data) {
						$scope.session = data.data;
						$scope.session.session_from = $filter('date')($scope.session.session_from, 'yyyy-MM-dd HH:mm');
						$scope.session.session_to = $filter('date')($scope.session.session_to, 'yyyy-MM-dd HH:mm');
					});

					getAlternativeSessions();
					getStudents();				

					Unit.query(function (data) {
						$scope.units = data.data;
					});
				}

				init();
			}
		]
	);
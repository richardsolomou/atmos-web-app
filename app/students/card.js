'use strict';

angular.module('atmos')
	.controller(
		'StudentCardCtrl',
		[
			'$scope',
			'$sce',
			'$rootScope',
			'$location',
			'Student',
			'RFIDService',
			'messageCenterService',
			function ($scope, $sce, $rootScope, $location, Student, RFIDService, messageCenterService) {
				$scope.cancel = function () {
					$location.path('/students');
				};

				function init() {
					$rootScope.currentPage = 'students';

					$scope.student_card = RFIDService.getStudentCard();

					Student.query(function (data) {
						$scope.students = data.data;

						$scope.ao_student_id = {
							suggest: function (term) {
								var q = term.toLowerCase().trim();
								var results = [];

								for (var i = 0; i < $scope.students.length; i++) {
									var student = $scope.students[i];
									if (student && student.student_id && student.student_name) {
										if (student.student_id.toString().indexOf(q) !== -1 || student.student_name.toLowerCase().indexOf(q) !== -1) {
											results.push({
												value: student.student_id,
												obj: student,
												label: $sce.trustAsHtml(
													'<div class="row">' +
														'<div class="col-lg-12">' +
															'<p class="pull-left">' + student.student_name + '</p>' +
															'<p class="pull-right">' + student.student_id + '</p>' +
														'</div>' +
													'</div>'
												)
											});
										}
									}
								}
								return results;
							},
							on_select: function (selected) {
								$scope.attendance.student_id = selected.value;
							}
						};
					});
				}

				init();
			}
		]
	);
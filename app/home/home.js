'use strict';

angular.module('atmos')
	.controller(
		'HomeCtrl',
		[
			'$rootScope',
			'Lecturer',
			function ($rootScope, Lecturer) {
				$rootScope.currentPage = 'home';

				var lecturer = Lecturer.get({ lecturer_id: 6 });
				lecturer.lecturer_name = 'wow';
				lecturer.$update({ lecturer_id: 6 });
				console.dir(lecturer);
			}
		]
	);
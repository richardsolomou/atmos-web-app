'use strict';

angular.module('atmos', ['ngRoute', 'ngResource']);

angular.module('atmos')
	.config(
		[
			'$routeProvider',
			function ($routeProvider) {
				$routeProvider
					.when('/', {
						templateUrl: 'partials/index.html',
						controller: 'HomeCtrl'
					})
					.when('/lecturers', {
						templateUrl: 'partials/LecturerList.html',
						controller: 'LecturerListCtrl'
					})
					.when('/lecturers/create', {
						templateUrl: 'partials/LecturerCreate.html',
						controller: 'LecturerCreateCtrl'
					})
					.when('/lecturers/:lecturer_id', {
						templateUrl: 'partials/LecturerEdit.html',
						controller: 'LecturerEditCtrl'
					})
					.when('/sessions', {
						templateUrl: 'partials/SessionList.html',
						controller: 'SessionListCtrl'
					})
					.when('/sessions/create', {
						templateUrl: 'partials/SessionCreate.html',
						controller: 'SessionCreateCtrl'
					})
					.when('/sessions/:session_id', {
						templateUrl: 'partials/SessionEdit.html',
						controller: 'SessionEditCtrl'
					})
					.when('/students', {
						templateUrl: 'partials/StudentList.html',
						controller: 'StudentListCtrl'
					})
					.when('/students/create', {
						templateUrl: 'partials/StudentCreate.html',
						controller: 'StudentCreateCtrl'
					})
					.when('/students/:student_id', {
						templateUrl: 'partials/StudentEdit.html',
						controller: 'StudentEditCtrl'
					})
					.when('/units', {
						templateUrl: 'partials/UnitList.html',
						controller: 'UnitListCtrl'
					})
					.when('/units/create', {
						templateUrl: 'partials/UnitCreate.html',
						controller: 'UnitCreateCtrl'
					})
					.when('/units/:unit_id', {
						templateUrl: 'partials/UnitEdit.html',
						controller: 'UnitEditCtrl'
					})
					.otherwise({
						redirectTo: '/'
					});
			}
		]
	);
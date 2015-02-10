'use strict';

angular.module('atmos', ['ngRoute', 'ngResource', 'ngCookies', 'MessageCenterModule', 'googleplus', 'datatables']);

angular.module('atmos')
	.run(
		function ($rootScope, $templateCache) {
			$rootScope.$on('$viewContentLoaded', function () {
				$templateCache.removeAll();
			});
		}
	)
	.config(
		[
			'$routeProvider',
			'GooglePlusProvider',
			function ($routeProvider, GooglePlusProvider) {
				GooglePlusProvider.init({
					clientId: '993338190575-hnejdp70idlq3ur41sqj90ctmn2c9o8a.apps.googleusercontent.com',
					apiKey: 'tSxLQ3c64A2yRA4vExlo0G6T'
				});

				$routeProvider
					.when('/', {
						templateUrl: 'app/home/home.html',
						controller: 'HomeCtrl'
					})
					.when('/signin', {
						templateUrl: 'app/dashboard/signin.html',
						controller: 'SignInCtrl'
					})
					.when('/dashboard', {
						templateUrl: 'app/dashboard/dashboard.html',
						controller: 'DashboardCtrl'
					})
					.when('/lecturers', {
						templateUrl: 'app/lecturers/list.html',
						controller: 'LecturerListCtrl'
					})
					.when('/lecturers/create', {
						templateUrl: 'app/lecturers/create.html',
						controller: 'LecturerCreateCtrl'
					})
					.when('/lecturers/:lecturer_id', {
						templateUrl: 'app/lecturers/edit.html',
						controller: 'LecturerEditCtrl'
					})
					.when('/sessions', {
						templateUrl: 'app/sessions/list.html',
						controller: 'SessionListCtrl'
					})
					.when('/sessions/create', {
						templateUrl: 'app/sessions/create.html',
						controller: 'SessionCreateCtrl'
					})
					.when('/sessions/:session_id', {
						templateUrl: 'app/sessions/edit.html',
						controller: 'SessionEditCtrl'
					})
					.when('/students', {
						templateUrl: 'app/students/list.html',
						controller: 'StudentListCtrl'
					})
					.when('/students/student_card', {
						templateUrl: 'app/students/card.html',
						controller: 'StudentCardCtrl'
					})
					.when('/students/create', {
						templateUrl: 'app/students/create.html',
						controller: 'StudentCreateCtrl'
					})
					.when('/students/:student_id', {
						templateUrl: 'app/students/edit.html',
						controller: 'StudentEditCtrl'
					})
					.when('/units', {
						templateUrl: 'app/units/list.html',
						controller: 'UnitListCtrl'
					})
					.when('/units/create', {
						templateUrl: 'app/units/create.html',
						controller: 'UnitCreateCtrl'
					})
					.when('/units/:unit_id', {
						templateUrl: 'app/units/edit.html',
						controller: 'UnitEditCtrl'
					})
					.otherwise({
						redirectTo: '/'
					});
			}
		]
	);
'use strict';

angular.module('atmos')
	.factory(
		'SignInService',
		function ($http, $cookies, $cookieStore, GooglePlus, messageCenterService, Lecturer) {
			var userInfo;

			function signIn(user) {
				var domain = user.email.replace(/.*@/, '');
				if (domain !== 'port.ac.uk' && user.email !== 'rsolomou@gmail.com') {
					messageCenterService.add('danger', 'Hosted domain must be port.ac.uk.');
					return false;
				}
				Lecturer.query(function (data) {
					var lecturers = data.data;
					angular.forEach(lecturers, function (lecturer, key) {
						if (user.email === lecturer.lecturer_email) {
							lecturer.result = user;
							userInfo = lecturer;
							$cookieStore.put('user', userInfo);
							return true;
						} else if (lecturers.length-1 === key) {
							messageCenterService.add('danger', 'Lecturer not found in database.');
						}
					});
				});
				return false;
			}

			function signOut() {
				$cookieStore.remove('user');
				userInfo = null;
				return true;
			}

			function init() {
				if ($cookies.user) {
					userInfo = JSON.parse($cookies.user);
				}
			}

			init();

			return {
				signIn: signIn,
				isLoggedIn: function () {
					return userInfo ? userInfo : false;
				},
				signOut: signOut
			};
		}
	);
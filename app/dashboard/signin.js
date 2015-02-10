'use strict';

angular.module('atmos')
	.factory(
		'SignInService',
		function ($http, $cookies, $cookieStore, GooglePlus, messageCenterService) {
			var userInfo;

			function signIn(user) {
				var domain = user.email.replace(/.*@/, '');
				if (domain !== 'port.ac.uk' && user.email !== 'rsolomou@gmail.com') {
					messageCenterService.add('danger', 'Hosted domain must be port.ac.uk.');
					return false;
				}
				$http.get('api/v2/lecturers')
					.success(function (lecturers) {
						for (var i = 0; i < lecturers.data.length; i++) {
							if (user.email === lecturers.data[i].lecturer_email) {
								lecturers.data[i].result = user;
								userInfo = lecturers.data[i];
								$cookieStore.put('user', userInfo);
								return true;
							}
						}
						messageCenterService.add('danger', 'Lecturer not found in database.');
					})
					.error(function (data) {
						messageCenterService.add('danger', 'Something went wrong.');
					});
				return false;
			}

			function signOut() {
				$cookieStore.remove('user');
				userInfo = null;
				return true;
			}

			function _init() {
				if ($cookies.user) {
					userInfo = JSON.parse($cookies.user);
				}
			}

			_init();

			return {
				signIn: signIn,
				isLoggedIn: function () {
					return userInfo ? userInfo : false;
				},
				signOut: signOut
			};
		}
	);
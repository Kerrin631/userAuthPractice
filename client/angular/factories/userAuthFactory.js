myAppModule.factory('userAuthFactory', function($http, $window, $state){
	var authFactory = {}
	// var user = []
	// The factory is nothing more than a function that returns an object


	authFactory.saveToken = function (token){
		$window.localStorage['token-name'] = token;
	};

	authFactory.getToken = function (){
		return $window.localStorage['token-name'];
	};

	authFactory.isLoggedIn = function(){
		var token = authFactory.getToken();
		if(token){
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			// console.log(payload)
			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};

	authFactory.currentUser = function(){
		if(authFactory.isLoggedIn()){
			var token = authFactory.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.username;
		}
	};

	authFactory.register = function(user){
		(function isLocalStorageNameSupported() {
			var testKey = 'test', storage = window.localStorage;
			try {
				storage.setItem(testKey, '1');
				storage.removeItem(testKey);
				return $http.post('/register', user).success(function(data){
					if(data.token){
						authFactory.saveToken(data.token);
					}
				})
			} catch (error) {
				alert('Your web browser does not support storing settings locally. The most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you. Please switch to non-private mode.')
				return false;
			}
		})()
	};

	authFactory.logIn = function(user){
		return $http.post('/login', user).success(function(data){
			console.log('back at factory', data)
			authFactory.saveToken(data.token);
		});
	};

	authFactory.logOut = function(){
		$window.localStorage.removeItem('token-name');
		$state.go('logout');
	};

	authFactory.updateUser = function(user){
		return $http.post('/user/update', user).success(function(data){
			authFactory.saveToken(data.token);
		})
	};

	authFactory.deleteUser = function(user){
		return $http.post('/user/delete', user).success(function(){
			$window.localStorage.removeItem('token-name');
		});
	};

	return authFactory;
});
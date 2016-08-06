myAppModule.factory('userAuthFactory', function($http){
	var factory = {}
	var user = []
	// The factory is nothing more than a function that returns an object
	factory.registerNewUser = function(info, callback){
		console.log('REGISTER NEW USER ', info)
		$http.post('/newUser', info).success(function(res){
			console.log('CREATED NEW USER', res);
			callback(res)
		})
		return user;
	};

	factory.submitUserInfo = function(info, callback){
		console.log('SUBMIT', info)
		$http.post('/login', info).success(function(data, status, headers, config){
			callback(data)
		}).
		error(function(data, status, headers, config){
			// $scope.user = {};
			// $scope.error = data;
			callback(data)
		});
	};
	return factory;
});
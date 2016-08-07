//  build the controllers
    // Create a controller (attached to this module), and inject the customerFactory in it.
    // Create a module
      // var myAppModule = angular.module('myApp', ['ngRoute']);
      // Create a controller (attached to this module), and inject the customerFactory in it.
myAppModule.controller('userAuthController', function ($scope, $state, userAuthFactory){
    $scope.user = {}
    $scope.newUser = {};
    $scope.loggedIn = false;

    $scope.registerNewUser = function() {
        userAuthFactory.register($scope.newUser).error(function(error){
            // console.log('CONTROLLER RESPONSE', error)
            alert('Username already exists.')
            $scope.error = error;
        }).then(function(){
            $state.go('home')
        });
    };

    $scope.submitLogIn = function() {
        // console.log($scope.user)
        userAuthFactory.logIn($scope.user).error(function(error){
            $scope.error = error;
            alert('Incorrect Username or Password')
        }).then(function(){
            $state.go('home');
        });
    };

    $scope.updateUser = function() {
        $scope.user.username = userAuthFactory.currentUser();
        userAuthFactory.updateUser($scope.user).error(function(error){
            $scope.error = error;
        }).then(function(){
            $state.go('home')
        })
    };

    $scope.deleteUser = function() {
        $scope.user.username = userAuthFactory.currentUser();
        userAuthFactory.deleteUser($scope.user).error(function(error){
            $scope.error = error;
        }).then(function(){
            $state.go('logout')
        })
    }
});

myAppModule.controller('NavCtrl', function($scope, userAuthFactory){
    $scope.isLoggedIn = userAuthFactory.isLoggedIn;
    $scope.currentUser = userAuthFactory.currentUser;
    $scope.logOut = userAuthFactory.logOut;
});
//  build the controllers
    // Create a controller (attached to this module), and inject the customerFactory in it.
    // Create a module
      // var myAppModule = angular.module('myApp', ['ngRoute']);
      // Create a controller (attached to this module), and inject the customerFactory in it.
myAppModule.controller('userAuthController', function ($scope, $location, userAuthFactory, $routeParams){
    // $scope.leftovers = [{}];
    // $scope.recipes = []
    $scope.info = []
    $scope.userInfo = {}
    $scope.newUser = {}

    $scope.registerNewUser = function() {
        console.log($scope.newUser)
        userAuthFactory.registerNewUser($scope.newUser, function(data){
            // console.log('CONTROLLER RESPONSE', data)
            $scope.info = data;
            console.log('INFOSCOPE', $scope.info)
            $location.path('/home')
        })
    };

    $scope.submitLogIn = function() {
        console.log($scope.userInfo)
        userAuthFactory.submitUserInfo($scope.userInfo, function(data){
            console.log(data)
            $scope.user = data;
            $scope.error = '';
        })
    }
        
});
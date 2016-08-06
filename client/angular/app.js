var myAppModule = angular.module('userAuth_app', ['ngRoute']);

//  use the config method to set up routing:
    myAppModule.config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/logout',{
          redirectTo: '/login'
        })
        .when('/login',{
          templateUrl: 'partials/login.html'
        })
        .when('/signup', {
          templateUrl: 'partials/signup.html'
        })
        .when('/user', {
          templateUrl: 'partials/user.html'
        })
        .when('/home', {
          templateUrl: 'partials/home.html'
        })
        .when('/', {
          redirectTo: '/home'
        })
        .otherwise({
          redirectTo: '/logout'
        });
    });
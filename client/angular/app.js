var myAppModule = angular.module('userAuth_app', ['ngRoute', 'ui.router']);

//  use the config method to set up routing:
  myAppModule.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider

      .state('logout', {
        url: '/logout',
        onEnter: function($state){
          $state.go('login')
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'userAuthController',
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: 'userAuthController',
      })
      .state('user', {
        url: '/user',
        templateUrl: 'partials/user.html',
        controller: 'userAuthController',
        onEnter: function($state, userAuthFactory){
          if(!userAuthFactory.isLoggedIn()){
            $state.go('login');
          }
        }
      })
      .state('home', {
        url: '/home',
        templateUrl: 'partials/home.html',
        onEnter: function($state, userAuthFactory){
          if(!userAuthFactory.isLoggedIn()){
            $state.go('login');
          }
        }
      })
  });
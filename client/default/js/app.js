// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
'use strict';
angular.module('emp-dir', ['ionic', 'ngTouch'])
  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.

    // Each state's controller can be found in controllers.js
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      // login page
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })

      // employee list view
      .state('emp-list', {
        url: '/employees',
        templateUrl: 'templates/emp-list.html',
        controller: 'EmpListCtrl'
      })
      // employee detail view
      .state('emp-detail', {
        url: '/employee/:empId',
        templateUrl: 'templates/emp-detail.html',
        controller: 'EmpDetailCtrl'
      })
      // send page view
      .state('send-page', {
        url: '/employee/:empId/sendpage',
        templateUrl: 'templates/send-page.html',
        controller: 'SendPageCtrl'
      });
  })
  .run(function($window, $rootScope) {
    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function () {
      $rootScope.$apply(function() {
        $rootScope.online = false;
      });
    }, false);
    $window.addEventListener("online", function () {
      $rootScope.$apply(function() {
        $rootScope.online = true;
      });
    }, false);
  });


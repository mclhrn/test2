/**
 * LoginCtrl.js
 * Created by en17682 on 3/25/14.
 */
'use strict';
angular.module('emp-dir').controller('LoginCtrl',['$scope','$state', 'UserService', 'EmpService', 'NetworkService', 'UserNotificationService'
    , function($scope, $state, UserService, EmpService, NetworkService, UserNotificationService) {
      // "EmpService" is a service returning employee data (services.js)
      // This service will watch for network availability
      NetworkService.watchNetAvail();
      $scope.user = {
        username: "",
        password: ""
      };

      // TODO move this to app.js
      UserService.isLoggedIn().then(function(res){
          $state.go('emp-list');
        }
        //isLoggedIn failed
        , function(err){
          //UserNotificationService.showMsgBarWarning(err);
          //console.warn(err);

          //bypassing login - mj
          //$state.go('emp-list');
          
        });

      $scope.doLogin = function(){
        UserNotificationService.showLoading();
        UserService.login($scope.user).then(
          //login successful go to main view
          function(){
            // Get user's additional information
            EmpService.findByEN($scope.user.username).then(function(res){
                    UserNotificationService.hideLoading();

                    UserService.setUserInfo(res);
//                UserNotificationService.hideLoading();
              }
              //findByEN failed notify user
              , function(err){
                UserNotificationService.hideLoading();
                UserNotificationService.showMsgBarError(err);
              });
            $state.go('emp-list');
          }
          //login failed notify user
          , function(err){
            UserNotificationService.hideLoading();
            UserNotificationService.showMsgBarWarning(err);
          });
      };
    }]);

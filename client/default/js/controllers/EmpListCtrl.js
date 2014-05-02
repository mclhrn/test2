/**
 * Created by en17682 on 3/25/14.
 * A controller that fetches a list of employee data from a webservice
 */
'use strict';
angular.module('emp-dir')
  .controller('EmpListCtrl', ['$scope','$window', 'EmpService', '$ionicScrollDelegate', 'UserNotificationService'
    , function($scope, $window, EmpService, $ionicScrollDelegate, UserNotificationService) {
      // "EmpService" is a service returning employee data (services.js)
      UserNotificationService.hideMsgBar();

      $scope.clearSearch = function(){
        $scope.searchStr = '';
        EmpService.clearSearch().then(function(employees){
            UserNotificationService.hideMsgBar();
            $scope.employees = employees;
          }
          ,function(error){//failure
            UserNotificationService.showMsgBarError(error);
          });
      }

      $scope.search = function(){
        UserNotificationService.showLoading();
        $scope.employees.length = 0;
        EmpService.findByLastFirstName($scope.searchStr).then(
          function(data){//success
            $ionicScrollDelegate.scrollTop(true);// aromatically scroll to the top of the viewport
            if(data.msg !== undefined && data.msg.length > 0){
              UserNotificationService.showMsgBarWarning(data.msg);
              $scope.employees = data.employees;
              //mj
              UserNotificationService.hideLoading();
            }else{
              UserNotificationService.hideMsgBar();
              $scope.employees = data.employees;
              //mj
              UserNotificationService.hideLoading();
            }
            UserNotificationService.hideLoading();
          }
          ,function(error){//failure
            UserNotificationService.showMsgBarError(error);
            UserNotificationService.hideLoading();
          });
      };

      var getSearchStr = function(){
        EmpService.getCachedSearchStr().then(function(data){
            $scope.searchStr = data;
          }
          ,function(error){//failure
            UserNotificationService.showMsgBarError(error);
          });
      };

      var findAllEmployees = function(){
        EmpService.findAll().then(function(employees){
            $scope.employees = employees;
          }
          ,function(error){//failure
            UserNotificationService.showMsgBarError(error);
          });
      };

      findAllEmployees();
      getSearchStr();
    }]);
/**
 * Created by en17682 on 3/25/14.
 */
'use strict';
// A simple controller that shows a tapped item's data
angular.module('emp-dir').controller('EmpDetailCtrl',['$scope', '$state', '$stateParams', 'EmpService', 'UserNotificationService'
  , function($scope, $state, $stateParams, EmpService, UserNotificationService) {
    // "EmpService" is a service returning employee data (services.js)
    UserNotificationService.hideMsgBar();

    $scope.rightButtons = [{
      type: 'button button-icon icon ion-ios7-search-strong',
      tap: function(e) {
        $state.go('emp-list');
      }
    }];
    EmpService.findByIndex($stateParams.empId).then(function(employee){
        $scope.employee = employee;
      }
      ,function(error){//failure
        UserNotificationService.showMsgBarError(error);
      });
  }]);

/**
 * Created by Oleksiy Kononenko on 3/25/14.
 */
'use strict';
angular.module('emp-dir').controller('SendPageCtrl'
  ,['$scope', '$rootScope', '$state', '$stateParams', 'EmpService', 'PageService'
    , 'UserNotificationService', 'ConstantsService', 'UserService'
    , function($scope, $rootScope, $state, $stateParams, EmpService, PageService
      , UserNotificationService, ConstantsService, UserService) {
      // Here we list all the buttons and their properties
      // that will be
      $scope.rightButtons = [{
        type: 'button button-icon icon ion-ios7-search-strong',
        tap: function(e) {
          $state.go('emp-list');
        }
      }];

      $scope.data = {
        fromName: "",
        callbackNum: null,
        pageTextInput: "",
        charactersRemaining: "",
        toPager: "",
        hurleyPersonId: "",
        hurleySessionID: ""
      };
      // Watch for input fields changes so we can calculate
      // total number of characters of the request.
      $scope.$watch('data', function(newVal) {
        var pageTextLength = $scope.data.pageTextInput === undefined ? 0 : $scope.data.pageTextInput.length
          , fromNameLength = $scope.data.fromName === undefined ? 0 : $scope.data.fromName.length
          , callbackNumLength = $scope.data.callbackNum === null || $scope.data.callbackNum === undefined ? 0 : String($scope.data.callbackNum).length;
        $scope.data.charactersRemaining = 240 - (pageTextLength + fromNameLength + callbackNumLength);
      }, true);

      // "EmpService" is a service returning employee data (services.js)
      EmpService.findByIndex($stateParams.empId).then(function(employee){
        $scope.employee = employee;
        $scope.data.toPager = employee.pager;
        // pre-populate the form with known user information if it exists
        UserService.getUserInfo().then(
          function(user){
            // pre-populate the form with known user information if it exists
            $scope.data.callbackNum = user.phone_full;
            $scope.data.fromName = user.name_full;
          });
        //this is the nested call to get pager status
        PageService.getPagerStatus(employee.pager).then(
          // success
          function(responce){
            $scope.employee.pagerStatus = responce.pager_status;
            $scope.data.hurleyPersonId = responce.person_row_id;
            $scope.data.hurleySessionID = responce.SessionID;
          }
          //failure
          , function(msg){
            UserNotificationService.showMsgBarError(msg);
          });
      });

      $scope.sendPage = function(){
        // Check if user did not exceed total length of the message
        if($scope.data.charactersRemaining >= 0) {
          // Message is shorter than allowed length
          // Send page
          PageService.sendPage($scope.data).then(
            // success
            function (responce) {
              UserNotificationService.showAlert(responce.details.MessageSentText);
              if (responce.status === "S") {
                UserNotificationService.showMsgBarSuccess(ConstantsService.MESSAGES.PAGE_SUCCESS);
              } else {
                UserNotificationService.showMsgBarError(responce.msg); //ConstantsService.MESSAGES.PAGE_FAILED_ERROR
              }
            }
            //failure
            , function (msg) {
              UserNotificationService.showMsgBarError(msg);
            });
        }else{
          // Message is too long
          return;
        }
      };

    }]);
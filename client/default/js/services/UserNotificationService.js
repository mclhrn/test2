/**
 * Created by en17682 on 3/25/14.
 * service to manage user notifications (error, success, and warning messages)
 */
'use strict';

angular.module('emp-dir').factory('UserNotificationService',['$rootScope', '$ionicLoading', function($rootScope, $ionicLoading) {
  var showMsgBar = function(msg){
    $rootScope.displayNotif = true;
    $rootScope.notifContent = msg;
  };

  return {
    isMsgBarShown: function(){
      return $rootScope.displayNotif;
    },
    showMsgBarSuccess: function(notifText){
      $rootScope.notifType = 'bar-balanced';
      showMsgBar(notifText);
    },
    showMsgBarWarning: function(notifText){
      $rootScope.notifType = 'bar-energized';
      showMsgBar(notifText)
    },
    showMsgBarError: function(notifText){
      $rootScope.notifType = 'bar-assertive';
      showMsgBar(notifText);
    },
    hideMsgBar: function(){
      if($rootScope.displayNotif === true){
        $rootScope.displayNotif = false;
        $rootScope.notifContent = '';
      }
    },
    showLoading: function() {
      // Show the loading overlay and text
      $rootScope.loading = $ionicLoading.show({
        // The text to display in the loading indicator
        //content: '<i class="icon ion-refreshing"></i>',
        content: 'Loading...',
        // The animation to use
        animation: 'fade-in',
        // Will a dark overlay or backdrop cover the entire view
        showBackdrop: false,
        // The maximum width of the loading indicator
        // Text will be wrapped if longer than maxWidth
        maxWidth: 200,
        // The delay in showing the indicator
        showDelay: 500
      });
    },
    // Hide the loading indicator
    hideLoading: function(){
      $rootScope.loading.hide();
    },
    showAlert: function (msg){
      alert(msg);
    }
  }
}]);
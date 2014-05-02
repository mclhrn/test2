/**
 * Created by en17682 on 3/25/14.
 * This service will check for network connectivity of the device and handle variables
 * to show/hide error messages.
 */
'use strict';
angular.module('emp-dir').factory('NetworkService',['$rootScope', 'UserNotificationService', 'ConstantsService'
  , function($rootScope, UserNotificationService, ConstantsService) {
    return {
      watchNetAvail: function(){
        $rootScope.$watch('online', function(isOnline) {
          if(isOnline !== true){
            UserNotificationService.showMsgBarError(ConstantsService.MESSAGES.NO_NETWORK_ERROR);
          }else{
            UserNotificationService.hideMsgBar();
          }
        });
      }
    }
  }]);

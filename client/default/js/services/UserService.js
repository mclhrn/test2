/**
 * Created by en17682 on 3/25/14.
 */
'use strict';
angular.module('emp-dir').factory('UserService',['$q', '$state', '$rootScope', '$location', '$log', 'ConstantsService', 'CloudCall'
  , function($q, $state, $rootScope, $location, $log, ConstantsService, CloudCall) {
    var currentUser = this.currentUser = {};

    return {
      login: function(user) {
        // Do login here.
        var deferred = $q.defer();
        CloudCall.callCloudMethod('checkLogin',user).then(
          function(res){
            if(res.advalid !== undefined && res.advalid === true){
              // Login successful
              //TODO migrate to lawnchair
              $fh.data({act: "save", key: "sessionToken", val: res.sessionToken});
              deferred.resolve();
            }else{
              // Login failed
              deferred.reject(ConstantsService.MESSAGES.LOGIN_FAILED_WARN);
            }
          }
          , function(msg, err){
            // Login call failed
            $log.error('checkLogin call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
            deferred.reject(msg);
          });
        return deferred.promise;
      },

      getUserInfo: function(){
        var deferred = $q.defer();
        $fh.data({key: "name_full"}, function(name) {
          currentUser.name_full = name.val;
          $fh.data({key: "phone_full"}, function(phone) {
            currentUser.phone_full = phone.val === null ? "" : phone.val;
            deferred.resolve(currentUser);
          }, function (msg, err) {
            // An error occurred during the cloud call.
            $log.log('getUserInfo call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
            deferred.reject(msg);
          });
        }, function (msg, err) {
          // An error occurred during the cloud call.
          $log.log('getUserInfo call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
          deferred.reject(msg);
        });
        return deferred.promise;
      },

      setUserInfo: function(user){
        $fh.data({act: "save", key: "name_full", val: user.lastname + " " + user.firstname});
        $fh.data({act: "save", key: "phone_full", val: user.phone_full});
      },

      isLoggedIn: function(){
        var deferred = $q.defer();
        CloudCall.callCloudMethod('checkSession',{}).then(
          function(res){
            deferred.resolve(res);
          }
          , function(msg){
            // Login call failed
            $log.warn('isLoggedIn call failed with error: ' + msg);
            deferred.reject(msg);
          });
        return deferred.promise;
      }
    }
  }]);
/**
 * Created by en17682 on 4/3/2014.
 */

'use strict';
angular.module('emp-dir').factory('CloudCall',['$q', '$state', '$log', '$rootScope', '$location', 'ConstantsService'
  , function($q, $state, $log, $rootScope, $location, ConstantsService) {

    function _callCloud(methodName, data) {
      var deferred = $q.defer();
      $fh.data({key: "sessionToken"}, function(res) {
        data.sessionToken = res.val;
        $fh.act({
          "act": methodName, //method name to execute on cloud side
          "req": data
        }, function (res) {
          // Cloud call was successful.
          if (res.valid === false) {
            deferred.reject(ConstantsService.MESSAGES.SESSION_EXPIRED_WARN);
            $state.go('login');
          } else {
            deferred.resolve(res);
          }
        }, function (msg, err) {
          // An error occurred during the cloud call.
          $log.error('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
          deferred.reject(msg);
        });
        // Do an act call using promise and timeout of 5000
        /*Act.callFn(methodName, data, null, 5000).then(function(res) {
         // It worked!
         console.warn(res);
         deferred.resolve(res);
         }, function(err) {
         // Darn...something went wrong
         console.warn(err);
         deferred.reject(err);
         });*/

      });
      return deferred.promise;
    }
    //expose methods
    return {
      callCloudMethod: _callCloud
    }
  }]);
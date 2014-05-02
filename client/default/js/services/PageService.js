/**
 * Created by en17682 on 3/25/14.
 */
'use strict';
angular.module('emp-dir').factory('PageService',['$q', '$log', 'CloudCall', function($q, $log, CloudCall) {
  return {
    sendPage: function(data){
      //call fh cloud
      var deferred = $q.defer();
      CloudCall.callCloudMethod('sendPage',data).then(
        function(res) {
        // Cloud call was successful.
        deferred.resolve(res);
      }, function(msg, err) {
        // An error occured during the cloud call. Alert some debugging information
        $log.error('sendPage Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
        deferred.reject(msg);
      });
      return deferred.promise;
    },
    getPagerStatus: function(pagerNum){
      //call fh cloud
      var deferred = $q.defer();
      CloudCall.callCloudMethod('getPagerStatus',{"pagerNum": pagerNum}).then(
        function(res) {
        // Cloud call was successful.
        deferred.resolve(res);
      }, function(msg, err) {
        // An error occured during the cloud call. Alert some debugging information
        $log.error('getPagerStatus Cloud call failed with error:' + msg);
        deferred.reject(msg);
      });
      return deferred.promise;
    }
  }
}]);
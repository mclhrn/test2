/**
 * Created by en17682 on 3/25/14.
 */
'use strict';
angular.module('emp-dir').factory('EmpService',['$q', '$state', '$log', 'UserNotificationService', 'CloudCall'
  , function($q, $state, $log, UserNotificationService, CloudCall) {
    // Might use a resource here that returns a JSON array
    var cache = {
      employees: [],
      searchString: ""
    };

    return {
      findAll: function(){
        var deferred = $q.defer();
        deferred.resolve(cache.employees);
        return deferred.promise;
      },

      findByIndex: function(index){
        var deferred = $q.defer();
        var results = cache.employees.filter(function(element){
          return element.sequence === index;
        })[0];// need this [0] to make sure we get only data back.
        deferred.resolve(results);
        return deferred.promise;
      },

      getCachedSearchStr: function(){
        var deferred = $q.defer();
        deferred.resolve(cache.searchString);
        return deferred.promise;
      },

      clearSearch: function(){
        //empty employee cache array
        cache.employees.length = 0;
        cache.searchString = "";
        var deferred = $q.defer();
        deferred.resolve(cache.employees);
        return deferred.promise;
      },

      findByLastFirstName: function(searchStr){
        //cache search string
        cache.searchString = searchStr;
        var regex = new RegExp('\\s*,\\s*') //regular expression to split comma delimited full name
          , nameArr =  searchStr.split(regex)
          , name = {
            "last": nameArr[0] === undefined ? "" : nameArr[0],
            "first": nameArr[1] === undefined ? "" : nameArr[1]
          };
        //call fh cloud
        var deferred = $q.defer();
        CloudCall.callCloudMethod('getByLastFirst',{"name": name}).then(
          function(res) {
            // Cloud call was successful.
            // Check for messages and return response,
            // if no messages are found - cache employees array
            if(res.count > 0 && res.msg.length === 0){
              cache.employees = res.employees;
            }
            deferred.resolve(res);
          }, function(msg) {
            // An error occurred during the cloud call. Alert some debugging information
            $log.error('findByLastFirstName Cloud call failed with error:' + msg);
            deferred.reject(msg);
          });
        return deferred.promise;
      },

      findByEN: function(empNum) {
        //call fh cloud
        var deferred = $q.defer();
        CloudCall.callCloudMethod('getByEn',{"empNum": empNum }).then(
          function(res) {
            // Cloud call was successful.
            deferred.resolve(res.employees[0]);// need this [0] strip out all the extra stuff);
          }, function(msg) {
            // An error occurred during the cloud call. Alert some debugging information
            $log.error('findByEN Cloud call failed with error:' + msg);
            deferred.reject(msg);
          });
        return deferred.promise;
      }
    }
  }]);
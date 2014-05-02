/**
 * Created by en17682 on 4/1/2014.
 */

// Error strings used for error type detection
'use strict';

angular.module('emp-dir').factory('ConstantsService',[ function($rootScope, $ionicLoading) {

// Expose MESSAGES
  var MESSAGES = this.MESSAGES = {
    PAGE_FAILED_ERROR: 'Page failed try later...',
    LOGIN_FAILED_WARN: 'Login failed, check your credentials',
    SESSION_EXPIRED_WARN: 'Session expired, login...',
    NO_NETWORK_ERROR: 'No Internet Connection...',
    PAGE_SUCCESS: 'Page sent',
    LOADING: 'Loading...'
  };

  return {
    MESSAGES: MESSAGES
  }
}]);
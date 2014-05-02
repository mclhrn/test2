/**
 * Created by en17682 on 3/26/14.
 */
'use strict';
angular.module('emp-dir').directive('notificationBar', [function() {
  return {
    restrict: 'E'
    , replace: true
    , template: '<div class="bar {{class}}" ng-class="notifType" ng-if="displayNotif">' +
      '{{notifContent}}' +
      '</div>'
    , link: function(scope, element, attrs){
      scope.class = attrs.class;
    }
  }
}]);
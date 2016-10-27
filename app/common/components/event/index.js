require('angular-ui-bootstrap')
require('angular-recursion')

module.exports = angular.module('common.components.event',
  [
    require('app/common/config').name,
    require('./../view').name,
    'ui.bootstrap',
    'RecursionHelper'
  ])
.directive('manualEventsButton', require('./manual-events-button/manual-events-button.directive.js'))
.directive('eventView', require('./event-view/event-view.directive.js'))
.directive('eventEasyExplanation', require('./event-easy-explanation/event-easy-explanation.directive.js'))
.directive('eventExplanation', require('./event-explanation/event-explanation.directive.js'))
.directive('eventWithComponents', [function () {
  return {
    templateUrl: window.COMPONENTS + '/event/eventWithComponentsViewTeaserContentWidget.html',
    restrict: 'E',
    scope: {
      event: '=',
      id: '=' //  The id of the actual device, to know if is a component or a computer.
    }
  }
}])
.directive('snapshotView', [function ($templateCache) {
  return {
    templateUrl: window.COMPONENTS + '/event/snapshotViewTeaserContentWidget.html',
    restrict: 'E',
    scope: {
      snapshot: '=',
      events: '=',
      id: '='
    },
    link: function ($scope) {
      $scope.teaser = true
    }
  }
}])

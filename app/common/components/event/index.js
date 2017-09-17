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
  .directive('eventEasyExplanation', require('./event-easy-explanation/event-easy-explanation.directive.js'))
  .directive('eventExplanation', require('./event-explanation/event-explanation.directive.js'))
  .directive('reserveButton', require('./reserve-button/reserve-button.directive'))

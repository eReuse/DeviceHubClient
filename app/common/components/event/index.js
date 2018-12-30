require('angular-ui-bootstrap')
require('angular-recursion')

module.exports = angular.module('common.components.event',
  [
    require('app/common/config').name,
    'ui.bootstrap',
    'RecursionHelper'
  ])
  .directive('manualEventsButton', require('./manual-events-button/manual-events-button.directive.js'))
  .factory('openEventModal', require('./open-event-modal.factory'))

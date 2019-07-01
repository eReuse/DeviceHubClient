require('angular-recursion')

module.exports = angular.module('common.components.event',
  [
    require('app/common/config').name,
    require('angular-ui-bootstrap'),
    'RecursionHelper'
  ])
  .directive('manualActionsButton', require('./manual-actions-button/manual-actions-button.directive'))
  .factory('openEventModal', require('./open-event-modal.factory'))
  .directive('snapshotButton', require('./snapshot-button/snapshot-button.directive'))

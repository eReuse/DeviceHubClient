require('angular-recursion')

module.exports = angular.module('common.components.event',
  [
    require('app/common/config').name,
    require('angular-ui-bootstrap'),
    'RecursionHelper'
  ])
  .directive('manualActionsButton', require('./manual-actions-button/manual-actions-button.directive'))
  .directive('createDeliverynoteButton', require('./create-deliverynote-button/create-deliverynote-button.directive'))
  .directive('shareDeliverynoteButton', require('./share-deliverynote-button/share-deliverynote-button.directive'))
  .directive('deleteLotButton', require('./delete-lot-button/delete-lot-button.directive'))
  .directive('addSupplierButton', require('./add-supplier-button/add-supplier-button.directive'))
  .directive('acceptDeliverynoteButton', require('./accept-deliverynote-button/accept-deliverynote-button.directive'))
  .factory('openEventModal', require('./open-event-modal.factory'))
  .directive('snapshotButton', require('./snapshot-button/snapshot-button.directive'))

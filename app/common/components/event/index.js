require('angular-recursion')

module.exports = angular.module('common.components.event',
  [
    require('app/common/config').name,
    require('angular-ui-bootstrap'),
    'RecursionHelper'
  ])
  .directive('manualActionsButton', require('./manual-actions-button/manual-actions-button.directive'))
  .directive('deleteLotButton', require('./delete-lot-button/delete-lot-button.directive'))
  .directive('addSupplierButton', require('./add-supplier-button/add-supplier-button.directive'))
  .directive('addReceiverButton', require('./add-receiver-button/add-receiver-button.directive'))
  .directive('addTradeDocumentButton', require('./add-trade-document-button/add-trade-document-button.directive'))
  .directive('confirmDocumentButton', require('./confirm-document-button/confirm-document-button.directive'))
  .directive('revokeDocumentButton', require('./revoke-document-button/revoke-document-button.directive'))
  .directive('confirmRevokeDocumentButton', require('./confirm-revoke-document-button/confirm-revoke-document-button.directive'))
  .directive('deleteDocumentButton', require('./delete-document-button/delete-document-button.directive'))
  .factory('openEventModal', require('./open-event-modal.factory'))
  .directive('snapshotButton', require('./snapshot-button/snapshot-button.directive'))

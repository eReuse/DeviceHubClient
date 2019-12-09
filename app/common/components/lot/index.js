module.exports = angular.module('common.components.lot', [])
  .directive('lotDeviceButton', require('./lot-device/lot-device.button.directive'))
  .directive('lotChildrenButton', require('./lot-children/lot-children.button.directive'))
  .directive('lotTransferButton', require('./lot-transfer/lot-transfer.button.directive'))

require('angular-ui-bootstrap')

module.exports = angular.module('common.components.device.certificate',
  [
    require('app/common/config').name,
    'ui.bootstrap'
  ])
.factory('certificateFactory', require('./certificate.factory'))
.directive('certificateErasure', require('./certificate-erasure/certificate-erasure.directive'))
.factory('certificateErasureFactory', require('./certificate-erasure/certificate-erasure.factory'))
.constant('CERTIFICATE_ERASURE_FACTORY_STRINGS', require('./certificate-erasure/certificate-erasure-factory-strings.constant'))
.directive('certificateButton', require('./certificate-button/certificate-button.directive'))
.directive('certificateReceipt', require('./certificate-receipt/certificate-receipt.directive'))
.controller('certButtModalCtrl', require('./certificate-button/certificate-button-modal.controller'))
.factory('certificateReceiptFactory', require('./certificate-receipt/certificate-receipt.factory'))
.constant('CERTIFICATE_RECEIPT_FACTORY_STRINGS', require('./certificate-receipt/certificate-receipt-factory-strings.constant'))

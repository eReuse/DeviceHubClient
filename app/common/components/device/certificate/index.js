require('angular-ui-bootstrap')

module.exports = angular.module('common.components.device.certificate',
  [
    require('app/common/config').name,
    'ui.bootstrap'
  ])
.directive('certificateErasure', require('./certificate-erasure/certificate-erasure.directive'))
.service('certificateErasureFactory', require('./certificate-erasure/certificate-erasure.factory'))
.constant('CERTIFICATE_ERASURE_FACTORY_STRINGS', require('./certificate-erasure/certificate-erasure-factory-strings.constant'))

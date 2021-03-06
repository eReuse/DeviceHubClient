require('oclazyload')
/**
 * @ngdoc module
 * @name auth.tags
 * @description
 * Tags
 *
 */
module.exports = angular.module('views.deliverynotes',
  [
    require('./../../common/components/resource').name,
    require('./../../common/components/resource').name,
    require('./../../common/components/tag').name,
    'oc.lazyLoad'
  ])
  .controller('createDeliveryCtrl', require('./create-deliverynote.controller.js'))
  .controller('shareDeliverynoteCtrl', require('./share-deliverynote.controller.js'))
  .controller('acceptDeliverynoteCtrl', require('./accept-deliverynote.controller.js'))



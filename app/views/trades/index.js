require('oclazyload')
/**
 * @ngdoc module
 * @name auth.tags
 * @description
 * Tags
 *
 */
module.exports = angular.module('views.trades',
  [
    require('./../../common/components/resource').name,
    require('./../../common/components/resource').name,
    require('./../../common/components/tag').name,
    'oc.lazyLoad'
  ])
  .controller('createTradeCtrl', require('./create-trade.controller.js'))
  .controller('shareTradeCtrl', require('./share-trade.controller.js'))
  .controller('acceptTradeCtrl', require('./accept-trade.controller.js'))



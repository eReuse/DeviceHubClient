/**
 * Represents the main devices view
 */
module.exports = angular.module('views.inventory',
  [
    require('./../../common/components/resource').name
  ])
  .controller('inventoryCtrl', require('./inventory.controller.js'))

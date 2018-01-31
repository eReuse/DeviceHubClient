/**
 * @ngdoc module
 * @name views.inventory
 * @description
 * The inventory view is the main view of the application. This views
 * comes by default after performing logging and has a path of
 * `/:db/inventory`.
 */
module.exports = angular.module('views.inventory',
  [
    require('./../../common/components/resource').name,
    require('./../../common/components/utilities').name
  ])
  .controller('inventoryCtrl', require('./inventory.controller.js'))

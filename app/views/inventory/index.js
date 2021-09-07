/**
 * @ngdoc module
 * @name views.inventory
 * @description
 * The inventory view is the main view of the application. This views
 * comes by default after performing logging and has a path of
 * `/:db/inventories`.
 *
 * The inventory module requires a `schema` and waits until it is
 * loaded.
 *
 * This module is mainly to directives:
 * - The `resource-breadcrumb`, which handles resource URL routing:
 *   everything after `/:db/inventories` like
 *   `/:db/inventories/devices/23`, showing a *breadcrumb*.
 * - The `resource` directive, part of `common.components.resource`
 *   module. This directive handles seeing specific resources
 * -
 *
 */
module.exports = angular.module('views.inventory',
  [
    require('./../../common/components/resource').name,
    require('./../../common/components/utilities').name,
    require('./../../common/components/lot').name, // the button in resource-list
    require('./../../common/components/device').name,
    require('angular-ui-bootstrap')
  ])
  .controller('inventoryCtrl', require('./inventory.controller.js'))
  .controller('newActionCtrl', require('./new-action.controller.js'))
  .controller('confirmDocumentCtrl', require('./confirm-document.controller.js'))
  .controller('revokeDocumentCtrl', require('./revoke-document.controller.js'))
  .controller('confirmRevokeDocumentCtrl', require('./confirm-revoke-document.controller.js'))
  .controller('snapshotUploadCtrl', require('./upload.snapshot.controller.js'))
  .controller('snapshotManualCtrl', require('./manual.snapshot.controller.js'))
  .controller('importCtrl', require('./import.controller.js'))
  .controller('newTradeDocumentCtrl', require('./new-trade-document.controller.js'))
  .controller('newMoveOnDocumentCtrl', require('./new-move-on-document.controller.js'))


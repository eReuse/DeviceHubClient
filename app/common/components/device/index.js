require('angular-ui-bootstrap')
require('angular-animate')
require('angular-sanitize')
require('angular-recursion')

module.exports = angular.module('common.components.device',
  [
    require('app/common/config').name,
    'ui.bootstrap',
    require('./../event').name,
    'ngAnimate',
    'ngSanitize',
    'RecursionHelper',
    'restangular',
    require('./../view').name,
    require('./../authentication').name,
    require('./certificate').name,
    require('./../forms').name,
    require('./events-per-device').name
  ])
/**
 * @ngdoc directive
 * @name device
 * @description Main device method. Given an identifier, retrieves and shows a full device, with its events and other info.
 * @param {Object} identifier Object with one property: _id, which is a string identifying the device. We use an object
 * to be able to watch over it, and load a new device when the _id changes.
 */
.directive('device', require('./device/device.directive'))
/**
 * Shows all the hardware and related information (not events) of a device, and its components.
 * @ngdoc directive
 * @name deviceView
 * @param {Object} identifier Object with one property: _id, which is a string identifying the device. We use an object
 * to be able to watch over it, and load a new device when the _id changes.
 */
.directive('deviceView', require('./device-view/device-view.directive'))
/**
 * @ngdoc directive
 * @name placeIcon
 * @description Gets and shows the icon that represents a device.
 * @param {string} icon Name of the icon to show. This is the @type of the device.
 */
.directive('deviceIcon', require('./device-icon/device-icon.directive'))
/**
 * @ngdoc directive
 * @name registerErrorProcessor
 * @description Shows a button that lets the user to register a device. This directive calls registerModalCtrl.
 */
.directive('snapshotButton', require('./snapshot/snapshot-button.directive'))
/**
 * @ngdoc controller
 * @name computerSnapshotModalCtrl
 * @description Lets users upload snapshots in json (from DeviceInventory) to the server, helping with the process and
 * showing the results.
 */
.controller('computerSnapshotModalCtrl', require('./computer-snapshot-modal/computer-snapshot-modal.controller'))
/**
 * @ngdoc directive
 * @name registerErrorProcessor
 * @description Shows a button that lets the user to register a device. This directive calls registerModalCtrl.
 */
.directive('computerSnapshotError', require('./computer-snapshot-modal/computer-snapshot-error/computer-snapshot-error.directive'))
.directive('share', require('./share/share.directive'))
.controller('shareModalCtrl', require('./share/share-modal.controller'))
.factory('SnapshotFormSchema', require('./snapshot/snapshot.form-schema.factory'))
.factory('ComputerSnapshotFormSchema', require('./computer-snapshot-modal/computer-snapshot.form-schema.factory'))

require('angular-ui-bootstrap')
require('angular-animate')
require('angular-recursion')
require('bower_components/angular-percentage-directive/percentage.js')

module.exports = angular.module('common.components.device',
  [
    require('app/common/config').name,
    'ui.bootstrap',
    require('./../event').name,
    'ngAnimate',
    'RecursionHelper',
    'restangular',
    require('./../authentication').name,
    require('./certificate').name,
    require('./../forms').name,
    require('./../utilities').name,
    'percentage'
  ])
  /**
   * @ngdoc directive
   * @name placeIcon
   * @description Gets and shows the icon that represents a device.
   * @param {string} icon Name of the icon to show. This is the @type of the device.
   */
  .directive('deviceIcon', require('./device-icon/device-icon.directive'))
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
  .factory('SnapshotFormSchema', require('./snapshot/snapshot.form-schema.factory'))
  .factory('ComputerSnapshotFormSchema', require('./computer-snapshot-modal/computer-snapshot.form-schema.factory'))
  .config(require('./computer-snapshot-modal/computer-snapshot-modal.config'))
  .directive('deviceRange', require('./device-range.directive'))

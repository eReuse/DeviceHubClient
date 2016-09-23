require('angular-ui-bootstrap')
// require('bower_components/angular-advanced-searchbox/dist/angular-advanced-searchbox.js')
require('angular-ui-router')
require('checklist-model')
require('angular-animate')
require('angular-timeago')

module.exports = angular.module('common.components.list',
  [
    require('app/common/config').name,
    'ui.bootstrap',
    'ui.router',
    'checklist-model',
    'ngAnimate',
    require('./../device-label').name,
    require('./../event').name,
    'yaru22.angular-timeago'

  ])
/**
 * @name deviceListConfigFactory
 */
.factory('deviceListConfigFactory', require('./device-list-config.factory'))
/**
 * @ngdoc directive
 * @name deviceList
 */
.directive('deviceList', require('./device-list.directive'))
/**
 * @ngdoc directive
 * @name deviceListModalCtrl
 */
.controller('deviceListModalCtrl', require('./device-list-modal.controller'))
/**
 * @ngdoc service
 * @name getDevices
 * @returns {Promise} Restangular's promise, filled with all the devices
 */
.service('getDevices', require('./get-devices.service'))
.directive('fieldSort', require('./field-sort/field-sort.directive'))

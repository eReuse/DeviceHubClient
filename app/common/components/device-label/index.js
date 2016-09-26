window.qrcode = require('./../../../../resources/qrcode.js')
require('angular-qrcode')
require('angular-ui-bootstrap')
require('angular-animate')

module.exports = angular.module('common.components.deviceLabel',
  [
    'monospaced.qrcode',
    'ui.bootstrap',
    'ngAnimate',
    require('./../../constants').name,
    require('./../resource').name
  ])
/**
 * @ngdoc directive
 * @name labelList
 * @description Given multiple devices, generates a label for every one. Shows controls to modify the labels and print them.
 * @param {Array} devices A list of devices.
 */
.directive('deviceLabelList', require('./label-list/label-list.directive.js'))
/**
 * @ngdoc directive
 * @name label
 * @description Generates a label for a given device.
 * @param {Object} device device object with, at least, the fields that are going to be shown in the label.
 */
.directive('deviceLabel', require('./label/label.directive.js'))

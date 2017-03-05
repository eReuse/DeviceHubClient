window.qrcode = require('./../../../../../resources/qrcode.js')
require('angular-qrcode')
require('angular-ui-bootstrap')
require('angular-animate')
require('checklist-model')

module.exports = angular.module('common.components.deviceLabel',
  [
    'monospaced.qrcode',
    'ui.bootstrap',
    'ngAnimate',
    'checklist-model',
    require('./../../../constants').name,
    require('./../../resource').name
  ])
/**
 * @ngdoc directive
 * @name label
 * @description Generates a label for a given device.
 * @param {Object} device device object with, at least, the fields that are going to be shown in the label.
 */
.directive('deviceLabel', require('./label/label.directive'))
.directive('deviceLabelEdit', require('./label-edit/label-edit.directive'))
.directive('deviceLabelButton', require('./label-button/label-button.directive'))
.controller('deviceLabelCtrl', require('./label.controller'))
.service('labelsToPdfService', require('./labels-to-pdf'))

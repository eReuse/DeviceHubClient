window.qrcode = require('./../../../../resources/qrcode.js')
require('angular-qrcode')
require('angular-ui-bootstrap')
require('angular-animate')
require('checklist-model')

module.exports = angular.module('common.components.resourceLabel',
  [
    require('./../view').name,
    'monospaced.qrcode',
    'ui.bootstrap',
    'ngAnimate',
    'checklist-model',
    require('./../../constants').name,
    require('./../resource').name,
    require('./../utilities').name
  ])
/**
 * @ngdoc directive
 * @name label
 * @description Generates a label for a given resource.
 * @param {Object} resource - resource object with, at least, the fields that are going to be shown in the label and
 * ``@type``.
 * @param {Object} model - The model or properties that defines the representation of the label.
 * @param {object} model.size - The size of the label.
 * @param {int} model.size.width
 * @param {int} model.size.height
 * @param {int} model.size.minWidth
 * @param {int} model.size.minHeight
 * @param {boolean} model.useLogo - True if a logo should be use, false otherwise.
 * @param {string} model.logo - The URL or base62 representation of a logo.
 * @param {object[]} model.fields
 * @param {string} model.fields[].name - The machine name of the field.
 * @param {string} model.fields[].humanName - The human representation of the field name.
 * @param {string} model.fields[].short - An abbreviation for the name, if possible.
 * @param {string} model.fields[].type - The type of field as for Formly.
 */
  .directive('resourceLabel', require('./label/label.directive'))
  .directive('resourceLabelEdit', require('./label-edit/label-edit.directive'))
  .directive('resourceLabelButton', require('./label-button/label-button.directive'))
  .controller('resourceLabelCtrl', require('./label.controller'))
  .service('labelsToPdfService', require('./labels-to-pdf'))
  /**
   * @ngdoc service
   * @name labelModal
   * @description Service to open a modal to label.
   */
  .config(require('./label-modal.config'))


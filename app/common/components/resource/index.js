window.qrcode = require('./../../../../resources/qrcode.js')
require('angular-qrcode')
require('restangular')
require('angular-ui-bootstrap')
require('jsonformatter')
require('angular-ui-notification')
require('angular-recursion')
require('angular-animate')
require('angular-timeago')
require('angular-google-maps')
require('meanie-angular-focus')
require('checklist-model')
require('angular-long-press')
require('angular-ui-tree')
require('angular-clipboard')

module.exports = angular.module('common.components.resource',
  [
    require('./../../config').name,
    'restangular',
    'RecursionHelper',
    require('./resource-search').name,
    'ui.bootstrap',
    'ngAnimate',
    'yaru22.angular-timeago',
    require('./../authentication').name,
    require('./../../constants').name,
    'uiGmapgoogle-maps',
    require('./../utilities').name,
    'Focus.Service',
    require('ng-infinite-scroll'),
    'monospaced.qrcode',
    'checklist-model',
    'pr.longpress',
    'ui.tree',
    'angular-clipboard',
    require('./../group').name // the button in resource-list
  ])
  .constant('RESOURCE_CONFIG', require('./resource-config.constant'))
  .factory('ResourceServer', require('./resource-server.factory'))
  .factory('ResourceSettings', require('./resource-settings.factory'))
  .directive('resourceIcon', require('./resource-icon/resource-icon.directive'))
  .directive('resourceView', require('./resource-view/resource-view.directive'))
  .directive('resourceButton', require('./resource-button/resource-button.directive'))
  .directive('resource', require('./resource/resource.directive'))
  .filter('palletSizeLocale', require('./pallet-size-locale.filter'))
  // Resource-list
  .directive('lotsTreeNavigation', require('./resource-list/lots-tree-navigation/lots-tree-navigation.directive'))
  .directive('selectionAggregatedProperty', require('./resource-list/resource-list-selection-summary/selection-aggregated-property.directive'))
  .directive('selectionProperty', require('./resource-list/resource-list-selection-summary/selection-property.directive'))
  .service('LotsSelector', require('./resource-list/lots-tree-navigation/lots-selector.service'))
  .directive('resourceList', require('./resource-list/resource-list.directive'))
  // filters
  .directive('resourceListFilters', require('./resource-list/resource-list-filters/resource-list-filters.directive'))
  .controller('importFiltersModalCtrl', require('./resource-list/resource-list-filters/import-filters.modal.controller'))
  // non-conformity
  .controller('nonConformityModalCtrl', require('./resource-list/non-conformity-report/non-conformity.modal.controller'))
  //
  .factory('ResourceListGetter', require('./resource-list/resource-list-getter.factory'))
  .service('ResourceListSelector', require('./resource-list/resource-list-selector.service'))
  .factory('resourceListConfig', require('./resource-list/resource-list-config.factory'))
  .directive('resourceListFooter', require('./resource-list/resource-list-footer/resource-list-footer.directive'))
  .directive('resourceListSelectAll', require('./resource-list/resource-list-select-all/resource-list-select-all.directive'))
  .directive('fieldSort', require('./resource-list/field-sort/field-sort.directive.js'))
  .directive('resourceExport', require('./resource-export/resource-export.directive'))
  .directive('resourceFieldEdit', require('./resource-field-edit/resource-field-edit.directive'))
  .directive('resourceBreadcrumb', require('./resource-breadcrumb/resource-breadcrumb.directive'))
  .service('ResourceBreadcrumb', require('./resource-breadcrumb/resource-breadcrumb.service'))
  // Resource-label
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
  .directive('resourceLabel', require('./resource-label/label/label.directive'))
  .directive('resourceLabelEdit', require('./resource-label/label-edit/label-edit.directive'))
  .directive('resourceLabelButton', require('./resource-label/label-button/label-button.directive'))
  .controller('resourceLabelCtrl', require('./resource-label/label.controller'))
  .service('labelsToPdfService', require('./resource-label/labels-to-pdf'))
  /**
   * @ngdoc service
   * @name labelModal
   * @description Service to open a modal to label.
   */
  .config(require('./resource-label/label-modal.config'))

require('angular-qrcode')
require('restangular')
require('angular-ui-bootstrap')
require('angular-ui-notification')
require('angular-recursion')
require('angular-animate')
require('angular-long-press')
require('angular-ui-tree')
require('angular-clipboard')
require('dynamic-bind-html')
require('meanie-angular-focus')

module.exports = angular.module('common.components.resource',
  [
    require('./../../config').name,
    'restangular',
    'RecursionHelper',
    require('angular-formly'),
    require('angular-formly-templates-bootstrap'),
    require('./resource-search').name,
    'ui.bootstrap',
    'ngAnimate',
    require('./../authentication').name,
    require('./../../constants').name,
    require('./../utilities').name,
    'Focus.Service',
    'pr.longpress',
    'ui.tree',
    'angular-clipboard',
    'ngSanitize',
    'dynamicBindHtml',
    require('./../group').name // the button in resource-list
  ])
  .directive('lotsTreeNavigation', require('./resource-list/lots-tree-navigation/lots-tree-navigation.directive'))
  .service('LotsSelector', require('./resource-list/lots-tree-navigation/lots-selector.service'))
  .directive('resourceList', require('./resource-list/resource-list.directive'))
  // filters
  .directive('resourceListFilters', require('./resource-list/resource-list-filters/resource-list-filters.directive'))
  .factory('resourceListConfig', require('./resource-list/resource-list-config.factory'))
  .directive('fieldSort', require('./resource-list/field-sort/field-sort.directive.js'))
  .directive('resourceFieldEdit', require('./resource-field-edit/resource-field-edit.directive'))
  .factory('resources', require('./resources.factory'))
  .directive('deviceListSummary', require('./resource-list/device-list-summary/device-list-summary.directive'))
  .config(require('./resource-list/resource-list-filters/panel-filter.wrapper.formly.config'))
  .factory('resourceServer', require('./resource-server.factory'))

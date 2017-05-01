require('restangular')
require('angular-ui-bootstrap')
require('jsonformatter')
require('angular-ui-notification')
require('angular-recursion')
require('angular-animate')
require('angular-timeago')
require('angular-google-maps')

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
    require('./../utilities').name
  ])
  .constant('RESOURCE_CONFIG', require('./resource-config.constant'))
  .factory('ResourceServer', require('./resource-server.factory'))
  .factory('ResourceSettings', require('./resource-settings.factory'))
  .directive('resourceIcon', require('./resource-icon/resource-icon.directive'))
  .directive('resourceView', require('./resource-view/resource-view.directive'))
  .factory('ResourceViewGenerator', require('./resource-view/resource-view-generator.factory'))
  .factory('Subview', require('./resource-view/subview.factory'))
  .directive('resourceButton', require('./resource-button/resource-button.directive'))
  .directive('deleteButton', require('./delete-button/delete-button.directive'))
  .directive('resource', require('./resource/resource.directive'))
  // Resource-list
  .directive('resourceList', require('./resource-list/resource-list.directive'))
  .factory('ResourceListGetter', require('./resource-list/resource-list-getter.factory'))
  .factory('ResourceListGetterBig', require('./resource-list/resource-list-getter-big.factory'))
  .factory('ResourceListSelector', require('./resource-list/resource-list-selector.factory'))
  .factory('ResourceListSelectorBig', require('./resource-list/resource-list-selector-big.factory'))
  .factory('ResourceViewGenerator', require('./resource-view/resource-view-generator.factory'))
  .provider('resourceListConfig', require('./resource-list/resource-list-config.provider'))
  .directive('resourceListFooter', require('./resource-list/resource-list-footer/resource-list-footer.directive'))
  .directive('resourceListSelectAll', require('./resource-list/resource-list-select-all/resource-list-select-all.directive'))
  .directive('fieldSort', require('./resource-list/field-sort/field-sort.directive.js'))
  .directive('resourceDashboard', require('./resource-dashboard/resource-dashboard.directive'))
  .directive('resourceMapsLocations', require('./resource-maps-locations/resource-maps-locations.directive'))


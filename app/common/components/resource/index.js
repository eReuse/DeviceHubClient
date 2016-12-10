require('restangular')
require('angular-ui-bootstrap')
require('jsonformatter')
require('angular-ui-notification')
require('angular-recursion')

module.exports = angular.module('common.components.resource',
  [
    require('./../../config').name,
    'restangular',
    'RecursionHelper',
    require('./resource-search').name,
    require('./resource-list').name
  ])
.constant('RESOURCE_CONFIG', require('./resource-settings.constant'))
.factory('ResourceServer', require('./resource-server.factory'))
.factory('ResourceSettings', require('./resource-settings.factory'))
.directive('resourceIcon', require('./resource-icon/resource-icon.directive'))
.directive('resourceView', require('./resource-view/resource-view.directive'))
.directive('resourceButton', require('./resource-button/resource-button.directive'))
.directive('deleteButton', require('./delete-button/delete-button.directive'))
.directive('resource', require('./resource/resource.directive'))

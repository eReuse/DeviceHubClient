require('restangular')

module.exports = angular.module('common.components.workbench',
  [
    require('./../../config').name,
    'restangular',
    require('angular-ui-bootstrap'),
    require('./../authentication').name,
    require('./../../constants').name,
    require('./../utilities').name,
    require('angular-formly'),
    require('angular-formly-templates-bootstrap'),
    require('angular-poller')
  ])
  .factory('workbenchGetter', require('./workbench-getter.factory'))
  .directive('workbenchLinkButton', require('./workbench-link/workbench-link-button.directive'))

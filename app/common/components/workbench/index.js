module.exports = angular.module('common.components.workbench',
  [
    require('./../../config').name,
    require('angular-ui-bootstrap'),
    require('./../authentication').name,
    require('./../../constants').name,
    require('./../utilities').name,
    require('angular-formly'),
    require('angular-formly-templates-bootstrap'),
    require('angular-poller')
  ])
  .factory('workbenchResources', require('./workbench-resources.factory'))
  .directive('workbenchLinkButton', require('./workbench-link/workbench-link-button.directive'))

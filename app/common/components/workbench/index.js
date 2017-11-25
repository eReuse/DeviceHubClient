require('restangular')
require('angular-ui-bootstrap')

module.exports = angular.module('common.components.workbench',
  [
    require('./../../config').name,
    'restangular',
    'ui.bootstrap',
    require('./../authentication').name,
    require('./../../constants').name,
    require('./../utilities').name,
    require('angular-formly'),
    require('angular-formly-templates-bootstrap'),
    require('angular-poller')
  ])
  .directive('workbenchButton', require('./workbench-button/workbench-button.directive'))
  .directive('workbenchList', require('./workbench-list/workbench-list.directive'))
  .service('workbenchPoller', require('./workbenchPoller.service'))
  .directive('workbenchConfigButton', require('./workbench-config/workbench-config-button.directive'))
  .config(require('./workbench-config/workbench-config.modal.config'))
  .controller('workbenchConfigCtl', require('./workbench-config/workbench-config.controller'))
  .directive('workbenchLinkButton', require('./workbench-link/workbench-link-button.directive'))
  .controller('workbenchLinkCtl', require('./workbench-link/workbench-link.controller'))
  .service('workbenchServer', require('./workbenchServer.service'))
  .config(require('./workbench-link/workbench-link.modal.config'))

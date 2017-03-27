module.exports = angular.module('common.components.group',
  [])
  .directive('groupResourceButton', require('./group-resource-button/group-resource-button.directive'))
  .directive('groupResourceAdd', require('./group-resource-action/group-resource-add.directive'))
  .directive('groupResourceRemove', require('./group-resource-action/group-resource-remove.directive'))
  .factory('GroupResourceSubmitter', require('./group-resource-action/group-resource-submitter-action.factory'))

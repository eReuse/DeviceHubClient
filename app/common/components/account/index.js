require('angular-ui-bootstrap')
require('angular-recursion')
require('angular-gravatar')

module.exports = angular.module('common.components.accounts',
  [
    require('./../authentication').name,
    'ui.bootstrap',
    require('./../../constants/').name,
    require('./../resource').name,
    'RecursionHelper',
    'ui.gravatar'
  ])
  .directive('userButton', require('./user-button/user-button.directive.js'))
  .directive('accountRole', require('./account-role/account-role.directive.js'))
  .directive('changeDatabase', require('./change-database/change-database.directive.js'))
  .directive('accountView', require('./account-view/account-view.directive.js'))
  .directive('sharedWithMe', require('./shared-with-me/shared-with-me.directive'))

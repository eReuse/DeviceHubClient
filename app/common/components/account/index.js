require('angular-ui-bootstrap')
require('angular-recursion')

/**
 * @ngdoc module
 * @name common.components.accounts
 * @description
 * Provides account directives like buttons.
 *
 * - The `userButton` is the top-right button where you can log out.
 * - The `changeDatabase` is the top button that allows you to select
 *   an active database.
 * - The `sharedWithMe` is a top button that shows groups that
 *   are shared to you.
 */
module.exports = angular.module('common.components.accounts',
  [
    require('./../authentication').name,
    'ui.bootstrap',
    require('./../../constants/').name,
    require('./../resource').name,
    'RecursionHelper'
  ])
  .directive('userButton', require('./user-button/user-button.directive.js'))
  .directive('changeDatabase', require('./change-database/change-database.directive.js'))
  .directive('sharedWithMe', require('./shared-with-me/shared-with-me.directive'))

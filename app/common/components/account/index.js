require('angular-ui-bootstrap')

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
    'ui.bootstrap'
  ])
  .directive('userButton', require('./user-button/user-button.directive.js'))

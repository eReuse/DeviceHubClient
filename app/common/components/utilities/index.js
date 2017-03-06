require('angular-ui-bootstrap')
/**
 * @ngdoc module
 * @name common.components.utilities
 * @description Utilities are standalone components to be used by other modules, so they do no have dependencies in
 * the app. Use `common.components.elements` for reusable components with dependencies.
 */
module.exports = angular.module('common.components.utilities',
  [
    'ui.bootstrap'
  ])
  .provider('dhModal', require('./dh-modal.provider'))

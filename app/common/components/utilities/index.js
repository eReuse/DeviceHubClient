require('angular-ui-bootstrap')
require('angular-ui-notification')
/**
 * @ngdoc module
 * @name common.components.utilities
 * @description Utilities are standalone components to be used by other modules, so they do no have dependencies in
 * the app. Use `common.components.elements` for reusable components with dependencies.
 */
module.exports = angular.module('common.components.utilities',
  [
    'ui.bootstrap',
    'ui-notification'
  ])
  .provider('dhModal', require('./dh-modal.provider'))
  .directive('dhSubmitButton', require('./dh-submit-button/dh-submit-button.directive'))
  .factory('SubmitForm', require('./submit-form'))

require('angular-ui-notification')
require('ngprogress')
/**
 * @ngdoc module
 * @name common.components.utilities
 * @description Utilities are standalone components to be used by other modules, so they do no have dependencies in
 * the app. Use `common.components.elements` for reusable components with dependencies.
 */
module.exports = angular.module('common.components.utilities',
  [
    require('angular-ui-bootstrap'),
    'ui-notification',
    'ngProgress'
  ])
  .provider('dhModal', require('./dh-modal.provider'))
  .directive('dhSubmitButton', require('./dh-submit-button/dh-submit-button.directive'))
  .factory('SubmitForm', require('./submit-form'))
  .service('progressBar', require('./progress-bar.factory'))
  .filter('toInches', require('./to-inches.filter'))
  .filter('resourceTitle', require('./resource-title.filter'))
  .filter('humanize', require('./humanize'))

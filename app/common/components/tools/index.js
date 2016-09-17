require('angular-ui-bootstrap')

module.exports = angular.module('common.components.tools',
  [
    'ui.bootstrap',
    require('./../../constants').name
  ])
/**
 * @ngdoc directive
 * @name indexButton
 * @description Access method to redirect users to different websites related to the tools
 */
.directive('toolsButton', require('./tools-button.directive.js'))

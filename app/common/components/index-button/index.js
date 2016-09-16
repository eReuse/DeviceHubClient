

require('angular-ui-bootstrap');

module.exports = angular.module('common.components.indexButton',
    [
        'ui.bootstrap',
        require('./../../constants').name
    ])
    /**
     * @ngdoc directive
     * @name indexButton
     * @description Access method to redirect users to different websites related to the tools
     */
    .directive('indexButton', require('./index-button.directive.js'));
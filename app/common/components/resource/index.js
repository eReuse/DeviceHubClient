'use strict';

require('restangular');
require('angular-ui-bootstrap');
require('jsonformatter');
require('angular-ui-notification');
require('angular-recursion');

module.exports = angular.module('common.components.resource',
    [
        require('./../../config').name,
        'restangular',
        'RecursionHelper'
    ])
    .constant('RESOURCE_CONFIG', require('./resource-settings.constant'))
    .factory('ResourceServer', require('./resource-server.factory'))
    .factory('ResourceSettings', require('./resource-settings.factory'))
    .factory('resourceIcon', require('./resource-icon/resource-icon.directive'))
    .directive('resourceView', require('./resource-view/resource-view.directive'))
    .directive('resourceButton', require('./resource-button/resource-button.directive'));
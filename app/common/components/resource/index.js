'use strict';

require('restangular');
require('angular-ui-bootstrap');
require('jsonformatter');
require('angular-ui-notification');

module.exports = angular.module('common.components.resource',
    [
        require('./../../config').name,
        'restangular'
    ])
    .constant('RESOURCE_CONFIG', require('./resource-settings.constant'))
    .factory('ResourceServer', require('./resource-server.factory'))
    .factory('resourceSettings', require('./resource-settings.factory'))
    .factory('resource-icon', require('./resource-icon/resource-icon.directive'))
    .directive('resourceButton', require('./resource-button/resource-button.directive'));
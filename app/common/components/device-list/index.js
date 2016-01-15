'use strict';

require('angular-ui-bootstrap');
//require('bower_components/angular-advanced-searchbox/dist/angular-advanced-searchbox.js');
require('./angular-advanced-searchbox-ereuse.js');
require('ui-router');
require('checklist-model');
require('angular-animate');

module.exports = angular.module('common.components.list',
    [
        require('app/common/config').name,
        'ui.bootstrap',
        'angular-advanced-searchbox',
        'ui.router',
        'checklist-model',
        'ngAnimate',
        require('./../device-label').name
    ])
    /**
     * @ngdoc constant
     * @name deviceListConfig
     * @description
     */
    .constant('deviceListConfig', require('./CONFIG.js'))
    /**
     * @ngdoc directive
     * @name deviceList
     */
    .directive('deviceList', require('./device-list.directive.js'))
    /**
     * @ngdoc directive
     * @name deviceListModalCtrl
     */
    .controller('deviceListModalCtrl', require('./device-list-modal.controller.js'))
    /**
     * @ngdoc service
     * @name getDevices
     * @return Restangular's promise, filled with all the devices
     */
    .service('getDevices', require('./get-devices.service.js'));
'use strict';
/**
 * Represents the main devices view
 */
module.exports = angular.module('views.devices',
    [
        require('angular-ui-bootstrap'),
        require('./../../common/components/device').name,
        require('./../../common/components/device-list').name,
        require('./../../common/components/account').name,
        require('./../../common/components/authentication').name,
        require('./../../common/config').name
    ])
    .config(
        function($urlRouterProvider,$stateProvider){
            $stateProvider.state('index.devices.show',{
                url:'?max_results',
                templateUrl: window.VIEWS + '/devices/devices.controller.html',
                controller: 'devicesCtrl as DsCl'
            })
    })
    .controller('devicesCtrl', require('./devices.controller.js'));


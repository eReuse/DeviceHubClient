'use strict';

/** We set this variables to use in paths. GLOBAL object is only available in nodejs. window only in browsers. **/
window.COMMON = '/DeviceHubClient/app/common';
window.COMPONENTS = '/DeviceHubClient/app/common/components';
window.VIEWS = '/DeviceHubClient/app/views';

window.$ = window.jQuery = require('jquery'); //We globally load jQuery
window._ = require('lodash');

require('angular');
require('ui-router');


module.exports = angular.module('deviceHub',[
        'ui.router',
        require('./common').name,
        require('./views').name,
        require('dist/templates.js').name
    ])
    .config(
        function($urlRouterProvider,$stateProvider){
            $stateProvider.state('index', {
                url: '',
                templateUrl: 'views/index/index.controller.html',
                abstract: true
            })
            .state('index.devices',{
                url:'/devices',
                templateUrl: 'views/devices/devices.controller.html',
                abstract: true
            }).state('login',{
                url:'/login',
                templateUrl: 'views/login/login.controller.html',
                controller: 'loginCtrl as LnCl'
            });
            $urlRouterProvider.otherwise("/devices")
        })
    .controller('deviceHubCtrl',['CONSTANTS', function(CONSTANTS){
        $('#intro-spinner').remove();
        this.appName = CONSTANTS.appName;
    }]);

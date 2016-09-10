'use strict';

require('./init.js');
var utils = require('./common/components/utils');

module.exports = angular.module('deviceHub',[
        'ui.router',
        require('./common').name,
        require('./views').name,
        require('dist/templates.js').name,
        require('angular-animate')
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
                abstract: true,
                resolve: {rs: utils.schemaIsLoaded}
            }).state('fullDevice',{
                url:'/:db/devices/:id',
                templateUrl: 'views/full-device/full-device.controller.html',
                controller: 'fullDeviceCtrl as FeCl',
                resolve: {rs: utils.schemaIsLoaded}
            }).state('login',{
                url:'/login',
                templateUrl: 'views/login/login.controller.html',
                controller: 'loginCtrl as LnCl'
            }).state('index.reports',{
                url: '/reports',
                templateUrl: 'views/reports/reports.controller.html',
                controller: 'reportsCtrl as RsCl',
                resolve: {rs: utils.schemaIsLoaded}
            });
            $urlRouterProvider.otherwise("/devices")
        })
    .controller('deviceHubCtrl',function($templateCache, CONSTANTS){
        $('#intro-spinner').remove();
        window.tc = $templateCache;
        window.document.title = CONSTANTS.appName;
    })
    .run(function ($rootScope) {
        $rootScope._ = window._; // We add lodash for usage in templates
    });

'use strict';

window.COMMON = 'common';
window.COMPONENTS = 'common/components';
window.VIEWS = 'views';

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
    .controller('deviceHubCtrl',function($templateCache){
        $('#intro-spinner').remove();
        window.tc = $templateCache;
    });

/**
 * Created by Xavier on 27/5/2015.
 */
angular.module('Main',['ui.router','Config','Devices'] )
    .config(
    function($urlRouterProvider,$stateProvider){
        $stateProvider.state('devices',{
            url:'/devices',
            templateUrl:'app/devices/devices.html',
            abstract: true,

        });
        $urlRouterProvider.otherwise("/devices")
    })
    .controller('MainCtrl',['config', function(config){
    this.appName = config.appName;
    }]);

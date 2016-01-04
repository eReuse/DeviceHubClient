'use strict';
require('ui-router');

/**
 * @ngdoc module
 * @name nav
 * @description
 * Has Nav directive.
 */
module.exports = angular.module('common.components.nav',
    [
        require('./../account').name,
        require('./../device').name,
        'ui.router'
    ])
    /**
     * @ngdoc directive
     * @name dhNavNav
     * @description
     * Controls the tab main menu, changing the view accordingly.
     *
     * Tab trick from http://odetocode.com/blogs/scott/archive/2014/04/14/deep-linking-a-tabbed-ui-with-angularjs.aspx
     */
    .directive('navigation', function($state){
        var go = function(route){
            $state.go(route);
        };
        var active = function(route){
            return $state.is(route);
        };
        return {
            templateUrl: window.COMPONENTS + '/nav/nav.html',
            restrict: 'E',
            link: function($scope){
                $scope.tabs = [
                    {heading: 'List devices', route: 'index.devices.show', active: false}
                ];
                $scope.go = go;
                $scope.$on("$stateChangeSuccess", function() {
                    $scope.tabs.forEach(function(tab) {
                        tab.active = active(tab.route);
                    });
                });
            }
        }
    });
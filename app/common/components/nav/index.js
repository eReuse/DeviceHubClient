'use strict';
require('angular-ui-router');

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
        require('./../tools').name,
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
        var firstTime = true;
        /**
         * Goes to the stated specified by route.
         *
         * As this function is executed when the tab is selected, and the tab is selected in the page loading,
         * it does not change state when executing at the first time.
         * @param route
         */
        var go = function(route){
            if(!firstTime)
                $state.go(route);
            else
                firstTime = false;
        };
        var active = function(route){
            return $state.is(route);
        };
        return {
            templateUrl: window.COMPONENTS + '/nav/nav.html',
            restrict: 'E',
            link: function($scope){
                $scope.tabs = [
                    {heading: 'Devices', route: 'index.devices.show', glyphicon: 'phone'},
                    {heading: 'Reports', route: 'index.reports', glyphicon: 'file'}
                ];
                $scope.tabs.forEach(function(tab, index){
                    if(active(tab.route))
                        $scope.actualTab = index;
                });
                $scope.go = go;

                $scope.$on("$stateChangeSuccess", function() {
                    $scope.tabs.forEach(function(tab) {
                        tab.active = active(tab.route);
                    });
                });
            }
        }
    });
'use strict';

var utils = require('./../../utils.js');
var PATH = window.COMPONENTS + '/resource/resource-button/';

function resourceButton(RecursionHelper, ResourceSettings){
    return{
        templateUrl: PATH + 'resource-button.directive.html',
        restrict: 'E',
        scope:{
            resourceId: '=',
            parentId: '=?',
            resourceType: '=' //In plural
        },
        compile: function(element) {
            return RecursionHelper.compile(element, function ($scope, iElement, iAttrs, controller, transcludeFn) {
                var rSettings = ResourceSettings($scope.resourceType);
                $scope.isEvent = rSettings.isSubResource('Event');
                rSettings.server.one($scope.resourceId).get().then(function (resource) {
                    $scope.resource = resource;
                    $scope.popover.title = utils.getResourceTitle($scope.resource);
                }).catch(function(error){
                    $scope.error = true;
                });
                $scope.popover = {
                    templateUrl: PATH + 'resource-button.popover.directive.html',
                    isOpen: false,
                    placement: 'left'
                };
                utils.applyAfterScrolling('device-view .device', $scope);
            });
        }
    }
}

module.exports = resourceButton;
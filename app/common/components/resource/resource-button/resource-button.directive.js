'use strict';

var utils = require('./../../utils.js');
var PATH = window.COMPONENTS + '/view/resource-button/';

function resourceButton(RecursionHelper, resourceSettings){
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
                var rSettings = new resourceSettings($scope.resourceType);
                rSettings.loaded.then(function () {
                    rSettings.server.one($scope.resourceId).get().then(function () {
                        $scope.resource = resource;
                        $scope.popover.title = utils.getResourceTitle($scope.resource);
                        $scope.isEvent = _.includes(events, resource['@type']);
                    }).catch(function(error){
                        $scope.error = true;
                    });
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
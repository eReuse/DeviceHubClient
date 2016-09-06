'use strict';

var utils = require('./../../utils.js');
var PATH = window.COMPONENTS + '/view/resource-button/';

function resourceButton(Restangular, account, RecursionHelper){
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
                var promise = $scope.resourceType == 'accounts'?
                    account.getOne($scope.resourceId) :
                    Restangular.one($scope.resourceType, $scope.resourceId).get();
                promise.then(function(resource){
                    $scope.resource = resource;
                    $scope.popover.title = utils.getResourceTitle($scope.resource);
                    $scope.isEvent = utils.isEvent(resource['@type']);
                });
                promise.catch(function(error){
                   $scope.error = true;
                });
                $scope.resourceName = $scope.resourceType;
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
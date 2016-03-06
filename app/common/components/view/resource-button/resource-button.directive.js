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
            urlResourceName: '=' //In plural
        },
        compile: function(element) {
            return RecursionHelper.compile(element, function ($scope, iElement, iAttrs, controller, transcludeFn) {
                var promise = $scope.urlResourceName == 'accounts'?
                    account.getOne($scope.resourceId) :
                    Restangular.one($scope.urlResourceName, $scope.resourceId).get();
                promise.then(function(resource){
                    $scope.resource = resource;
                    $scope.popover.title = utils.getTitle($scope.resource);
                    $scope.isEvent = utils.isEvent(resource['@type']);
                });
                $scope.resourceName = utils.getResourceNameFromUrlRN($scope.urlResourceName);
                $scope.popover = {
                    templateUrl: PATH + 'resource-button.popover.directive.html',
                    isOpen: false,
                    placement: 'left'
                };
                window.sc = $scope;
                utils.applyAfterScrolling('device-view .device', $scope);
            });
        }
    }
}

module.exports = resourceButton;
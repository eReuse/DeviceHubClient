

var utils = require('./../../utils.js');
var PATH = window.COMPONENTS + '/resource/resource-button/';
var Unauthorized = require('./../../authentication/Unauthorized');

//noinspection JSCommentMatchesSignature
/**
 * A small button that, on clicked, shows a modal with the most relevant information of a resource.
 *
 * You have two options, or sending resourceId or sending resource. If you pass in
 * resourceId the resource will be fetched from the server. If you passed in resource it is used as it. If you pass in
 * both, the passed-in resource is used as is *until* the result from the server arrives, where the reference of
 * resource is replaced by the one from the server.
 *
 * @param {string|int|undefined} resourceId Identifier.
 * @param {object|undefined} resource
 * @param {string|int|undefined} parentId Optional.
 * @param {string} resourceType
 */
function resourceButton(RecursionHelper, ResourceSettings){
    return{
        templateUrl: PATH + 'resource-button.directive.html',
        restrict: 'E',
        scope:{
            resourceId: '=?',
            resource: '=?',
            parentId: '=?',
            resourceType: '='
        },
        compile: function(element) {
            return RecursionHelper.compile(element, function ($scope, iElement, iAttrs, controller, transcludeFn) {
                var rSettings = ResourceSettings($scope.resourceType);
                $scope.isEvent = rSettings.isSubResource('Event');
                if(angular.isDefined($scope.resourceId)){
                    if(rSettings.authorized){
                        rSettings.server.one($scope.resourceId).get().then(function(resource){
                            $scope.resource = resource;
                            $scope.popover.title = utils.getResourceTitle($scope.resource);
                        }).catch(function(error){
                            $scope.error = true;
                            throw error;
                        });
                    }
                    else{
                        $scope.error = true;
                        throw error;
                    }
                }
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
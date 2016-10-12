var utils = require('./../../utils.js')
var PATH = window.COMPONENTS + '/resource/resource-button/'

// noinspection JSCommentMatchesSignature
/**
 * A small button that, on clicked, shows a modal with the most relevant information of a resource.
 *
 * You have two options, or sending resourceId or sending resource. If you pass in
 * resourceId the resource will be fetched from the server. If you passed in resource it is used as it. If you pass in
 * both, the passed-in resource is used to display the button and the result of the result from the server to display
 * the popover.
 * @param {string|int|undefined} resourceId Identifier.
 * @param {object|undefined} resource
 * @param {string|int|undefined} parentId Optional.
 * @param {string} resourceType
 * @param {string|undefined} getWhenClicks Only gets the resource after clicking the button. Anything different from
 * undefined evaluates to true.
 */
function resourceButton (RecursionHelper, ResourceSettings) {
  return {
    templateUrl: PATH + 'resource-button.directive.html',
    restrict: 'E',
    scope: {
      resourceId: '=?',
      resource: '=?',
      parentId: '=?',
      resourceType: '=',
      getWhenClicks: '@?'
    },
    compile: function (element) {
      return RecursionHelper.compile(element, function ($scope, iElement, iAttrs, controller, transcludeFn) {
        $scope.resource = $scope.resource || {}
        var rSettings = ResourceSettings($scope.resourceType)
        $scope.isEvent = rSettings.isSubResource('Event')
        getResource()
        $scope.popover = {
          templateUrl: PATH + 'resource-button.popover.directive.html',
          isOpen: false,
          placement: 'left'
        }
        utils.applyAfterScrolling('device-view .device', $scope)
        if (angular.isDefined($scope.getWhenClicks)) {  // We avoid the watcher if not getWhenClicks
          $scope.$watch('popover.isOpen', function (isOpen) {
            if (isOpen) getResource()
          })
        }

        function getResource () {
          if (rSettings.authorized) {
            rSettings.server.one($scope.resourceId).get().then(function (resource) {
              _.assign($scope.resource, resource)
              getTitle()
            }).catch(function (error) {
              $scope.error = true
              throw error
            })
          } else {
            $scope.error = true
          }
        }

        function getTitle () {
          $scope.popover.title = utils.getResourceTitle($scope.resource)
        }

        try {
          getTitle() // When we get 'resource' as param
        } catch (err) { // Note that if resource may not be defined or incomplete
          if (!(err instanceof TypeError)) throw err
        }
      })
    }
  }
}

module.exports = resourceButton

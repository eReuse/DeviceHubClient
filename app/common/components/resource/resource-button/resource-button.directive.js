var utils = require('./../../utils.js')
var PATH = window.COMPONENTS + '/resource/resource-button/'

// noinspection JSCommentMatchesSignature
/**
 * A small button that, on clicked, shows a modal with the most relevant information of a resource.
 *
 * @param {object|undefined} resource
 * undefined evaluates to true.
 */
function resourceButton (RecursionHelper) {
  return {
    templateUrl: PATH + 'resource-button.directive.html',
    restrict: 'E',
    scope: {
      resource: '<' // One-way data-binding
    },
    compile: function (element) {
      return RecursionHelper.compile(element, function ($scope) {
        $scope.type = 'small'
        $scope.popover = {
          templateUrl: PATH + 'resource-button.popover.directive.html',
          isOpen: false,
          placement: 'left'
        }
        utils.applyAfterScrolling('device-view .device', $scope)
        try {
          $scope.popover.title = utils.getResourceTitle($scope.resource)
        } catch (err) { // Note that if resource may not be defined or incomplete
          if (!(err instanceof TypeError)) throw err
        }
      })
    }
  }
}

module.exports = resourceButton

/**
 *
 * Represents a resource. Selects the appropriate view to show the resource, depending of its type.
 *
 */
function resourceView (RecursionHelper, Subview, cerberusToView) {
  const utils = require('./../../utils')
  let BIG = 'big'
  let MED = 'medium'
  let SM = 'small'
  let TYPES = [BIG, MED, SM]
  return {
    templateUrl: require('./__init__').PATH + '/resource-view.directive.html',
    restrict: 'E',
    scope: {
      resource: '=?',
      type: '@'
    },
    compile: element => {
      return RecursionHelper.compile(element, function ($scope, iElement) {
        if (!_.includes(TYPES, $scope.type)) {
          throw TypeError('ResourceView only accepts big, medium and small as types.')
        }

        $scope.setActive = (tabToActivate) => {
          _.forOwn($scope.tabs, (tab) => { tab.isActive = false })
          tabToActivate.isActive = true
        }

        $scope.$watch('resource', (newResource, oldResource) => {
          // We create the tabs with the subviews embedded
          // Note that resourceView is re-used to hold different types of resources at different times
          // So th
          if (newResource !== oldResource) generateViewAndSubview()
        })

        function generateViewAndSubview () {
          // Gets the info for the view
          let resourceType = _.get($scope, 'resource.@type')
          if (!_.isUndefined(resourceType)) $scope.view = Subview.getSetting(resourceType, 'view')
          // Generates the subviews
          $scope.tabs = {} // Stores for each tab if it is the active one
          iElement.find('#resource-view-body').html(Subview.generate($scope, resourceType))
          // If small we use the resourceName
        }

        if ($scope.type !== 'small') {
          generateViewAndSubview()
        } else {
          $scope.model = cerberusToView.parse($scope.resource)
          $scope.srefUiParams = {resourceName: utils.Naming.resource($scope.resource['@type']), id: $scope.resource._id}
        }
      })
    }
  }
}

module.exports = resourceView

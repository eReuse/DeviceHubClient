/**
 *
 * Represents a resource. Selects the appropriate view to show the resource, depending of its type.
 *
 */
function resourceView (RecursionHelper, Subview) {
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
          if (newResource !== oldResource) generateSubview()
        })

        function generateSubview () {
          $scope.tabs = {} // Stores for each tab if it is the active one
          iElement.find('article').append(Subview.generate($scope, _.get($scope, 'resource.@type')))
        }

        generateSubview()
      })
    }
  }
}

module.exports = resourceView

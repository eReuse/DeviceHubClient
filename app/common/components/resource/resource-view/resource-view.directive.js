function resourceView (RecursionHelper, Subview, cerberusToView, RESOURCE_CONFIG, ResourceBreadcrumb) {
  const utils = require('./../../utils')
  const BIG = 'big'
  const MED = 'medium'
  const SM = 'small'
  const TYPES = [BIG, MED, SM]
  /**
   *
   * Represents a resource. Selects the appropriate view to show the resource, depending of its type.
   * @param {object} resource - The resource to represent.
   * @param {string} type - The type of the resource.
   */
  return {
    template: require('./resource-view.directive.html'),
    restrict: 'E',
    scope: {
      resource: '=?',
      type: '@'
    },
    compile: element => {
      return RecursionHelper.compile(element, ($scope, iElement) => {
        if (!_.includes(TYPES, $scope.type)) {
          throw TypeError('ResourceView only accepts big, medium and small as types.')
        }

        $scope.setActive = tabToActivate => {
          _.forOwn($scope.tabs, tab => { tab.isActive = false })
          tabToActivate.isActive = true
        }

        $scope.$on('changeTab', () => $scope.setActive())

        $scope.$watch('resource._id', (newResourceId, oldResourceId) => {
          // We create the tabs with the subviews embedded
          // Note that resourceView is re-used to hold different types of resources at different times
          if (newResourceId !== oldResourceId) {
            // Destroy children scopes
            // We use jquery to replace the HTML of the child scopes
            // so we need to destroy them through the angular way
            for (let childScope = $scope.$$childHead; childScope; childScope = childScope.$$nextSibling) {
              childScope.$destroy()
            }
            generateViewAndSubview()
          }
        })

        $scope.goTo = resource => ResourceBreadcrumb.go(resource)

        function generateViewAndSubview () {
          if ($scope.type === SM) {
            // Note that model is computed too in generateViewAndSubview for !sm views
            if (!_.isEmpty($scope.resource)) $scope.model = cerberusToView.parse($scope.resource)
            $scope.srefUiParams = {
              resourceName: utils.Naming.resource($scope.resource['@type']),
              id: $scope.resource._id
            }
          } else {
            // first at all ensure variables in $scope subviews will use are ready
            if (!_.isEmpty($scope.resource)) $scope.model = cerberusToView.parse($scope.resource)
            // Gets the info for the view
            let resourceType = _.get($scope, 'resource.@type')
            if (!_.isUndefined(resourceType)) $scope.view = Subview.getSetting(resourceType, 'view')
            // Generates the subviews
            $scope.tabs = {} // Stores for each tab if it is the active one
            $scope.tabs.active = 0  // Let's make the first tab the active one initially
            iElement.find('#resource-view-body').html(Subview.generate($scope, resourceType))
            // If small we use the resourceName

            if ($scope.type === BIG) {
              const subviewsConfig = resourceType
                ? Subview.getSetting(resourceType, 'subviews')
                : RESOURCE_CONFIG.inventory.subviews
              const num = subviewsConfig.length
              const AVOID_INPUTS = new Set(['text', 'textarea', 'number', 'email', 'month', 'password', 'tel', 'time',
                'url', 'date', 'datetime-local', 'search']) // We want to e.has to be fast
              /**
               * Sets the subviews tabs by pressing a number from the keyboard.
               */
              const keyPress = e => {
                if (!AVOID_INPUTS.has(e.target.type) && _.inRange(e.which, 49, 49 + num)) {  // 49 is the keyCode for '1'
                  $scope.$evalAsync(() => { $scope.tabs.active = e.which - 49 })
                }
              }
              $(document).keypress(keyPress)
              $scope.$on('$destroy', () => $(document).off('keypress', null, keyPress))
            }
          }
        }

        generateViewAndSubview()
      })
    }
  }
}

module.exports = resourceView

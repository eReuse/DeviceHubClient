function resourceView (RecursionHelper, Subview, cerberusToView, RESOURCE_CONFIG, ResourceBreadcrumb, ResourceSettings,
                       $compile) {
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
        let tabs  // We keep a reference of the tabs to be able to $destroy and replace them when changing resource
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
          if (newResourceId !== oldResourceId) generateViewAndSubview()
        })

        $scope.goTo = resource => ResourceBreadcrumb.go(resource)

        function generateViewAndSubview () {
          if ($scope.type === SM) {
            $scope.srefUiParams = {
              resourceName: utils.Naming.resource($scope.resource['@type']),
              id: $scope.resource._id
            }
            // todo integrate this 3 lines with Subview class
            const rSettings = ResourceSettings($scope.resource['@type'])
            let view = angular.element(Subview.view(rSettings.getSetting('subviewSmall')))
            $compile(view)($scope)
            if (!_.isEmpty($scope.resource)) $scope.model = cerberusToView.parse($scope.resource)
            iElement.find('#resource-view-body').html(view)
          } else {
            // first at all ensure variables in $scope subviews will use are ready
            if (!_.isEmpty($scope.resource)) $scope.model = cerberusToView.parse($scope.resource)
            // Gets the info for the view
            const resourceType = _.get($scope, 'resource.@type')
            if (!_.isUndefined(resourceType)) $scope.view = Subview.getSetting(resourceType, 'view')
            // Generates the subviews
            $scope.tabs = {} // Stores for each tab if it is the active one
            $scope.tabs.active = 0  // Let's make the first tab the active one initially
            // We need to manually destory the tabs and their children because we are replacing them through
            // jquery (.html() function) and not through an angular way
            if (tabs) tabs.isolateScope().$destroy()
            tabs = Subview.generate($scope, resourceType)
            iElement.find('#resource-view-body').html(tabs)
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

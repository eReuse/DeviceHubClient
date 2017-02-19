/**
 *
 * @param resourceListProvider
 * @param {ResourceListGetter} ResourceListGetter
 * @param {ResourceListGetterBig} ResourceListGetterBig
 * @param {ResourceListSelector} ResourceListSelector
 * @param {ResourceSelectorBig} ResourceListSelectorBig
 */
function resourceList (resourceListConfig, ResourceListGetter, ResourceListGetterBig, ResourceListSelector,
                       ResourceListSelectorBig) {
  return {
    templateUrl: require('./__init__').PATH + '/resource-list.directive.html',
    restrict: 'E',
    scope: {
      parentResource: '=', // The parent resource. If it does not have @type, then is the main inventory view.
      resourceType: '@', // The type of resource this list is representing.
      type: '@' // Type of resource-view this list is in: big, medium, small
    },
    link: {
      // Note that we load on 'pre' to initialize before our child (or inner) directives so they get real config values
      pre: ($scope) => {
        if (!$scope.resourceType) throw TypeError('resourceList needs a "resourceType" set, not ' + $scope.resourceType)
        if (!$scope.type) throw TypeError('resourceLists needs a "type" to be "big"|"medium"|"small", not ' + $scope.type)
        let config = $scope.config = resourceListConfig.config.views[$scope.resourceType]
        if (_.isUndefined(config)) throw ReferenceError($scope.resourceType + ' has no config.')
        $scope.resources = []
        let subResource = $scope.subresource = {
          resource: null,
          isOpened: resourceId => {
            return resourceId === _.get(subResource.resource, '_id')
          },
          toggle: resource => {
            subResource.resource = subResource.isOpened(resource['_id']) ? null : resource
            triggerCollapse()
          }
        }

        if ($scope.type === 'big') {
          $scope.$on('refresh@resourceList', initializeDirective)
          $scope.$on('refresh@deviceHub', initializeDirective)
          $scope.$on('submitted@any', initializeDirective)
        }

        console.log('initialized for ' + $scope.type)

        // Makes the table collapsible when window resizes
        // Note this method is executed too in $scope.toggleDeviceView
        let triggerCollapse = require('./collapse-table.js')($scope)
        $(window).resize(triggerCollapse)

        function initializeDirective () {
          // Note that some values of $scope are sate inside the constructors of ResourceListGetter and ResourceListSelector
          let resourceListGetter
          $scope.resources.length = 0
          if ($scope.type === 'big') {
            resourceListGetter = new ResourceListGetterBig($scope.resourceType, $scope.resources, config)
            new ResourceListSelectorBig($scope, resourceListGetter)
          } else {
            resourceListGetter = new ResourceListGetter($scope.resourceType, $scope.resources, config)
            new ResourceListSelector($scope, resourceListGetter)
          }
          $scope.opened = null // Keeps a reference to the opened resource

          // The following bindings are the ones used to get resources
          // Sorting
          $scope.sort = {}
          $scope.setSort = _.bind(resourceListGetter.updateSort, resourceListGetter, _)

          // Filtering
          $scope.onSearchParamsChanged = _.bind(resourceListGetter.updateFiltersFromSearch, resourceListGetter, _)

          // Loading more
          // Only be able to load more if there is not already an active request
          $scope.loadMoreIsBusy = false
          $scope.loadMore = () => {
            if (!$scope.loadMoreIsBusy) {
              $scope.loadMoreIsBusy = true
              resourceListGetter.getResources(true).finally(() => { $scope.loadMoreIsBusy = false })
            }
          }
        }

        initializeDirective()
      }
    }
  }
}

module.exports = resourceList

/**
 *
 * @param resourceListProvider
 * @param {ResourceListGetter} ResourceListGetter
 * @param {ResourceListGetterBig} ResourceListGetterBig
 * @param {ResourceListSelector} ResourceListSelector
 * @param {ResourceSelectorBig} ResourceListSelectorBig
 */
function resourceList (resourceListConfig, ResourceListGetter, ResourceListGetterBig, ResourceListSelector,
                       ResourceListSelectorBig, ResourceSettings) {
  const utils = require('./../../utils.js')
  const PATH = require('./__init__').PATH
  return {
    templateUrl: PATH + '/resource-list.directive.html',
    restrict: 'E',
    scope: {
      // The parent resource. If it does not have @type, then we are the list of the main inventory view.
      parentResource: '=?',
      resourceType: '@', // The type of resource this list is representing.
      type: '@' // Type of resource-view this list is in: big, medium, small
    },
    link: {
      // Note that we load on 'pre' to initialize before our child (or inner) directives so they get real config values
      pre: ($scope) => {
        let resourceType = $scope.resourceType
        $scope.resourceName = utils.Naming.resource(resourceType)
        if (!resourceType) throw TypeError('resourceList needs a "resourceType" set, not ' + resourceType)
        if (!$scope.type) throw TypeError('resourceLists needs a "type" to be "big"|"medium"|"small", not ' + $scope.type)
        let config = _.cloneDeep(resourceListConfig.config.views[resourceType])
        if (_.isUndefined(config)) throw ReferenceError(resourceType + ' has no config.')
        $scope.resources = [] // Do never directly assign (r=[]) to 'resources' as modules depend of its reference
        let subResource = $scope.subResource = {
          resource: null, // The opened subResource
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

        // Makes the table collapsible when window resizes
        // Note this method is executed too in $scope.toggleDeviceView
        let triggerCollapse = require('./collapse-table.js')($scope)
        $(window).resize(triggerCollapse)

        function initializeDirective () {
          // Note that some values of $scope are sate inside the constructors of ResourceListGetter and ResourceListSelector
          let resourceListGetter
          let resourceListSelector
          $scope.resources.length = 0
          $scope.selector = { // resourceListSelector needs the following vars
            checked: false, // ng-model for the 'selectAll' checkbox
            checkboxes: {}, // ng-model for the checkboxes in the list. Only for representational purposes.
            // The selected resources of the actual list. Although resourceListSelector uses its own
            // list, it can optionally populate this one if passed for use to use in the template
            inList: []
          }
          if ($scope.type === 'big') {
            resourceListGetter = new ResourceListGetterBig(resourceType, $scope.resources, config)
            resourceListSelector = new ResourceListSelectorBig($scope.selector, $scope.resources, resourceListGetter)
          } else {
            resourceListGetter = new ResourceListGetter(resourceType, $scope.resources, config)
            resourceListSelector = new ResourceListSelector($scope.selector, $scope.resources, resourceListGetter)
          }

          // Search
          // If we are the subresource of a parent, we can only show the resources that are tied somehow with
          // the parent, not all resources. We do this by setting a default parameter in search
          let parentType = _.get($scope, 'parentResource.@type')
          if (parentType) {
            // no need to _.clone this setting as we do not modify it
            let path = 'search.subResource.' + resourceType
            let defaultParam = utils.getSetting(resourceListConfig.config.views, ResourceSettings(parentType), path)
            if (!defaultParam) throw TypeError(`${parentType} does not have default param for subResource ${resourceType}`)
            config.search.defaultParams[defaultParam.key] = $scope.parentResource[defaultParam.field]
          }

          // Sorting
          $scope.sort = {}
          $scope.setSort = _.bind(resourceListGetter.updateSort, resourceListGetter, _)

          // Filtering
          $scope.onSearchParamsChanged = _.bind(resourceListGetter.updateFiltersFromSearch, resourceListGetter, _)

          // Selecting
          $scope.toggleSelectAll = _.bind(resourceListSelector.toggleSelectAll, resourceListSelector, _)
          $scope.toggleSelect = _.bind(resourceListSelector.toggle, resourceListSelector, _)

          // Pagination ('load more' button)
          // Let's avoid the user pressing multiple times the 'load more'
          $scope.loadMoreIsBusy = false
          $scope.loadMore = () => {
            if (!$scope.loadMoreIsBusy) {
              $scope.loadMoreIsBusy = true
              resourceListGetter.getResources(true).finally(() => { $scope.loadMoreIsBusy = false })
            }
          }
          $scope.pagination = resourceListGetter.pagination

          $scope.popovers = {enable: false}
          if ($scope.type === 'medium') {
            resourceListGetter.callbackOnGetting((resources) => {
              $scope.popovers.enable = true
              $scope.popovers.templateUrl = require('./../__init__').PATH + '/resource-button/resource-button.popover.directive.html'
              _.forEach(resources, (resource) => {
                $scope.popovers[resource._id] = {
                  isOpen: false,
                  placement: 'left',
                  title: utils.getResourceTitle(resource)
                }
              })
            })
          }
        }

        $scope.ini = initializeDirective
        initializeDirective()

        // As we touch config in the init, we add it to $scope at the end to avoid $watch triggering multiple times
        $scope.config = config
      }
    }
  }
}

module.exports = resourceList
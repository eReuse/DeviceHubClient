/**
 *
 * @param {resourceListConfig} resourceListConfig
 * @param {ResourceListGetter} ResourceListGetter
 * @param {ResourceListGetterBig} ResourceListGetterBig
 * @param {ResourceListSelector} ResourceListSelector
 * @param {ResourceListSelectorBig} ResourceListSelectorBig
 * @param {ResourceSettings} ResourceSettings
 * @param {progressBar} progressBar
 * @param {ResourceBreadcrumb} ResourceBreadcrumb
 * @param {Session} session
 */
function resourceList (resourceListConfig, ResourceListGetter, ResourceListGetterBig, ResourceListSelector,
                       ResourceListSelectorBig, ResourceSettings, progressBar, ResourceBreadcrumb, session) {
  const utils = require('./../../utils.js')
  const PARENT_PATH = require('./../__init__').PATH
  return {
    template: require('./resource-list.directive.html'),
    restrict: 'E',
    scope: {
      // The parent resource. If it does not have @type, then we are the list of the main inventory view.
      parentResource: '=?',
      resourceType: '@', // The type of resource this list is representing.
      type: '@' // Type of resource-view this list is in: big, medium, small
    },
    link: {
      // Note that we load on 'pre' to initialize before our child (or inner) directives so they get real config values
      pre: $scope => {
        $scope.session = session
        const resourceType = $scope.resourceType
        $scope.resourceName = utils.Naming.resource(resourceType)
        if (!resourceType) throw TypeError('resourceList needs a "resourceType" set, not ' + resourceType)
        if (!$scope.type) throw TypeError('resourceLists needs a "type" to be "big"|"medium"|"small", not ' + $scope.type)
        progressBar.start() // resourceListGetter.getResources will call this too, but doing it here we avoid delay
        const config = _.cloneDeep(resourceListConfig.views[resourceType])
        if (_.isUndefined(config)) throw ReferenceError(resourceType + ' has no config.')
        if (!session.hasExplicitPerms()) _.assign(config.search.defaultParams, config.search.defaultParamsForNotOwners)
        $scope.resources = [] // Do never directly assign (r=[]) to 'resources' as modules depend of its reference

        /**
         * Object to handle accessing sub resources.
         * @prop {object} resource - The resource
         */
        const subResource = $scope.subResource = {
          resource: null, // The opened subResource
          isOpened: resourceId => {
            return resourceId === _.get(subResource.resource, '_id')
          },
          /**
           * Open / close the right window.
           * @param {Object} resource
           */
          toggle: resource => {
            subResource.resource = subResource.isOpened(resource['_id']) ? null : resource
            triggerCollapse()
          },
          /**
           * Closes a resource if it was the opened one
           * @param {string} resourceId
           */
          close: resourceId => {
            if (_.get(subResource.resource, '_id') === resourceId) {
              subResource.resource = null
              triggerCollapse()
            }
          },
          /**
           * Gets into the resource; traverse one step into the resource hierarchy by opening the resource in the
           * main window.
           * @param {Object} resource - Minimum properties are @type and _id
           */
          openFull: resource => {
            ResourceBreadcrumb.go(resource)
          }
        }

        // Makes the table collapsible when window resizes
        // Note this method is executed too in $scope.toggleDeviceView
        const triggerCollapse = require('./collapse-table.js')($scope)
        $(window).resize(triggerCollapse)

        // Note that some values of $scope are sate inside the constructors of ResourceListGetter and ResourceListSelector
        let resourceListGetter
        let resourceListSelector
        $scope.resources.length = 0
        $scope.selector = { // resourceListSelector needs the following vars
          checked: false, // ng-model for the 'selectAll' checkbox
          checkboxes: {}, // ng-model for the checkboxes in the list. Only for representational purposes.
          // The selected resources of the actual list. Although resourceListSelector uses its own
          // list, it can optionally populate this one if passed for use to use in the template
          inList: [],
          // The same as inList but for the total of resources through all lists
          total: []
        }
        if ($scope.type === 'big') {
          resourceListGetter = new ResourceListGetterBig(resourceType, $scope.resources, config, progressBar)
          resourceListSelector = new ResourceListSelectorBig($scope.selector, $scope.resources, resourceListGetter)
        } else {
          resourceListGetter = new ResourceListGetter(resourceType, $scope.resources, config, progressBar)
          resourceListSelector = new ResourceListSelector($scope.selector, $scope.resources, resourceListGetter)
        }

        // Search
        // If we are the subresource of a parent, we can only show the resources that are tied somehow with
        // the parent, not all resources. We do this by setting a default parameter in search
        const parentType = _.get($scope, 'parentResource.@type')
        if (parentType) {
          if (config.search.defaultParamsWhenSubview) {
            _.assign(config.search.defaultParams, config.search.defaultParamsWhenSubview)
            if (!session.hasExplicitPerms()) {
              _.assign(config.search.defaultParams, config.search.defaultParamsForNotOwners)
            }
          }
          // no need to _.clone this setting as we do not modify it
          const path = 'search.subResource.' + resourceType
          const defaultParam = utils.getSetting(resourceListConfig.views, ResourceSettings(parentType), path)
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

        // Reloading
        // When a button succeeds in submitting info and the list needs to be reloaded in order to get the updates
        $scope.reload = () => resourceListGetter.getResources()

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

        // Popover is set on the left or bottom depending screen size (xs)
        const computePlacement = () => $(window).width() <= 768 ? 'bottom-left' : 'auto left'
        $scope.popoverPlacement = computePlacement()
        $(window).resize(() => {
          const placement = computePlacement()
          if (placement !== $scope.popoverPlacement) $scope.$evalAsync(() => { $scope.popoverPlacement = placement })
        })

        $scope.popovers = {enable: false}
        if ($scope.type === 'medium') {
          resourceListGetter.callbackOnGetting((resources) => {
            $scope.popovers.enable = true
            $scope.popovers.templateUrl = PARENT_PATH + '/resource-button/resource-button.popover.directive.html'
            _.forEach(resources, resource => {
              $scope.popovers[resource._id] = {
                isOpen: false,
                title: utils.getResourceTitle(resource)
              }
              // Extra costly todo find better way
              $scope.$watch(() => $scope.popovers[resource._id].isOpen, isOpen => {
                if (isOpen === false) {
                  $scope.subResource.close(resource._id)
                } else if (isOpen === true) { // Let's close other popovers
                  _.forEach(resources, _resource => {
                    if (_resource._id !== resource._id) $scope.popovers[_resource._id].isOpen = false
                  })
                }
              })
            })
          })
        }

        function hardReload () {
          $scope.checked = false
          resourceListSelector.deselectAll()
          $scope.reload()
        }

        if ($scope.type === 'big') {
          $scope.$on('submitted@' + resourceType, hardReload)
          // We register ourselves for any event type, excluding Snapshot if the list is not about devices
          let eventTypes = ResourceSettings('Event').subResourcesNames
          if (resourceType !== 'Device') eventTypes = _.without(eventTypes, 'devices:Snapshot', 'devices:Register')
          _.forEach(eventTypes, eventType => { $scope.$on('submitted@' + eventType, hardReload) })
        }

        // As we touch config in the init, we add it to $scope at the end to avoid $watch triggering multiple times
        $scope.config = config
      }
    }
  }
}

module.exports = resourceList

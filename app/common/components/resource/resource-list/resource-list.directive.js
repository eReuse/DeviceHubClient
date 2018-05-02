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
function resourceList (resourceListConfig, ResourceListGetter, ResourceListSelector, ResourceSettings, progressBar, ResourceBreadcrumb, session) {
  const PARENT_PATH = require('./../__init__').PATH
  const NoMorePagesAvailableException = require('./no-more-pages-available.exception')
  return {
    template: require('./resource-list.directive.html'),
    restrict: 'E',
    scope: {
      // The parent resource. If it does not have @type, then we are the list of the main inventory view.
      parentResource: '=?'
    },
    link: {
      // Note that we load on 'pre' to initialize before our child (or inner) directives so they get real config values
      pre: ($scope, element) => {
        console.log('scope', JSON.stringify($scope.resource), ', parent', JSON.stringify($scope.parentResource))

        // $scope.parentResource = {
        //   'label': 'Inventory',
        //   '_updated': '2018-04-11T10:11:49',
        //   '_links': {
        //     'self': {
        //       'href': 'db1/lots/NCZ0iW0mC',
        //       'title': 'Lot'
        //     }
        //   },
        //   'summary': {
        //     'totalNumberDevices': 256,
        //     'deviceType': 'Netbook HP',
        //     'status': 'Ready',
        //     'price': '150 - 300',
        //     'range': 'Very low - High',
        //     'components': 'Various components',
        //     'donors': ['BCN Activa', 'BCN Ayto.'],
        //     'owner': 'Solidança',
        //     'distributor': null,
        //     'possessor': 'Solidança',
        //     'location': 'Cede Solidança',
        //     'events:': []
        //   },
        //   'perms': [],
        //   'children': {},
        //   'byUser': '5ac49232a0961e72684082dc',
        //   '_created': '2018-04-11T10:11:49',
        //   '@type': 'Lot',
        //   '_id': 'n98tkSWa',
        //   'sharedWith': [],
        //   'ancestors': [],
        //   totalNumDevices: 12,
        //   lots: [
        //     {
        //       'label': 'BDR',
        //       '_updated': '2018-04-11T10:11:49',
        //       '_links': {
        //         'self': {
        //           'href': 'db1/lots/NCZ0iW0mC',
        //           'title': 'Lot'
        //         }
        //       },
        //       'perms': [],
        //       'children': {},
        //       'byUser': '5ac49232a0961e72684082dc',
        //       '_created': '2018-04-11T10:11:49',
        //       '@type': 'Lot',
        //       '_id': 'NCZ0iW0mC',
        //       'sharedWith': [],
        //       'ancestors': []
        //     },
        //     {
        //       'label': 'lot1',
        //       '_updated': '2018-04-04T08:52:46',
        //       '_links': {
        //         'self': {
        //           'href': 'db1/lots/PuDTLblX',
        //           'title': 'Lot'
        //         }
        //       },
        //       'perms': [
        //         {
        //           'perm': 'r',
        //           'account': '5ac4925da0961e72684083e8'
        //         }
        //       ],
        //       'children': {
        //       },
        //       'byUser': '5ac49232a0961e72684082dc',
        //       '_created': '2018-04-04T08:52:34',
        //       '@type': 'Lot',
        //       '_id': 'PuDTLblX',
        //       'sharedWith': [
        //         '5ac4925da0961e72684083e8'
        //       ],
        //       'ancestors': []
        //     },
        //     {
        //       'label': 'Lot from User',
        //       '_updated': '2018-04-04T08:52:45',
        //       '_links': {
        //         'self': {
        //           'href': 'db1/lots/XOmGHs3i',
        //           'title': 'Lot'
        //         }
        //       },
        //       'perms': [],
        //       'children': {},
        //       'byUser': '5ac49232a0961e72684082dc',
        //       '_created': '2018-04-04T08:52:45',
        //       '@type': 'Lot',
        //       '_id': 'XOmGHs3i',
        //       'sharedWith': [],
        //       'ancestors': []
        //     }
        //   ]
        // }

        $scope.session = session
        progressBar.start() // getterDevices.getResources will call this too, but doing it here we avoid delay
        const config = _.cloneDeep(resourceListConfig)

        // TODO move to service
        $scope.devices = [] // Do never directly assign (r=[]) to 'devices' as modules depend of its reference
        $scope.getDevices = () => {
          return $scope.devices
        }
        $scope.lots = []
        $scope.getLots = () => {
          return $scope.lots
        }

        /**
         * Gets into the resource; traverse one step into the resource hierarchy by opening the resource in the
         * main window.
         * @param {Object} resource - Minimum properties are @type and _id
         */
        $scope.openFull = resource => {
          ResourceBreadcrumb.go(resource)
        }

        // Makes the table collapsible when window resizes
        // Note this method is executed too in $scope.toggleDeviceView
        const triggerCollapse = require('./collapse-table.js')($scope)
        $(window).resize(triggerCollapse)

        const defaultFilters = ($scope.parentResource && $scope.parentResource._id)
          ? { 'dh$insideLot': $scope.parentResource._id } // TODO dh$insideLot returns devices that are in specified lot OR any sublot of specified lot
          : null
        const getterDevices = new ResourceListGetter('Device', $scope.devices, config, progressBar, _.cloneDeep(defaultFilters))
        const selector = $scope.selector = ResourceListSelector
        getterDevices.callbackOnGetting(_.bind(selector.reAddToLot, selector, _))

        const getterLots = new ResourceListGetter('Lot', $scope.lots, config, progressBar, _.cloneDeep(defaultFilters))
        getterLots.updateSort('-label')
        // Search
        // const parentType = _.get($scope, 'parentResource.@type')
        // if (parentType) {
        //   // If we are the subresource of a parent, we can only show the resources that are tied somehow with
        //   // the parent, not all resources. We do this by setting a default parameter in search
        //   // no need to _.clone this setting as we do not modify it
        //   const path = 'search.subResource.Device'
        //   const defaultParam = utils.getSetting(resourceListConfig.views, ResourceSettings(parentType), path)
        //   if (!defaultParam) throw TypeError(`${parentType} does not have default param for subResource ${'Device'}`)
        //   config.search.defaultParams[defaultParam.key] = $scope.parentResource[defaultParam.field]
        // }

        // Total number of devices
        $scope.getTotalNumberOfDevices = () => {
          return getterDevices.getTotalNumberResources()
        }

        // Sorting
        $scope.sort = {}
        $scope.setSort = _.bind(getterDevices.updateSort, getterDevices, _)

        // Filtering
        $scope.onSearchParamsChanged = newFilters => {
          console.log('filters changed to', newFilters)
          getterDevices.updateFiltersFromSearch(newFilters)
          getterLots.updateFiltersFromSearch(newFilters) // TODO update lots on filter update?
        }

        // Selecting
        // $scope.toggleSelect = _.bind(selector.toggle, selector, _)
        $scope.toggleSelect = (resource, $event) => {
          selector.toggle(resource)
          // Avoids the ng-click from the row (<tr>) to trigger
          $event.stopPropagation()
        }

        // Reloading
        // When a button succeeds in submitting info and the list needs to be reloaded in order to get the updates
        $scope.reload = () => {
          getterDevices.getResources()
          selector.deselectAll()
        }

        // Pagination Devices
        // Let's avoid the user pressing multiple times the 'load more'
        $scope.getMoreIsBusy = false
        $scope.morePagesAvailable = true
        let getMoreFirstTime = false
        $scope.getMore = () => {
          console.log('getMore (devices) called. getMoreFirstTime', getMoreFirstTime)
          if (!$scope.getMoreIsBusy && getMoreFirstTime) {
            $scope.getMoreIsBusy = true
            try {
              getterDevices.getResources(true, false).finally(() => { $scope.getMoreIsBusy = false })
            } catch (err) {
              $scope.getMoreIsBusy = false
              if (!(err instanceof NoMorePagesAvailableException)) throw err
              $scope.morePagesAvailable = false
            }
          }
          getMoreFirstTime = true
        }

        // Pagination lots
        // Let's avoid the user pressing multiple times the 'load more'
        $scope.getMoreLotsIsBusy = false
        $scope.morePagesAvailableLots = true
        let getMoreLotsFirstTime = false
        $scope.getMoreLots = () => {
          console.log('getMore (lots) called. getMoreLotsFirstTime', getMoreLotsFirstTime)
          if (!$scope.getMoreLotsIsBusy && getMoreLotsFirstTime) {
            $scope.getMoreLotsIsBusy = true
            try {
              getterLots.getResources(true, false).finally(() => {
                $scope.getMoreLotsIsBusy = false
              })
            } catch (err) {
              $scope.getMoreLotsIsBusy = false
              if (!(err instanceof NoMorePagesAvailableException)) throw err
              $scope.morePagesAvailableLots = false
            }
          }
          getMoreLotsFirstTime = true
        }

        // If we don't want to collision with tables of subResources we
        // need to do this when declaring the directive
        const $table = element.find('.fill-height-bar')
        getterDevices.callbackOnGetting((_, __, ___, getNextPage) => {
          if (!getNextPage) {
            $table.scrollTop(0) // Scroll up to the table when loading from page 0 again
            $scope.morePagesAvailable = true // Reset
          }
        })

        // Popover is set on the left or bottom depending screen size (xs)
        const computePlacement = () => $(window).width() <= 768 ? 'bottom-left' : 'auto left'
        $scope.popoverPlacement = computePlacement()
        $(window).resize(() => {
          const placement = computePlacement()
          if (placement !== $scope.popoverPlacement) $scope.$evalAsync(() => { $scope.popoverPlacement = placement })
        })

        $scope.popovers = {enable: false}
        /* TODO DEPRECATED
        if ($scope.type === 'medium') {
          getterDevices.callbackOnGetting(resources => {
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
        */

        function hardReload () {
          selector.deselectAll()
          $scope.reload()
        }

        // TODO what does next line?
        ResourceSettings('Device').types.forEach(type => { $scope.$on('submitted@' + type, hardReload) })

        // We register ourselves for any event type, excluding Snapshot if the list is not about devices
        let eventTypes = ResourceSettings('Event').subResourcesNames
        // TODO do we need next line? resourceType is always 'Device' for now
        // if (resourceType !== 'Device') eventTypes = _.without(eventTypes, 'devices:Snapshot', 'devices:Register')
        _.forEach(eventTypes, eventType => { $scope.$on('submitted@' + eventType, hardReload) })

        // As we touch config in the init, we add it to $scope at the end to avoid $watch triggering multiple times
        $scope.config = config
      }
    }
  }
}

module.exports = resourceList

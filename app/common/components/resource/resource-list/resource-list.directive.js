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

        // Workaround: In root, parentResource is not set. This must be after initializing ResourceListGetter
        // TODO Delete workaround as soon as API returns root with label and _id set
        $scope.parentResource = $scope.parentResource || {
          label: 'Inventory root',
          _id: '0'
        }

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
          selector.toggle(resource, $scope.parentResource)
          // Avoids the ng-click from the row (<tr>) to trigger
          $event.stopPropagation()
        }

        // mark all selected devices of current lot as originally selected TODO in the future parentResource will have to be set!
        $scope.parentResource && selector.markSelectedDevicesInLotAsOriginal($scope.parentResource)

        // Workaround to set labels of selected lots correctly. Necessary because API /devices doesn't include the 'label' property for device ancestors
        // TODO remove as soon as API returns ancestor lots with labels set
        $scope.parentResource && selector.nameLot($scope.parentResource)

        function updateSelection () {
          $scope.allSelectedDevices = selector.getAllSelectedDevices()

          // TODO
          // Display all lots, show up to 10 directly, hide others in collapse
          // Preference
          // 1. Current lot
          // 2. Originally selected
          // 3. Lots that are 'nearest' to current lot

          // Update selected lots
          $scope.selectedLots = selector.getLots()
          if ($scope.parentResource) { // TODO in the future parentResource will have to be set!
            $scope.areAllDevicesOfCurrentLotSelected = _.difference(
              $scope.getDevices(),
              $scope.selector.getAllSelectedDevices(),
              (a, b) => {
                return a._id === b._id
              }
            ).length === 0

            // mark current lot
            let currentLot = _.find($scope.selectedLots, { _id: $scope.parentResource._id })
            if (currentLot) {
              currentLot.current = true
            }
          }

          // Update selection info info
          $scope.showContent = {}
          $scope.selectionSummary = [
            {
              title: 'Device',
              contentSummary: selector.getAggregatedPropertyOfSelected('@type', 'Various types') + ' ' + selector.getAggregatedPropertyOfSelected('type', 'Various subtypes') + ' ' + selector.getAggregatedPropertyOfSelected('manufacturer', '') + ' ' + selector.getAggregatedPropertyOfSelected('model', ''),
              content: 'Type: ' + selector.getAggregatedPropertyOfSelected('@type', 'Various types')
            },
            {
              title: 'Status',
              contentSummary: selector.getAggregatedPropertyOfSelected('status'),
              content: 'Status'
            },
            {
              title: 'Price',
              contentSummary: selector.getRangeOfPropertyOfSelected('price'),
              content: 'Price'
            },
            {
              title: 'Components',
              contentSummary: selector.getAggregatedPropertyOfSelected('processorModel') + ' ' + selector.getAggregatedPropertyOfSelected('totalHardDriveSize', 'Various', ' GB HardDrive') + ' ' + selector.getAggregatedPropertyOfSelected('totalRamSize', 'Various', ' MB RAM'),
              content: 'Components'
            },
            {
              title: 'Providers',
              contentSummary: 'Donor:' + selector.getAggregatedPropertyOfSelected('donor') || 'No donor' +
              'Owner:' + selector.getAggregatedPropertyOfSelected('donor') || 'No owner' +
              'Distributor:' + selector.getAggregatedPropertyOfSelected('distributor') || 'No distributor',
              content: 'Providers'
            }
          ]
        }
        selector.callbackOnSelection(updateSelection)
        updateSelection()
        //
        // $scope.getSelectedLots = () => {
        //   // TODO to be safe count devices twice
        //   // make sure devices are not counted twice
        //   // give preference to counting to current lot
        //   let originallySelectedLots = this.getLotsWithOriginallySelectedDevicesOnly()
        //   originallySelectedLots = originallySelectedLots.filter((lot) => {
        //     return lot.selectedDevices.length > 0
        //   })
        //   originallySelectedLots.push({
        //     label: 'Current lot',
        //     _id: $scope.parentResource._id,
        //     // id,
        //     selectDevices: this.getSelectedDevicesInLot($scope.parentResource._id)
        //   })
        //   console.log('originallySelectedLots', originallySelectedLots )
        //   return originallySelectedLots
        // }

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

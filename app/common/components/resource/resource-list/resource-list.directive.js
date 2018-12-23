/**
 *
 * @param {resourceListConfig} resourceListConfig
 * @param {ResourceListGetter} ResourceListGetter
 * @param {ResourceListSelector} ResourceListSelector
 * @param {ResourceSettings} ResourceSettings
 * @param {progressBar} progressBar
 * @param {ResourceBreadcrumb} ResourceBreadcrumb
 * @param {Session} session
 */
function resourceList (resourceListConfig, ResourceListGetter, ResourceListSelector, ResourceSettings, progressBar, ResourceBreadcrumb, session, UNIT_CODES, CONSTANTS, SearchService, $filter, $rootScope, Notification, LotsSelector) {
  return {
    template: require('./resource-list.directive.html'),
    restrict: 'E',
    scope: {},
    link: {
      // Note that we load on 'pre' to initialize before our child (or inner) directives so they
      // get real config values
      pre: ($scope, $element) => {
        $scope.Notification = Notification
        $scope.utils = require('./../../utils.js')
        $scope.session = session
        progressBar.start() // getterDevices.getResources will call this too, but doing it here we
                            // avoid delay
        const config = _.cloneDeep(resourceListConfig)
        $scope.devices = [] // Do never directly assign (r=[]) to 'devices' as modules depend of
                            // its reference

        $scope.lotsSelectionHiddenXS = true
        $scope.selectionPanelHiddenXS = true
        $scope.isAndroid = !!window.AndroidApp
        const lotsSelector = $scope.lotsSelector = LotsSelector

        $scope.selectLot = lot => {
          lotsSelector.selectOnly(lot)
        }

        // Set up getters and selectors for devices
        const getterDevices = new ResourceListGetter('Device', $scope.devices, config, progressBar, null)
        const deviceSelector = $scope.deviceSelector = new ResourceListSelector()
        $scope.gettingDevices = true
        getterDevices.callbackOnGetting(() => {
          $scope.gettingDevices = false
          deviceSelector.reselect($scope.devices)
          $scope.totalNumberOfDevices = getterDevices.getTotalNumberResources()
          $scope.moreDevicesAvailable = $scope.totalNumberOfDevices > $scope.devices.length
        })

        // Workaround: In root, parentResource is not set. This must be after initializing
        // ResourceListGetter TODO Delete workaround as soon as API returns root with label and
        // _id set
        $scope.parentResource = $scope.parentResource || {
          _id: 'NoParent',
          '@type': 'Lot',
          label: 'Without lot'
        }

        // TODO call recalculateDevicesRow on screen size change. necessary for e.g. mobile
        // portrait -> landscape
        function recalculateDevicesRow () {
          if ($scope.selectedLots.length > 0) {
            $element.find('.devices-row').css({top: $element.find('.lot-row').outerHeight()})
          } else {
            $element.find('.devices-row').css({top: '0'})
          }
        }

        // Selected lots
        function updateLotSelection (selectedLots = []) {
          $scope.selectedLots = selectedLots
          if ($scope.selectedLots.length > 0) {
            $scope.selectedLotsText = $scope.selectedLots.map((l) => l.name).join(', ')
          }
          const filter = selectedLots.length > 0 ? {
            lot: {
              id: selectedLots.map(l => l._id)
            }
          } : null
          $scope.gettingDevices = true
          getterDevices.updateFilters('LOTS', filter)
          recalculateDevicesRow()
        }

        updateLotSelection([])
        lotsSelector.callbackOnSelection(updateLotSelection)

        $scope.reloadLots = () => {
          $rootScope.$broadcast('lots:reload')
        }

        $scope.deleteSelectedLots = () => {
          const selectedLots = lotsSelector.getAllSelected()
          Promise.all(selectedLots.map(lot => {
            return ResourceSettings('Lot').server.one(lot._id).remove()
          })).then(() => {
            Notification.success('Successfully deleted ' + selectedLots.length + ' lots')
            lotsSelector.deselectAll()
            $scope.reloadLots()
          })
        }

        // Sorting
        $scope.sort = {}
        $scope.setSort = (sort) => {
          $scope.gettingDevices = true
          getterDevices.updateSort(sort)
        }

        // Search
        $scope.onSearchChanged = (query) => {
          $scope.gettingDevices = true
          getterDevices.updateSearchQuery(query)
        }

        // Filtering
        $scope.updateFiltersFromSearch = (newFilters, checkIfEndpoint) => {
          $scope.gettingDevices = true
          getterDevices.updateFiltersFromSearch(newFilters, checkIfEndpoint)
        }

        // Selecting
        let lastSelectedIndex = 0
        $scope.toggleSelect = (resource, $index, $event) => {
          $event.stopPropagation() // Avoids the ng-click from the row (<tr>) to trigger
          if ($event.shiftKey) {
            let start = Math.min(lastSelectedIndex, $index)
            let end = Math.max(lastSelectedIndex, $index)
            let devicesToSelect = $scope.devices.slice(start, end + 1)
            deviceSelector.selectAll(devicesToSelect)
          } else if ($event.ctrlKey || $event.metaKey) {
            deviceSelector.toggle(resource)
          } else if ($scope.selectingMultiple) {
            deviceSelector.toggle(resource)
            if ($scope.selection.devices.length === 0) {
              $scope.selectingMultiple = false
            }
          } else { // normal click
            let isSelected = deviceSelector.isSelected(resource)
            if (isSelected) {
              if ($scope.selection.devices.length === 1) {
                deviceSelector.toggle(resource) // remove
              } else {
                deviceSelector.deselectAll()
                deviceSelector.toggle(resource) // add
              }
            } else {
              deviceSelector.deselectAll()
              deviceSelector.toggle(resource)
            }
          }
          lastSelectedIndex = $index
        }
        $scope.multiSelect = (resource) => {
          // detect touch screen
          // https://stackoverflow.com/questions/29747004/find-if-device-is-touch-screen-then-apply-touch-event-instead-of-click-event
          // https://hacks.mozilla.org/2013/04/detecting-touch-its-the-why-not-the-how/ links
          // above do not work on Windows 10 due to:
          // https://bugs.chromium.org/p/chromium/issues/detail?id=676808 TODO needs testing on
          // different devices + OS
          let supportsTouch = $scope.supportsTouch = (!!window.ontouchstart) || navigator.msMaxTouchPoints
          if (supportsTouch) {
            return
          }

          $scope.selectingMultiple = true

          // change to multi-select (changes normal click/touch behaviour)
          let isSelected = deviceSelector.isSelected(resource)
          if (!isSelected) {
            deviceSelector.toggle(resource)
          }
        }

        $scope.deselectAll = (devices) => {
          $scope.selector.deselectAll(devices)
          lastSelectedIndex = 0
          $scope.selectionPanelHiddenXS = true
        }

        $scope.deselectLots = () => {
          LotsSelector.deselectAll()
        }

        // components, price and condition score (Must be above updateSelection)
        // const manufacturerSettings = ResourceSettings('Manufacturer')
        const deviceSettings = ResourceSettings('Device')
        $scope.currencyOptions = {
          currency: CONSTANTS.currency,
          val: 'standard',
          roles: ['retailer', 'platform', 'refurbisher'],
          filter: (amount) => {
            return $filter('currency')(amount, CONSTANTS.currency)
          }
        }
        $scope.hasExplicitPerms = session.hasExplicitPerms()
        $scope.hardDriveSizeUnit = UNIT_CODES[deviceSettings.schema.totalHardDriveSize.unitCode]
        $scope.ramSizeUnit = UNIT_CODES[deviceSettings.schema.totalRamSize.unitCode]
        $scope.appearance = deviceSettings.schema.condition.schema.appearance.schema.general.allowed_description
        $scope.functionality = deviceSettings.schema.condition.schema.functionality.schema.general.allowed_description
        // const where = {parent: $scope.resource._id, '@type': {'$in': ['GraphicCard',
        // 'Processor']}} deviceSettings.server.getList({where: where}).then(components => {
        // $scope.graphicCard = _.find(components, {'@type': 'GraphicCard'}) const cpu =
        // _.find(components, {'@type': 'Processor'}) if (cpu) {
        // manufacturerSettings.server.findText(['label'], cpu.manufacturer.split(' ')[0], true,
        // 1).then(manu => { if (manu.length) { $scope.processorManufacturer = manu[0] } }) } })

        function updateDeviceSelection () {
          $scope.selection = $scope.selection || {}

          let selectedDevices = $scope.selection.devices = deviceSelector.getAllSelectedDevices().slice()
          $scope.selection.multiSelection = $scope.selection.devices.length > 1
          $scope.selection.lots = deviceSelector.getLots()

          // TODO Remove?
          // mark current lot
          let currentLot = _.find($scope.selection.lots, {_id: $scope.parentResource._id})
          if (currentLot) {
            currentLot.current = true
          }

          // selected lots pills
          $scope.selection.numSelectedLotsShown = 3 // TODO get from config
          $scope.selection.showDisplayMoreSelectedLotsButton =
            $scope.selection.devices.length > $scope.selection.numSelectedLotsShown
          $scope.selection.showMoreSelectedLots = () => {
            $scope.selection.details.Lots = true
          }

          // select/deselect button
          $scope.selection.areAllDevicesOfCurrentLotSelected = _.difference(
            $scope.devices,
            selectedDevices,
            (a, b) => {
              return a._id === b._id
            }
          ).length === 0
        }

        deviceSelector.callbackOnSelection(updateDeviceSelection)
        updateDeviceSelection()

        $scope.showLots = () => {
          $scope.lotsSelectionHiddenXS = false
        }

        // Reloading
        // When a button succeeds in submitting info and the list needs to be reloaded in order to
        // get the updates
        $scope.reloadDevices = () => {
          $scope.gettingDevices = true
          getterDevices.getResources()
        }

        // Pagination Devices
        // Let's avoid the user pressing multiple times the 'load more'
        $scope.getMoreIsBusy = false
        $scope.getMore = () => {
          if (!$scope.getMoreIsBusy) {
            $scope.getMoreIsBusy = true
            $scope.gettingDevices = true
            getterDevices.getResources(true, false).finally(() => {
              $scope.getMoreIsBusy = false
            })
          }
        }

        // If we don't want to collision with tables of subResources we
        // need to do this when declaring the directive
        // TODO need this?
        const $table = $element.find('.fill-height-bar')
        getterDevices.callbackOnGetting((_, __, ___, ____, getNextPage) => {
          if (!getNextPage) {
            $table.scrollTop(0) // Scroll up to the table when loading from page 0 again
            $scope.morePagesAvailable = true // Reset
          }
        })

        // Sets filter to show devices of given event
        $scope.showDevicesOfEvent = (event) => {
          ResourceBreadcrumb.goToRoot().then(() => {
            let searchParam = {
              key: 'event_id',
              name: 'Has event',
              // $$hashKey: 'object:7368',
              description: 'Match only devices that have a specific event.',
              placeholder: 'ID of event'
            }
            let value = event._id
            SearchService.addSearchParameter(searchParam, value)
          })
        }

        $scope.$on('tagScanDoneSearch', (_, tag) => {
          let id
          try {
            const url = new URL(tag)
            id = url.pathname.substring(1) // Remove initial slash
          } catch (e) {
            id = tag
          }
          $rootScope.$broadcast('addToSearchQuery', id)

          $scope.$apply()
        })

        // QR
        $scope.scanQR = () => {
          window.AndroidApp.scanBarcode('tagScanDoneSearch')
        }

        // NFC
        if (window.AndroidApp) {
          window.AndroidApp.startNFC('tagScanDoneSearch')
          $scope.$on('$destroy', () => {
            window.AndroidApp.stopNFC()
          })
        }

        // TODO what does next line?
        ResourceSettings('Device').types.forEach(type => {
          $scope.$on('submitted@' + type, $scope.reloadDevices)
        })

        // We register ourselves for any event type, excluding Snapshot if the list is not about
        // devices
        let eventTypes = ResourceSettings('Event').subResourcesNames
        // TODO do we need next line? resourceType is always 'Device' for now
        // if (resourceType !== 'Device') eventTypes = _.without(eventTypes, 'devices:Snapshot',
        // 'devices:Register')
        _.forEach(eventTypes, eventType => {
          $scope.$on('submitted@' + eventType, $scope.reloadDevices)
        })

        // As we touch config in the init, we add it to $scope at the end to avoid $watch
        // triggering multiple times
        $scope.config = config
      }
    }
  }
}

module.exports = resourceList

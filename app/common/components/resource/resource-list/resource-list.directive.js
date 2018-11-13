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
function resourceList (resourceListConfig, ResourceListGetter, ResourceListSelector, ResourceSettings, progressBar, ResourceBreadcrumb, session, UNIT_CODES, CONSTANTS, SearchService, $filter, $rootScope, Notification, LotsSelector) {
  const PATH = require('./__init__').PATH
  const selectionSummaryTemplateFolder = PATH + '/resource-list-selection-summary'
  return {
    template: require('./resource-list.directive.html'),
    restrict: 'E',
    scope: {
      // The parent resource. If it does not have @type, then we are the list of the main inventory view.
      parentResource: '=?'
    },
    link: {
      // Note that we load on 'pre' to initialize before our child (or inner) directives so they get real config values
      pre: ($scope, $element) => {
        $scope.Notification = Notification
        $scope.utils = require('./../../utils.js')
        $scope.session = session
        progressBar.start() // getterDevices.getResources will call this too, but doing it here we avoid delay
        const config = _.cloneDeep(resourceListConfig)
        $scope.devices = [] // Do never directly assign (r=[]) to 'devices' as modules depend of its reference

        $scope.lotsSelectionHiddenXS = true
        $scope.selectionPanelHiddenXS = true
        $scope.isAndroid = !!window.AndroidApp
        const lotsSelector = $scope.lotsSelector = LotsSelector

        $scope.selectLot = lot => {
          lotsSelector.selectOnly(lot)
        }

        // Set up getters and selectors for devices
        const getterDevices = new ResourceListGetter('Device', $scope.devices, config, progressBar, null)
        const deviceSelector = $scope.selector = ResourceListSelector
        $scope.gettingDevices = true
        getterDevices.callbackOnGetting(() => {
          $scope.gettingDevices = false
          deviceSelector.reselect($scope.devices)
          $scope.totalNumberOfDevices = getterDevices.getTotalNumberResources()
          $scope.moreDevicesAvailable = $scope.totalNumberOfDevices > $scope.devices.length
        })

        // Workaround: In root, parentResource is not set. This must be after initializing ResourceListGetter
        // TODO Delete workaround as soon as API returns root with label and _id set
        $scope.parentResource = $scope.parentResource || {
          _id: 'NoParent',
          '@type': 'Lot',
          label: 'Without lot'
        }

        // TODO call recalculateDevicesRow on screen size change. necessary for e.g. mobile portrait -> landscape
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
        $scope.toggleSelect = (resource, $index, $event) => {
          $event.stopPropagation() // Avoids the ng-click from the row (<tr>) to trigger
          if ($event.shiftKey) {
            let lastSelectedIndex = $scope.lastSelectedIndex || 0
            let start = Math.min(lastSelectedIndex, $index)
            let end = Math.max(lastSelectedIndex, $index)
            let devicesToSelect = $scope.devices.slice(start, end + 1)
            deviceSelector.selectAll(devicesToSelect)
          } else if ($event.ctrlKey) {
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
          $scope.lastSelectedIndex = $index
        }
        $scope.multiSelect = (resource) => {
          // detect touch screen
          // https://stackoverflow.com/questions/29747004/find-if-device-is-touch-screen-then-apply-touch-event-instead-of-click-event
          // https://hacks.mozilla.org/2013/04/detecting-touch-its-the-why-not-the-how/
          // links above do not work on Windows 10 due to: https://bugs.chromium.org/p/chromium/issues/detail?id=676808
          // TODO needs testing on different devices + OS
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
          $scope.lastSelectedIndex = 0
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
        // const where = {parent: $scope.resource._id, '@type': {'$in': ['GraphicCard', 'Processor']}}
        // deviceSettings.server.getList({where: where}).then(components => {
        //   $scope.graphicCard = _.find(components, {'@type': 'GraphicCard'})
        //   const cpu = _.find(components, {'@type': 'Processor'})
        //   if (cpu) {
        //     manufacturerSettings.server.findText(['label'], cpu.manufacturer.split(' ')[0], true, 1).then(manu => {
        //       if (manu.length) {
        //         $scope.processorManufacturer = manu[0]
        //       }
        //     })
        //   }
        // })

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

          // TODO maybe props object can be calculated automatically
          // function getFunctionMapper (prop) {
          //   const isString = typeof prop === 'string'
          //   const isNumber = typeof prop === 'number'
          //   const isArray = _.isArray(prop)
          //   const isBoolean = typeof prop === 'boolean'
          //   const isDate = prop instanceof Date
          //
          //   if (isNumber)
          //     return deviceSelector.getRangeOfPropertyOfSelected
          //   }
          //   return deviceSelector.getAggregatedPropertyOfSelected
          // }
          //
          // let props = {}
          // function traverseProps(props) {
          //   Object.keys(props, (k) => {
          //     let value = props[k]
          //     const isObject = typeof value === 'object'
          //     if (_.isNil(value) || isObject) {
          //
          //     }
          //   })
          // }
          if (selectedDevices.length === 0) {
            return
          }

          // aggregated properties of selected devices
          let props = {
            _id: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, '_id').map(t => t.value),
            '@type': deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, '@type'),
            type: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'type'),
            manufacturer: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'manufacturer'),
            model: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'model'),
            serialNumber: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'serialNumber'),
            hid: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'hid'),
            tags: deviceSelector.getAggregatedSetOfSelected(selectedDevices, 'tags').map(t => t.id),
            physical: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'physical'),
            trading: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'trading'),
            status: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'status'),
            working: deviceSelector.getAggregatedSetOfSelected(selectedDevices, 'working'),
            problems: deviceSelector.getAggregatedSetOfSelected(selectedDevices, 'problems'),
            condition: {
              appearance: {
                general: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'condition.appearance.general')
              },
              functionality: {
                general: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'condition.functionality.general')
              },
              general: {
                range: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'condition.general.range'),
                score: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'condition.general.score')
              },
              components: {
                hardDrives: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'condition.components.hardDrives'),
                hardDrivesRange: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'condition.components.hardDrivesRange'),
                ram: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'condition.components.ram'),
                ramRange: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'condition.components.ramRange'),
                processors: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'condition.components.processors'),
                processorsRange: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'condition.components.processorsRange')
              }
            },
            processorModel: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'processorModel'),
            totalHardDriveSize: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'totalHardDriveSize', { postfix: ' GB' }),
            totalRamSize: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'totalRamSize', { postfix: ' MB' }),
            graphicCardModel: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'graphicCardModel'),
            networkSpeedsEthernet: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'networkSpeedsEthernet', { postfix: ' Mbps (max)' }),
            networkSpeedsWifi: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'networkSpeedsWifi', { postfix: ' Mbps (max)' }),
            components: { // TODO
            },
            events: deviceSelector.getAggregatedSetOfSelected(selectedDevices, 'events', '_id'),
            lots: $scope.selection.lots,
            urls: selectedDevices.map(d => (new URL(d.url, CONSTANTS.url)).href)
          }
          $scope.currencyOptions.roles.forEach((roleName) => {
            let path = 'pricing.' + roleName + '.' + $scope.currencyOptions.val
            _.set(props,
              path + '.percentage',
              deviceSelector.getRangeOfPropertyOfSelected(selectedDevices, path + '.percentage', (percentage) => {
                return $filter('percentage')(percentage)
              })
            )
            _.set(props,
              path + '.amount',
              deviceSelector.getRangeOfPropertyOfSelected(selectedDevices, path + '.amount', $scope.currencyOptions.filter)
            )
          })
          let path = 'pricing.total.' + $scope.currencyOptions.val
          _.set(props,
            path,
            deviceSelector.getRangeOfPropertyOfSelected(selectedDevices, path, $scope.currencyOptions.filter)
          )
          $scope.selection.props = props

          // Used to determine which details pane (e.g. type, components, events, ...) to show
          $scope.selection.details = {}

          // Set summary for selection
          $scope.selection.summary = []
          const manufacturer = props.manufacturer.length > 0 ? (' ' + props.manufacturer[0].value) : ''
          const model = props.model.length ? (' ' + props.model[0].value) : ''
          let typeContentSummary

          if (props['@type'].length > 1) {
            typeContentSummary = 'Various types'
          } else if (props['@type'][0].length === 'Device') {
            typeContentSummary = 'Placeholder'
          } else if (props.type.length > 1) {
            typeContentSummary = props['@type'][0].value + ' Various subtypes'
          } else if (props.manufacturer.length > 1) {
            typeContentSummary = props.type[0].value + ' Various manufacturers'
          } else if (props.model.length > 1) {
            typeContentSummary = props.type[0].value + manufacturer + ' Various models'
          } else {
            typeContentSummary = props.type[0].value + manufacturer + model
          }
          // TODO if components values need to be formatted, do it here

          let statusSummary = 'Registered'
          if (props.physical.length > 0 && props.trading.length > 0) {
            statusSummary = $scope.utils.aggregateToString(props.trading, $scope.selection.multiSelection) + ' / ' + $scope.utils.aggregateToString(props.physical, $scope.selection.multiSelection)
          } else if (props.physical.length > 0 || props.trading.length > 0) {
            statusSummary = $scope.utils.aggregateToString(props.trading, $scope.selection.multiSelection) || $scope.utils.aggregateToString(props.physical, $scope.selection.multiSelection)
          }

          let componentsContentSummary = $scope.utils.aggregateToString(
            props.processorModel
              .concat(props.totalRamSize)
              .concat(props.totalHardDriveSize)
              .filter(c => !!c),
            $scope.selection.multiSelection)
          $scope.selection.summary = $scope.selection.summary.concat([
            {
              title: 'Type, manufacturer & model',
              contentSummary: typeContentSummary,
              cssClass: 'type',
              templateUrl: selectionSummaryTemplateFolder + '/type.html'
            },
            {
              title: 'Status',
              contentSummary: statusSummary,
              cssClass: 'status',
              templateUrl: selectionSummaryTemplateFolder + '/status.html'
            }
          ])
          if (_.get(props, 'problems').length > 0 || _.get(props, 'working').length > 0) {
            $scope.selection.summary.push({
              title: 'Issues',
              titleFa: 'fa-warning',
              contentSummary: props.problems.concat(props.working)
                .map(i => i.type + ': ' + (i.description || i.status))
                .join(', '),
              cssClass: 'issues',
              templateUrl: selectionSummaryTemplateFolder + '/issues.html'
            })
          }
          if (_.get(props, 'pricing.total.' + $scope.currencyOptions.val)) {
            $scope.selection.summary.push({
              title: 'Price',
              contentSummary: props.pricing.total[$scope.currencyOptions.val],
              cssClass: 'price',
              templateUrl: selectionSummaryTemplateFolder + '/price.html'
            })
          }
          if (_.get(props, 'condition.general.score') && _.get(props, 'condition.general.score').length > 0) {
            $scope.selection.summary.push({
              title: 'Appearance',
              contentSummaryTemplate: selectionSummaryTemplateFolder + '/appearance.html',
              cssClass: 'condition-score',
              templateUrl: selectionSummaryTemplateFolder + '/condition-score.html'
            })
          }
          $scope.selection.summary = $scope.selection.summary.concat([
            {
              title: 'Traceability log',
              contentSummary: props.events.length + ' events',
              cssClass: 'events',
              templateUrl: selectionSummaryTemplateFolder + '/events.html'
            },
            {
              title: 'Lots',
              contentSummary: props.lots.length + ' lots',
              cssClass: 'lots',
              templateUrl: selectionSummaryTemplateFolder + '/lots.html'
            }
          ])
          if (componentsContentSummary) {
            $scope.selection.summary.push({
              title: 'Components',
              contentSummaryTemplate: selectionSummaryTemplateFolder + '/components-summary.html',
              cssClass: 'components',
              templateUrl: selectionSummaryTemplateFolder + '/components.html'
            })
          }
        }
        deviceSelector.callbackOnSelection(updateDeviceSelection)
        updateDeviceSelection()

        $scope.showLots = () => {
          $scope.lotsSelectionHiddenXS = false
        }

        // Reloading
        // When a button succeeds in submitting info and the list needs to be reloaded in order to get the updates
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
        ResourceSettings('Device').types.forEach(type => { $scope.$on('submitted@' + type, $scope.reloadDevices) })

        // We register ourselves for any event type, excluding Snapshot if the list is not about devices
        let eventTypes = ResourceSettings('Event').subResourcesNames
        // TODO do we need next line? resourceType is always 'Device' for now
        // if (resourceType !== 'Device') eventTypes = _.without(eventTypes, 'devices:Snapshot', 'devices:Register')
        _.forEach(eventTypes, eventType => { $scope.$on('submitted@' + eventType, $scope.reloadDevices) })

        // As we touch config in the init, we add it to $scope at the end to avoid $watch triggering multiple times
        $scope.config = config
      }
    }
  }
}

module.exports = resourceList

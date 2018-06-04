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
function resourceList (resourceListConfig, ResourceListGetter, ResourceListSelector, ResourceSettings, progressBar, ResourceBreadcrumb, session, UNIT_CODES, CONSTANTS, SearchService) {
  const PATH = require('./__init__').PATH
  const NoMorePagesAvailableException = require('./no-more-pages-available.exception')
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
      pre: ($scope, element) => {
        console.log('scope', JSON.stringify($scope.resource), ', parent', JSON.stringify($scope.parentResource))

        $scope.utils = require('./../../utils.js')

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
        getterLots.updateSort('label')

        // Workaround: In root, parentResource is not set. This must be after initializing ResourceListGetter
        // TODO Delete workaround as soon as API returns root with label and _id set
        $scope.parentResource = $scope.parentResource || {
          _id: 'NoParent',
          '@type': 'Lot',
          label: 'Without lot'
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

        // Total number of devices
        $scope.getTotalNumberOfLots = () => {
          return getterLots.getTotalNumberResources()
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
        $scope.toggleSelect = (resource, $index, $event) => {
          // Avoids the ng-click from the row (<tr>) to trigger
          $event.stopPropagation()

          if ($event.shiftKey) {
            console.log('shift click')
            let lastSelectedIndex = $scope.lastSelectedIndex || 0
            let start = Math.min(lastSelectedIndex, $index)
            let end = Math.max(lastSelectedIndex, $index)
            let allSelected = $scope.devices.slice(start, end + 1)

            selector.selectAll(allSelected, $scope.parentResource)
          } else if ($event.ctrlKey) {
            selector.toggle(resource, $scope.parentResource)
          } else {
            let isSelected = selector.isSelected(resource)
            if (isSelected) {
              if ($scope.allSelectedDevices.length === 1) {
                selector.toggle(resource, $scope.parentResource) // remove
              } else {
                selector.deselectAll()
                selector.toggle(resource, $scope.parentResource) // add
              }
            } else {
              selector.deselectAll()
              selector.toggle(resource, $scope.parentResource)
            }
          }
          $scope.lastSelectedIndex = $index
        }

        $scope.deselectAll = (devices) => {
          $scope.selector.deselectAll(devices)
          $scope.lastSelectedIndex = 0
        }

        // mark all selected devices of current lot as originally selected TODO in the future parentResource will have to be set!
        $scope.parentResource && selector.markSelectedDevicesInLotAsOriginal($scope.parentResource)

        // Workaround to set labels of selected lots correctly. Necessary because API /devices doesn't include the 'label' property for device ancestors
        // TODO remove as soon as API returns ancestor lots with labels set
        $scope.parentResource && selector.nameLot($scope.parentResource)

        $scope.selectionDetailsShown = false
        $scope.selectionDetails = {}
        $scope.numSelectedLotsShown = 3 // TODO get from config
        $scope.showDisplayMoreSelectedLotsButton = true
        $scope.showMoreSelectedLots = () => {
          // $scope.numSelectedLotsShown += 5 // TODO get increment from config
          $scope.selectionDetails['Lots'] = true
        }
        // function setShowDisplayMoreSelectedLotsButton () {
        //   $scope.showDisplayMoreSelectedLotsButton = $scope.selectedLots.length > $scope.numSelectedLotsShown
        // }
        // setShowDisplayMoreSelectedLotsButton()

        // components, price and condition score (Must be above updateSelection)
        // const manufacturerSettings = ResourceSettings('Manufacturer')
        const deviceSettings = ResourceSettings('Device')
        $scope.currencyOptions = {
          currency: CONSTANTS.currency,
          val: 'standard',
          roles: ['retailer', 'platform', 'refurbisher']
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

        function updateSelection () {
          let allSelectedDevices = $scope.allSelectedDevices = selector.getAllSelectedDevices().slice()

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
              allSelectedDevices,
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

          let props = {
            type: selector.getAggregatedPropertyOfSelected(allSelectedDevices, '@type'),
            subType: selector.getAggregatedPropertyOfSelected(allSelectedDevices, 'type'),
            manufacturer: selector.getAggregatedPropertyOfSelected(allSelectedDevices, 'manufacturer'),
            model: selector.getAggregatedPropertyOfSelected(allSelectedDevices, 'model'),
            serialNumber: selector.getAggregatedPropertyOfSelected(allSelectedDevices, 'serialNumber', 'Various serial numbers'),
            hid: selector.getAggregatedPropertyOfSelected(allSelectedDevices, 'hid', 'Various hids'),
            status: selector.getAggregatedPropertyOfSelected(allSelectedDevices, 'status'),
            condition: {
              appearance: {
                general: selector.getRangeOfPropertyOfSelected(allSelectedDevices, 'condition.appearance.general')
              },
              functionality: {
                general: selector.getRangeOfPropertyOfSelected(allSelectedDevices, 'condition.functionality.general')
              },
              general: {
                range: selector.getAggregatedPropertyOfSelected(allSelectedDevices, 'condition.general.range')
              }
            },
            components: {
              processorModel: selector.getAggregatedPropertyOfSelected(allSelectedDevices, 'processorModel'),
              totalHardDriveSize: selector.getAggregatedPropertyOfSelected(allSelectedDevices, 'totalHardDriveSize', 'Various', ' GB HardDrive'),
              totalRamSize: selector.getAggregatedPropertyOfSelected(allSelectedDevices, 'totalRamSize', 'Various', ' MB RAM')
            },
            events: selector.getAggregatedSetOfSelected(allSelectedDevices, 'events', '_id'),
            lots: $scope.selectedLots
          }
          $scope.currencyOptions.roles.forEach((roleName) => {
            let path = 'pricing.' + roleName + '.' + $scope.currencyOptions.val
            _.set(props,
              path + '.percentage',
              selector.getAggregatedPropertyOfSelected(allSelectedDevices, path + '.percentage'))
            _.set(props,
              path + '.amount',
              selector.getAggregatedPropertyOfSelected(allSelectedDevices, path + '.amount'))
          })
          let path = 'pricing.total.' + $scope.currencyOptions.val
          _.set(props,
            path,
            selector.getAggregatedPropertyOfSelected(allSelectedDevices, path)
          )
          $scope.selection = { // TODO move all selectionProps to .selection
            props: props
          }

          // Update selection info
          $scope.showContent = {}
          let typeContentSummary
          if (props.type === selector.VARIOUS) {
            typeContentSummary = 'Various types'
          } else if (props.type === 'Device') {
            typeContentSummary = 'Placeholder'
          } else if (props.subType === selector.VARIOUS) {
            typeContentSummary = props.type + ' Various subtypes'
          } else if (props.manufacturer === selector.VARIOUS) {
            typeContentSummary = props.subType + ' Various manufacturers'
          } else if (props.model === selector.VARIOUS) {
            typeContentSummary = props.subType + ' ' + props.manufacturer + ' Various models'
          } else {
            typeContentSummary = props.subType + ' ' + props.manufacturer + ' ' + props.model
          }
          $scope.selectionSummary = [
            {
              title: 'Type, manufacturer & model',
              contentSummary: typeContentSummary,
              cssClass: 'type',
              templateUrl: selectionSummaryTemplateFolder + '/type.html'
            },
            {
              title: 'Status',
              contentSummary: props.status,
              cssClass: 'status',
              templateUrl: selectionSummaryTemplateFolder + '/status.html'
            },
            {
              title: 'Price',
              contentSummary: props.pricing.total.standard,
              cssClass: 'price',
              templateUrl: selectionSummaryTemplateFolder + '/price.html'
            },
            {
              title: 'Condition score',
              contentSummary: props.condition.general.range,
              cssClass: 'condition-score',
              templateUrl: selectionSummaryTemplateFolder + '/condition-score.html'
            },
            {
              title: 'Components',
              contentSummary: _.values(props.components).join(' '),
              cssClass: 'components',
              templateUrl: selectionSummaryTemplateFolder + '/components.html'
            },
            // {
            //   title: 'Providers',
            //   contentSummary: 'Donor:' + selector.getAggregatedPropertyOfSelected(allSelectedDevices, 'donor') || 'No donor' +
            //   'Owner:' + selector.getAggregatedPropertyOfSelected(allSelectedDevices, 'donor') || 'No owner' +
            //   'Distributor:' + selector.getAggregatedPropertyOfSelected(allSelectedDevices, 'distributor') || 'No distributor',
            //   content: 'Providers'
            // },
            {
              title: 'Events',
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
          $scope.deselectAll()
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
        $scope.getMoreLots = () => {
          console.log('getMore (lots) called.')
          if (!$scope.getMoreLotsIsBusy) {
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

        // Selection summary

        $scope.statusList = [
          {
            name: 'To prepare'
          },
          {
            name: 'Ready'
          },
          {
            name: 'Reserved'
          },
          {
            name: 'Sold'
          },
          {
            name: 'To dispose'
          },
          {
            name: 'Disposed'
          }
        ]

        // Events
        $scope.showDevicesOfEvent = (event) => {
          // ResourceBreadcrumb.goToRoot() TODO
          let searchParam = {
            key: 'event_id',
            name: 'Has event',
            // $$hashKey: 'object:7368',
            description: 'Match only devices that have a specific event.',
            placeholder: 'ID of event'
          }
          let value = event._id
          SearchService.addSearchParameter(searchParam, value)
        }

        // selection summary lots
        $scope.showLot = (lot) => {
          ResourceBreadcrumb.go(lot)
        }

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
          $scope.deselectAll()
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

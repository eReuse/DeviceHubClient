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
      pre: ($scope, element) => {
        $scope.utils = require('./../../utils.js')
        $scope.session = session
        progressBar.start() // getterDevices.getResources will call this too, but doing it here we avoid delay
        const config = _.cloneDeep(resourceListConfig)
        $scope.devices = [] // Do never directly assign (r=[]) to 'devices' as modules depend of its reference

        $scope.lotsSelectionHiddenXS = true
        $scope.selectionPanelHiddenXS = true
        $scope.isAndroid = !!window.AndroidApp
        const lotsSelector = $scope.lotsSelector = LotsSelector

        /**
         * Gets into the resource; traverse one step into the resource hierarchy by opening the resource in the
         * main window.
         * @param {Object} lot - Minimum properties are @type and _id
         */
        $scope.selectLot = lot => {
          lotsSelector.selectOnly(lot)
        }

        // Set up getters and selectors for devices
        const getterDevices = new ResourceListGetter('Device', $scope.devices, config, progressBar, null)
        const deviceSelector = $scope.selector = ResourceListSelector
        getterDevices.callbackOnGetting(() => {
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

        // Selected lots
        function updateLotSelection (selectedLots = []) {
          $scope.selectedLots = selectedLots
          if ($scope.selectedLots.length > 0) {
            $scope.selectedLotsText = $scope.selectedLots.map((l) => l.name).join(', ')
          } else {
            $scope.selectedLotsText = 'All lots'
          }
          const filter = selectedLots.length > 0 ? {
            lot: {
              id: selectedLots.map(l => l._id)
            }
          } : null
          getterDevices.updateFilters('LOTS', filter)
        }
        updateLotSelection([])
        lotsSelector.callbackOnSelection(updateLotSelection)

        $scope.reloadLots = () => {
          $rootScope.$broadcast('lots:reload')
        }

        // Selected events
        // TODO
        $scope.onEventsSelectionChanged = (selectedEvents) => {
          // update gettter filter/query
          $scope.selectedEvents = selectedEvents
          // if (selectedEvents.length > 0) {
          //   $scope.selectedLotsText = selectedEvents.map((l) => l.name).join(', ')
          // } else {
          //   $scope.selectedLotsText = 'All devices'
          // }
        }
        $scope.onEventsSelectionChanged([])

        // Sorting
        $scope.sort = {}
        $scope.setSort = _.bind(getterDevices.updateSort, getterDevices, _)

        // Search
        $scope.onSearchChanged = (query) => {
          getterDevices.updateSearchQuery(query)
        }

        // Filtering
        $scope.onSearchParamsChanged = newFilters => {
          getterDevices.updateFiltersFromSearch(newFilters)
        }

        $scope.removeFilter = propPath => {
          _.unset($scope.filtersModel, propPath)
          onFiltersChanged()
        }

        // $scope.openFilter = propPath => {
        //   // const filterPanel = _.find(filterPanelsFlat, { content: { propPathModel: propPath } })
        //   // $scope.showFilterPanels = true
        //   // filterPanel.shown = true
        // }

        $scope.hideFilterPanel = ($event, panel) => {
          $event && $event.preventDefault() // Prevents submitting the containing form
          panel.shown = false
        }

        $scope.hideAllFilterPanels = $event => {
          $event && $event.preventDefault()
          $scope.filterPanels && $scope.filterPanels.forEach((panel) => {
            $scope.hideFilterPanel(null, panel)
          })
          $scope.showFilterPanels = false
        }

        $scope.toggleDisplayFilterPanels = $event => {
          $event && $event.preventDefault()
          if ($scope.showFilterPanels) {
            $scope.hideAllFilterPanels()
          } else {
            $scope.showFilterPanels = true
          }
        }

        // TODO get events from config
        const allEvents = [ 'Ready', 'Repair', 'Allocate', 'Dispose', 'ToDispose', 'Sell', 'Receive', 'Register' ]

        const keyDevices = 'resources'
        const keyEvents = 'events'
        $scope.filtersModel = {
          [keyDevices]: {
            Computer: true,
            Monitor: true,
            _meta: {
              endpoint: true,
              prefix: 'Devices: '
            }
          }
          // [keyEvents]: {
          //   types: _.assign({
          //     _meta: {
          //       endpoint: true,
          //       prefix: 'Events: '
          //     }
          //   }, _.mapValues(_.keyBy(allEvents), () => true))
          // }
        }
        function onFiltersChanged () {
          $scope.hideAllFilterPanels()

          // create active filters list so they can be displayed
          $scope.activeFilters = []
          function addToActiveFiltersRecursive (parentPath, obj, parentPrefix) {
            parentPath = parentPath ? parentPath + '.' : ''
            parentPrefix = parentPrefix ? parentPrefix + ':' : ''
            _.toPairs(obj).map(pair => {
              const filterKey = pair[0]
              const fullPath = parentPath + filterKey
              let value = pair[1]
              const fullPrefix = parentPrefix + _.get(value, '_meta.prefix', '')

              const endPoint = value._meta && value._meta.endpoint

              if (!endPoint) {
                console.log('fullPath', fullPath, 'is an endpoint')
                return addToActiveFiltersRecursive(fullPath, value, fullPrefix)
              }

              const meta = value._meta
              let filterText = meta ? meta.prefix : ''
              let skipProcessingProps
              if (fullPath === (keyEvents + '.types')) {
                if (_.values(_.pickBy(value, (v) => { return v === true })).length === allEvents.length) {
                  filterText += 'All'
                  skipProcessingProps = true
                }
              }
              if (!skipProcessingProps) {
                _.forOwn(value, (prop, key) => {
                  if (key === '_meta') {
                    return
                  }
                  const isBoolean = typeof prop === 'boolean'
                  const isNumber = typeof prop === 'number'
                  const isText = typeof prop === 'string'
                  const isDate = prop instanceof Date

                  if (isBoolean) {
                    if (prop) {
                      filterText += key
                    }
                  } else {
                    filterText += key + ': '
                    if (isNumber) {
                      filterText += prop
                    } else if (isText) {
                      filterText += prop
                    } else if (isDate) {
                      filterText += prop.toDateString()
                    }
                  }
                  filterText += ' '
                })
              }

              $scope.activeFilters.push({
                propPath: fullPath,
                text: filterText
              })
            })
          }
          addToActiveFiltersRecursive('', $scope.filtersModel)

          // update filters
          getterDevices.updateFiltersFromSearch($scope.filtersModel)
        }
        onFiltersChanged()

        function onSubmitPanel () {
          if (!this.propPath) {
            throw new Error('propPath not defined: ' + this.propPath)
          }
          // TODO better determination of endpoint: search in filterPanels for occurence of propPath
          _.set($scope.filtersModel, this.propPath + '._meta.endpoint', true)

          // TODO prefix could be object with keys describing individual fields in case of multiple
          // e.g. prefix : { min : 'Minimum (GB): ', max : 'Maximum(GB): ' }
          if (this.prefix) {
            _.set($scope.filtersModel, this.propPath + '._meta.prefix', this.prefix)
          }
          onFiltersChanged()
        }

        // Default value can not be used, since they are not displayed
        let filterPanelsNested = [
          {
            childName: 'Root',
            panel: {
              title: 'Select a filter',
              children: [
                {
                  childName: 'Item type',
                  panel: {
                    title: 'Item type',
                    onSubmit: onSubmitPanel,
                    propPath: keyDevices,
                    prefix: 'Devices: ',
                    fields: [
                      {
                        key: keyDevices + '.components',
                        type: 'checkbox',
                        templateOptions: {
                          label: 'Components'
                        }
                      },
                      {
                        key: keyDevices + '.Computer',
                        type: 'checkbox',
                        templateOptions: {
                          label: 'Computer'
                        }
                      },
                      {
                        key: keyDevices + '.Monitor',
                        type: 'checkbox',
                        templateOptions: {
                          label: 'Monitor'
                        }
                      },
                      {
                        key: keyDevices + '.peripherals',
                        type: 'checkbox',
                        templateOptions: {
                          label: 'Peripherals'
                        }
                      }
                    ]
                  }
                },
                {
                  childName: 'Brand and model',
                  panel: {
                    title: 'Brand and model',
                    onSubmit: onSubmitPanel,
                    propPath: 'brandmodel',
                    fields: [
                      {
                        key: 'brandmodel.brand',
                        type: 'input',
                        templateOptions: {
                          label: 'Brand',
                          placeholder: 'Enter a brand'
                        }
                      },
                      {
                        key: 'brandmodel.model',
                        type: 'input',
                        templateOptions: {
                          label: 'Model',
                          placeholder: 'Enter a model'
                        }
                      }
                    ]
                  }
                },
                {
                  childName: 'Status',
                  panel: {}
                },
                {
                  childName: 'Price and rating',
                  panel: {
                    children: [
                      {
                        childName: 'Price',
                        panel: {
                          title: 'Price (€)',
                          onSubmit: onSubmitPanel,
                          propPath: 'price',
                          prefix: 'Price (€): ',
                          fields: [
                            {
                              key: 'price.min',
                              type: 'input',
                              // TODO need placeholder instead of defaultValue. defaultValue will be set in formly model as well, we don't want this to happen, since formly model properties will be displayed and sent to server. tried also initialValue, which doesn't work. formly placeholder does not exist
                              // defaultValue: 0,
                              templateOptions: {
                                type: 'number',
                                min: 0,
                                label: 'Min'
                              }
                            },
                            {
                              key: 'price.max',
                              type: 'input',
                              // TODO see above
                              // defaultValue: 999,
                              templateOptions: {
                                type: 'number',
                                min: 0,
                                label: 'Max'
                              }
                            }
                          ]
                        }
                      },
                      {
                        childName: 'Rating',
                        panel: {
                          title: 'Rating',
                          onSubmit: onSubmitPanel,
                          propPath: 'rating.rating',
                          prefix: 'Rating: ',
                          fields: [
                            {
                              key: 'rating.rating.min',
                              type: 'select',
                              templateOptions: {
                                label: 'Min',
                                options: [
                                  {name: 'Very low', value: 'Very low'},
                                  {name: 'Low', value: 'Low'},
                                  {name: 'Medium', value: 'Medium'},
                                  {name: 'High', value: 'High'},
                                  {name: 'Very high', value: 'Very high'}
                                ]
                              }
                            },
                            {
                              key: 'rating.rating.max',
                              type: 'select',
                              templateOptions: {
                                label: 'Max',
                                options: [
                                  {name: 'Very low', value: 'Very low'},
                                  {name: 'Low', value: 'Low'},
                                  {name: 'Medium', value: 'Medium'},
                                  {name: 'High', value: 'High'},
                                  {name: 'Very high', value: 'Very high'}
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  childName: 'Components',
                  panel: {
                    title: 'Components',
                    children: [
                      {
                        childName: 'Memory ram',
                        panel: {
                          title: 'Memory RAM (GB)',
                          onSubmit: onSubmitPanel,
                          prefix: 'RAM (GB): ',
                          propPath: 'components.ram',
                          fields: [
                            {
                              key: 'components.ram.min',
                              type: 'input',
                              templateOptions: {
                                type: 'number',
                                min: 0,
                                label: 'Min'
                              }
                            },
                            {
                              key: 'components.ram.max',
                              type: 'input',
                              // TODO see above
                              // defaultValue: 999,
                              templateOptions: {
                                type: 'number',
                                min: 0,
                                label: 'Max'
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  childName: 'Service providers',
                  panel: {}
                },
                {
                  childName: 'User and location',
                  panel: {}
                },
                {
                  childName: 'History and events',
                  panel: {
                    title: 'Events',
                    children: [
                      {
                        childName: 'Filter by event type',
                        panel: {
                          title: 'Filter by event type',
                          onSubmit: onSubmitPanel,
                          propPath: keyEvents + '.types',
                          prefix: 'Events: ',
                          fields: allEvents.map((eventName) => {
                            return {
                              key: keyEvents + '.types.' + eventName,
                              type: 'checkbox',
                              templateOptions: {
                                label: eventName
                              }
                            }
                          })
                        }
                      },
                      {
                        childName: 'Filter by single event details',
                        panel: {
                          title: 'Select event type',
                          children: [
                            {
                              childName: 'Register',
                              panel: {
                                title: 'Register',
                                onSubmit: onSubmitPanel,
                                propPath: keyEvents + '.single.register',
                                prefix: 'Register: ',
                                fields: [
                                  {
                                    key: keyEvents + '.single.register' + '.from',
                                    type: 'datepicker',
                                    templateOptions: {
                                      label: 'From'
                                    }
                                  },
                                  {
                                    key: keyEvents + '.single.register' + '.to',
                                    type: 'datepicker',
                                    templateOptions: {
                                      label: 'To'
                                    }
                                  },
                                  {
                                    key: keyEvents + '.single.register' + '.name',
                                    type: 'input',
                                    templateOptions: {
                                      label: 'Name'
                                    }
                                  }
                                ]
                              }
                            },
                            {
                              childName: 'To repair',
                              panel: {}
                            },
                            {
                              childName: 'Ready to sell',
                              panel: {}
                            },
                            {
                              childName: 'Sell',
                              panel: {}
                            },
                            {
                              childName: 'Receive',
                              panel: {}
                            },
                            {
                              childName: 'Recycle',
                              panel: {}
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  childName: 'Licenses and restrictions',
                  panel: {}
                }
              ]
            }
          }
        ]
        function getPanelsRecursive (nested, flat) {
          nested.forEach((fp) => {
            flat.push(fp.panel)
            if (fp.panel.children && fp.panel.children.length > 0) {
              getPanelsRecursive(fp.panel.children, flat)
            }
          })
        }
        let filterPanelsFlat = []
        getPanelsRecursive(filterPanelsNested, filterPanelsFlat)
        $scope.filterPanelsRoot = filterPanelsNested[0].panel
        $scope.filterPanels = filterPanelsFlat
        $scope.showFilterPanels = false

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

          // aggregated properties of selected devices
          let props = {
            _id: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, '_id'),
            type: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, '@type'),
            subType: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'type'),
            manufacturer: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'manufacturer'),
            model: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'model'),
            serialNumber: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'serialNumber', 'Various serial numbers'),
            hid: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'hid', 'Various hids'),
            status: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'status'),
            condition: {
              appearance: {
                general: deviceSelector.getRangeOfPropertyOfSelected(selectedDevices, 'condition.appearance.general')
              },
              functionality: {
                general: deviceSelector.getRangeOfPropertyOfSelected(selectedDevices, 'condition.functionality.general')
              },
              general: {
                range: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'condition.general.range')
              }
            },
            components: {
              processorModel: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'processorModel'),
              totalHardDriveSize: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'totalHardDriveSize', 'Various', ' GB HardDrive'),
              totalRamSize: deviceSelector.getAggregatedPropertyOfSelected(selectedDevices, 'totalRamSize', 'Various', ' MB RAM')
            },
            events: deviceSelector.getAggregatedSetOfSelected(selectedDevices, 'events', '_id'),
            lots: $scope.selection.lots
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
          const manufacturer = props.manufacturer ? (' ' + props.manufacturer) : ''
          const model = props.model ? (' ' + props.model) : ''
          let typeContentSummary
          if (props.type === deviceSelector.VARIOUS) {
            typeContentSummary = 'Various types'
          } else if (props.type === 'Device') {
            typeContentSummary = 'Placeholder'
          } else if (props.subType === deviceSelector.VARIOUS) {
            typeContentSummary = props.type + ' Various subtypes'
          } else if (props.manufacturer === deviceSelector.VARIOUS) {
            typeContentSummary = props.subType + ' Various manufacturers'
          } else if (props.model === deviceSelector.VARIOUS) {
            typeContentSummary = props.subType + manufacturer + ' Various models'
          } else {
            typeContentSummary = props.subType + manufacturer + model
          }
          // TODO if components values need to be formatted, due it here
          const componentsContentSummary = _.values(props.components).filter(c => !!c).join(', ')
          $scope.selection.summary = $scope.selection.summary.concat([
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
            }
          ])
          if (_.get(props, 'pricing.total.' + $scope.currencyOptions.val)) {
            $scope.selection.summary.push({
              title: 'Price',
              contentSummary: props.pricing.total[$scope.currencyOptions.val],
              cssClass: 'price',
              templateUrl: selectionSummaryTemplateFolder + '/price.html'
            })
          }
          if (_.get(props, 'condition.general.range') ||
            _.get(props, 'condition.functionality.range') ||
            _.get(props, 'condition.appearance.range')) {
            $scope.selection.summary.push({
              title: 'Condition score',
              contentSummary: _.get(props, 'condition.general.range')
                ? _.get(props, 'condition.general.range')
                : _.get(props, 'condition.functionality.range')
                  ? 'Functionality: ' + _.get(props, 'condition.functionality.range')
                  : 'Appearance: ' + _.get(props, 'condition.appearance.range'),
              cssClass: 'condition-score',
              templateUrl: selectionSummaryTemplateFolder + '/condition-score.html'
            })
          }
          if (componentsContentSummary) {
            $scope.selection.summary.push({
              title: 'Components',
              contentSummary: componentsContentSummary,
              cssClass: 'components',
              templateUrl: selectionSummaryTemplateFolder + '/components.html'
            })
          }
          $scope.selection.summary = $scope.selection.summary.concat([
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
          ])
        }
        deviceSelector.callbackOnSelection(updateDeviceSelection)
        updateDeviceSelection()

        // Reloading
        // When a button succeeds in submitting info and the list needs to be reloaded in order to get the updates
        $scope.reloadDevices = () => {
          getterDevices.getResources()
        }

        // Pagination Devices
        // Let's avoid the user pressing multiple times the 'load more'
        $scope.getMoreIsBusy = false
        let getMoreFirstTime = false
        $scope.getMore = () => {
          if (!$scope.getMoreIsBusy && getMoreFirstTime) {
            $scope.getMoreIsBusy = true
            getterDevices.getResources(true, false).finally(() => {
              $scope.getMoreIsBusy = false
            })
          }
          getMoreFirstTime = true
        }

         // If we don't want to collision with tables of subResources we
        // need to do this when declaring the directive
        // TODO need this?
        const $table = element.find('.fill-height-bar')
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
          $rootScope.$broadcast('updateSearchQuery', id)

          $scope.$apply()
        })

        // QR and NFC
        $scope.scanQR = () => {
          window.AndroidApp.scanBarcode('tagScanDoneSearch')
        }

        $scope.scanNFC = () => {
          window.AndroidApp.startNFC('tagScanDoneSearch')
          $scope.$on('$destroy', () => {
            window.AndroidApp.stopNFC()
          })
          Notification.success('NFC activated')
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

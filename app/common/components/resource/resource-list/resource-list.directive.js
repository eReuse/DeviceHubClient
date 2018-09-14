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
function resourceList (resourceListConfig, ResourceListGetter, ResourceListSelector, ResourceSettings, progressBar, ResourceBreadcrumb, session, UNIT_CODES, CONSTANTS, SearchService, $filter, $rootScope) {
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
        $scope.lots = []

        $scope.selectionPanelHiddenXS = true

        /**
         * Gets into the resource; traverse one step into the resource hierarchy by opening the resource in the
         * main window.
         * @param {Object} lot - Minimum properties are @type and _id
         */
        $scope.goTo = lot => {
          ResourceBreadcrumb.go(lot)
        }

        // Set up getters and selectors for devices
        const defaultFilters = ($scope.parentResource && $scope.parentResource._id)
          ? { 'dh$insideLot': $scope.parentResource._id } // TODO dh$insideLot returns devices that are in specified lot OR any sublot of specified lot
          : null
        const getterDevices = new ResourceListGetter('Device', $scope.devices, config, progressBar, _.cloneDeep(defaultFilters))
        const selector = $scope.selector = ResourceListSelector
        getterDevices.callbackOnGetting((resources, lotID) => {
          selector.reAddToLot(resources, lotID)
          $scope.totalNumberOfDevices = getterDevices.getTotalNumberResources()
          $scope.moreDevicesAvailable = $scope.totalNumberOfDevices > $scope.devices.length
        })

        // Set up getters for lots TODO comment in for lots to work
        // const getterLots = new ResourceListGetter('Lot', $scope.lots, config, progressBar, _.cloneDeep(defaultFilters))
        // getterLots.updateSort('label')
        // getterLots.callbackOnGetting(() => {
        //   $scope.totalNumberOfLots = getterLots.getTotalNumberResources()
        //   $scope.moreLotsAvailable = $scope.totalNumberOfLots > $scope.lots.length
        // })

        // Workaround: In root, parentResource is not set. This must be after initializing ResourceListGetter
        // TODO Delete workaround as soon as API returns root with label and _id set
        $scope.parentResource = $scope.parentResource || {
          _id: 'NoParent',
          '@type': 'Lot',
          label: 'Without lot'
        }

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
          // TODO comment in for lots to work
          // getterLots.updateFiltersFromSearch(newFilters) // TODO update lots on filter update?
        }

        $scope.removeFilter = propPath => {
          _.unset(filtersModel, propPath)
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

        const keyTypes = 'types-to-show'
        const nonComponents = [
          'Desktop', 'Laptop', 'All-in-one', 'Monitor', 'Peripherals'
        ]
        // set initial filters
        let filtersModel = $scope.filtersModel = {
          [keyTypes]: [ 'Placeholders' ].concat(nonComponents)
        }
        function onFiltersChanged () {
          $scope.hideAllFilterPanels()

          $scope.activeFilters = []
          function addToActiveFilters (parentPath, obj) {
            parentPath = parentPath ? parentPath + '.' : ''
            _.toPairs(obj).map(pair => {
              const filterKey = pair[0]
              const fullPath = parentPath + filterKey
              let value = pair[1]
              const isSelect = _.isArray(value)
              const isRange = value.min || value.max
              const isText = typeof value === 'string'

              if (!(isSelect || isRange || isText)) {
                value.isNested = true
                return addToActiveFilters(fullPath, value)
              }

              let filterText = _.get(value, '_meta.prefix', '')
              if (isSelect) {
                if (filterKey === keyTypes && _.difference(nonComponents, value).length === 0) {
                  value = _.difference(value, nonComponents)
                  value.push('Non-Components')
                }
                filterText += value.join(', ')
              } else if (isRange) {
                if (!_.isNil(value.min)) filterText += 'from ' + value.min + ' '
                if (!_.isNil(value.max)) filterText += 'to ' + value.max

                if (_.get(value, '_meta.unit')) filterText += value._meta.unit
              } else if (isText) {
                filterText += filterKey + ': ' + value
              }
              $scope.activeFilters.push({
                propPath: fullPath,
                text: filterText
              })
            })
          }
          addToActiveFilters('', filtersModel)
          getterDevices.updateFiltersFromSearch(filtersModel)
        }
        onFiltersChanged()

        function onSubmitPanel () {
          if (!this.propPath) {
            throw new Error('propPath not defined: ' + this.propPath)
          }
          if (this.unit) {
            _.set(filtersModel, this.propPath + '._meta.unit', ' ' + this.unit)
          }
          if (this.prefix) {
            _.set(filtersModel, this.propPath + '._meta.prefix', this.prefix)
          }
          onFiltersChanged()
        }
        // function onSubmitRange () {
        //   _.set(filtersModel, this.propPathModel + '.range', [ this.model.min, this.model.max ])
        //
        //   // set meta for active filter text
        //   // TODO maybe this should not go to model but to a different meta object
        //   _.set(filtersModel, this.propPathModel + '._meta.unit', this.unit)
        //   _.set(filtersModel, this.propPathModel + '._meta.prefix', this.prefix)
        //
        //   onFiltersChanged()
        // }
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
                    propPath: keyTypes,
                    fields: [
                      {
                        key: keyTypes,
                        type: 'multiCheckbox',
                        className: 'multi-check',
                        templateOptions: {
                          required: false,
                          options: [
                            {
                              'name': 'Placeholders',
                              'value': 'Placeholders'
                            },
                            {
                              'name': 'Components',
                              'value': 'Components'
                            },
                            /* TODO make category non-components
                            {
                              'name': 'Non-components',
                              'value': 'Non-components'
                            },
                            */
                            {
                              'name': 'Desktop',
                              'value': 'Desktop'
                            },
                            {
                              'name': 'Laptop',
                              'value': 'Laptop'
                            },
                            {
                              'name': 'All-in-one',
                              'value': 'All-in-one'
                            },
                            {
                              'name': 'Monitor',
                              'value': 'Monitor'
                            },
                            {
                              'name': 'Peripherals',
                              'value': 'Peripherals'
                            }
                          ]
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
                    propPath: 'brand',
                    fields: [
                      {
                        key: 'brand',
                        type: 'input',
                        templateOptions: {
                          label: 'Brand',
                          placeholder: 'Enter a brand'
                        }
                      },
                      {
                        key: 'model',
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
                          title: 'Price',
                          onSubmit: onSubmitPanel,
                          propPath: 'price',
                          prefix: 'Price: ',
                          unit: '€',
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
                          title: 'Memory RAM',
                          onSubmit: onSubmitPanel,
                          unit: 'GB',
                          prefix: 'RAM: ',
                          fields: [
                            {
                              key: 'components.ram.min',
                              type: 'input'
                            },
                            {
                              key: 'components.ram.max',
                              type: 'input'
                            }
                          ]
                        }
                      },
                      {
                        childName: 'Grafic card',
                        panel: {
                          title: 'Grafic card',
                          content: [
                            {
                              multiSelect: [
                                'Placeholders',
                                'Components',
                                'Desktop',
                                'Laptop',
                                'All-in-one',
                                'Monitor',
                                'Peripherals'
                              ]
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
                  panel: {}
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
            selector.selectAll(devicesToSelect, $scope.parentResource)
          } else if ($event.ctrlKey) {
            selector.toggle(resource, $scope.parentResource)
          } else if ($scope.selectingMultiple) {
            selector.toggle(resource, $scope.parentResource)
            if ($scope.selection.devices.length === 0) {
              $scope.selectingMultiple = false
            }
          } else { // normal click
            let isSelected = selector.isSelected(resource)
            if (isSelected) {
              if ($scope.selection.devices.length === 1) {
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
        $scope.multiSelect = (resource) => {
          // detect touch screen
          // https://stackoverflow.com/questions/29747004/find-if-device-is-touch-screen-then-apply-touch-event-instead-of-click-event
          // https://hacks.mozilla.org/2013/04/detecting-touch-its-the-why-not-the-how/
          // links above do not work on Windows 10 due to: https://bugs.chromium.org/p/chromium/issues/detail?id=676808
          // TODO needs testing on different devices + OS
          let supportsTouch = (!!window.ontouchstart) || navigator.msMaxTouchPoints
          if (supportsTouch) {
            return
          }

          $scope.selectingMultiple = true

          // change to multi-select (changes normal click/touch behaviour)
          let isSelected = selector.isSelected(resource)
          if (!isSelected) {
            selector.toggle(resource, $scope.parentResource)
          }
        }

        $scope.deselectAll = (devices) => {
          $scope.selector.deselectAll(devices)
          $scope.lastSelectedIndex = 0
          $scope.selectionPanelHiddenXS = true
        }

        // Workaround to set labels of selected lots correctly. Necessary because API /devices doesn't include the 'label' property for device ancestors
        // TODO remove as soon as API returns ancestor lots with labels set
        $scope.parentResource && selector.nameLot($scope.parentResource)

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

        function updateSelection () {
          $scope.selection = $scope.selection || {}

          let selectedDevices = $scope.selection.devices = selector.getAllSelectedDevices().slice()
          $scope.selection.multiSelection = $scope.selection.devices.length > 1
          $scope.selection.lots = selector.getLots().slice()

          // mark current lot
          let currentLot = _.find($scope.selection.lots, { _id: $scope.parentResource._id })
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
            type: selector.getAggregatedPropertyOfSelected(selectedDevices, '@type'),
            subType: selector.getAggregatedPropertyOfSelected(selectedDevices, 'type'),
            manufacturer: selector.getAggregatedPropertyOfSelected(selectedDevices, 'manufacturer'),
            model: selector.getAggregatedPropertyOfSelected(selectedDevices, 'model'),
            serialNumber: selector.getAggregatedPropertyOfSelected(selectedDevices, 'serialNumber', 'Various serial numbers'),
            hid: selector.getAggregatedPropertyOfSelected(selectedDevices, 'hid', 'Various hids'),
            status: selector.getAggregatedPropertyOfSelected(selectedDevices, 'status'),
            condition: {
              appearance: {
                general: selector.getRangeOfPropertyOfSelected(selectedDevices, 'condition.appearance.general')
              },
              functionality: {
                general: selector.getRangeOfPropertyOfSelected(selectedDevices, 'condition.functionality.general')
              },
              general: {
                range: selector.getAggregatedPropertyOfSelected(selectedDevices, 'condition.general.range')
              }
            },
            components: {
              processorModel: selector.getAggregatedPropertyOfSelected(selectedDevices, 'processorModel'),
              totalHardDriveSize: selector.getAggregatedPropertyOfSelected(selectedDevices, 'totalHardDriveSize', 'Various', ' GB HardDrive'),
              totalRamSize: selector.getAggregatedPropertyOfSelected(selectedDevices, 'totalRamSize', 'Various', ' MB RAM')
            },
            events: selector.getAggregatedSetOfSelected(selectedDevices, 'events', '_id'),
            lots: $scope.selection.lots
          }
          $scope.currencyOptions.roles.forEach((roleName) => {
            let path = 'pricing.' + roleName + '.' + $scope.currencyOptions.val
            _.set(props,
              path + '.percentage',
              selector.getRangeOfPropertyOfSelected(selectedDevices, path + '.percentage', (percentage) => {
                return $filter('percentage')(percentage)
              })
            )
            _.set(props,
              path + '.amount',
              selector.getRangeOfPropertyOfSelected(selectedDevices, path + '.amount', $scope.currencyOptions.filter)
            )
          })
          let path = 'pricing.total.' + $scope.currencyOptions.val
          _.set(props,
            path,
            selector.getRangeOfPropertyOfSelected(selectedDevices, path, $scope.currencyOptions.filter)
          )
          $scope.selection.props = props

          $rootScope.$on('newID', (event) => {
            console.log('event', event, 'has been broadcasted')
          })

          // Used to determine which details pane (e.g. type, components, events, ...) to show
          $scope.selection.details = {}

          // Set summary for selection
          $scope.selection.summary = []
          const manufacturer = props.manufacturer ? (' ' + props.manufacturer) : ''
          const model = props.model ? (' ' + props.model) : ''
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
            },
            {
              title: 'Price',
              contentSummary: props.pricing.total[$scope.currencyOptions.val],
              cssClass: 'price',
              templateUrl: selectionSummaryTemplateFolder + '/price.html'
            },
            {
              title: 'Condition score',
              contentSummary: props.condition.general.range,
              cssClass: 'condition-score',
              templateUrl: selectionSummaryTemplateFolder + '/condition-score.html'
            }
          ])
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
            } /*,
            {
              title: 'Lots',
              contentSummary: props.lots.length + ' lots',
              cssClass: 'lots',
              templateUrl: selectionSummaryTemplateFolder + '/lots.html'
            } */
          ])
        }
        selector.callbackOnSelection(updateSelection)
        updateSelection()

        // Reloading
        // When a button succeeds in submitting info and the list needs to be reloaded in order to get the updates
        $scope.reload = () => {
          getterDevices.getResources()
          $scope.deselectAll()
        }
        // TODO need this?
        function hardReload () {
          $scope.deselectAll()
          $scope.reload()
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

        // Pagination lots
        // Let's avoid the user pressing multiple times the 'load more'
        // TODO comment in for lots to work
        // $scope.getMoreLotsIsBusy = false
        // $scope.morePagesAvailableLots = true
        // $scope.getMoreLots = () => {
        //   if (!$scope.getMoreLotsIsBusy) {
        //     $scope.getMoreLotsIsBusy = true
        //     try {
        //       getterLots.getResources(true, false).finally(() => {
        //         $scope.getMoreLotsIsBusy = false
        //       })
        //     } catch (err) {
        //       $scope.getMoreLotsIsBusy = false
        //       if (!(err instanceof NoMorePagesAvailableException)) throw err
        //       $scope.morePagesAvailableLots = false
        //     }
        //   }
        // }
        // OR more like this?
        // $scope.getMoreLotsIsBusy = false
        // $scope.getMoreLots = () => {
        //   if (!$scope.getMoreLotsIsBusy) {
        //     $scope.getMoreLotsIsBusy = true
        //     getterLots.getResources(true, false).finally(() => {
        //       $scope.getMoreLotsIsBusy = false
        //     })
        //   }
        // }

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

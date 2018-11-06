
function resourceListFilters (Notification, $uibModal) {
  return {
    template: require('./resource-list-filters.directive.html'),
    restrict: 'E',
    scope: false,
    link: function ($scope) {
      $scope.removeFilter = propPath => {
        _.unset($scope.filtersModel, propPath)
        onFiltersChanged()
      }

      $scope.openImportModal = () => {
        const modal = $uibModal.open({
          template: require('./import-filters.modal.controller.html'),
          controller: 'importFiltersModalCtrl'
        })
        modal.result.then((filtersModelStr) => {
          console.log('modal closed', filtersModelStr)
          $scope.filtersModel = JSON.parse(filtersModelStr)
          onFiltersChanged()
        })
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

      $scope.addFilter = (propPath, filter) => {
        switch (propPath) {
          case '@type':
            propPath = keyTypes
            break
          case 'type':
            propPath = keyTypes
            break
        }

        _.set($scope.filtersModel, propPath + '.' + filter, true) // TODO set value depending on filterPanel
        onFiltersChanged()
      }

      $scope.filtersExported = (error) => {
        if (error) {
          Notification.error('Filters could not be copied')
        } else {
          Notification.success('Filters copied to clipboard')
        }
      }

      // TODO get events from config
      const allEvents = [ 'Ready', 'Repair', 'Allocate', 'Dispose', 'ToDispose', 'Sell', 'Receive', 'Register' ]

      const keyTypes = 'resources'
      const keyEvents = 'events'
      $scope.filtersModel = {
        [keyTypes]: {
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
        $scope.filtersModelStr = JSON.stringify($scope.filtersModel)
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

            const filterPanel = _.find($scope.filterPanels, { propPath: fullPath })
            const fullPrefix = parentPrefix + _.get(filterPanel, 'prefix', '')
            const endPoint = !!filterPanel

            if (!endPoint) {
              return addToActiveFiltersRecursive(fullPath, value, fullPrefix)
            }

            _.set(value, '_meta.endpoint', true) // TODO setting endpoint is necessary for resource-getter only

            let filterText = fullPrefix
            let skipProcessingProps
            if (fullPath === (keyEvents + '.types')) {
              if (_.values(_.pickBy(value, (v) => { return v === true })).length === allEvents.length) {
                filterText += 'All'
                skipProcessingProps = true
              }
            }
            if (!skipProcessingProps) {
              let propsString = []
              _.forOwn(value, (prop, key) => {
                if (key === '_meta') {
                  return
                }
                const isBoolean = typeof prop === 'boolean'
                const isNumber = typeof prop === 'number'
                const isText = typeof prop === 'string'
                const isDate = prop instanceof Date

                let propStr = ''
                if (isBoolean) {
                  if (prop) {
                    propStr += key
                  }
                } else {
                  propStr += key + ': '
                  if (isNumber) {
                    propStr += prop
                  } else if (isText) {
                    propStr += prop
                  } else if (isDate) {
                    propStr += prop.toDateString()
                  }
                }
                propsString.push(propStr)
              })
              filterText += propsString.join(', ')
            }

            $scope.activeFilters.push({
              propPath: fullPath,
              text: filterText
            })
          })
        }
        addToActiveFiltersRecursive('', $scope.filtersModel)

        // update filters
        $scope.updateFiltersFromSearch($scope.filtersModel)
      }

      function onSubmitPanel () {
        if (!this.propPath) {
          throw new Error('propPath not defined: ' + this.propPath)
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
                  propPath: keyTypes,
                  prefix: 'Devices: ',
                  fields: [
                    {
                      key: keyTypes + '.components',
                      type: 'checkbox',
                      templateOptions: {
                        label: 'Components'
                      }
                    },
                    {
                      key: keyTypes + '.Computer',
                      type: 'checkbox',
                      templateOptions: {
                        label: 'Computer'
                      }
                    },
                    {
                      key: keyTypes + '.Monitor',
                      type: 'checkbox',
                      templateOptions: {
                        label: 'Monitor'
                      }
                    },
                    {
                      key: keyTypes + '.peripherals',
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
                  title: 'Traceability log',
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

      onFiltersChanged()
    }
  }
}

module.exports = resourceListFilters

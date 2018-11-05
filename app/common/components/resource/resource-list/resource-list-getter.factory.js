function ResourceListGetterFactory (ResourceSettings) {
  const SEARCH = 'search'
  // const utils = require('./../../utils.js')
  // const NoMorePagesAvailableException = require('./no-more-pages-available.exception')

  // Missing properties in device, added here to stub those properties
  // TODO Provide missing properties by service and finally remove this stub
  const devicePropertiesStub = {
    donor: 'BCN Ayuntamiento',
    owner: 'Solidança',
    distributor: 'Donalo'
  }

  class ResourceListGetter {
    /**
     * Creates a resourceListGetter for a specific resourceType.
     *
     * Note: A limitation of resourceListGetter is that needs a default sort.
     * @param {string} resourceType - The resource type where to get new resources. //TODO Deprecated
     * @param {array} resources - An array of resource objects to update when new resources are got. This array is
     * updated by reference, so do not re-assign it.
     * @param {object} filterSettings - Configuration object for the filters.
     * @param {progressBar} progressBar - An instance of ngProgress.
     * @param {defaultFilters} defaultFilters - Filters that will be applied to any request
     */
    constructor (resourceType, resources, filterSettings, progressBar, defaultFilters, format) {
      this.resourceType = resourceType
      this.resources = resources
      this.filterSettings = filterSettings
      this.server = ResourceSettings(resourceType).server
      this.progressBar = progressBar
      this.defaultFilters = defaultFilters
      this._format = format
      /**
       * A key/value object of filters, where every key represents a different source.
       * Clients can update their filter, and all of them are merged into
       * one, *_filters*. Filters of resource-search have preference and they are the last
       * one merged. Use updateFilters.
       * @type {{}}
       * @private
       */
      this._filtersBySource = {}

      // All resource lists have a sort and a search. In init time, sort and search initializes the sort and filters
      // object, maybe with defaults, maybe not. To avoid double querying (once for sort, once for search), we
      // wait until _filters and _sort are both initialized, i.e. not null.
      /**
       * Filter object, containing a *filterName: filterValue* object, result of merging. If `null` then means
       * it has not been initialized.
       * _filtersBySource.
       * @type {object|null}
       * @private
       */
      this._filters = null
      /**
       * Primitive object containing the sort parameters. If `null` then means that has not been initialized.
       * @type {object|null}
       * @private
       */
      this._sort = null

      this.pagination = {
        morePagesAvailable: true,
        pagesAvailable: null,
        totalResources: null,
        pageNumber: 1
      }

      this.totalNumberResources = 0

      this._callbacksOnGetting = []
    }

    /**
     * Updates the filters with the new given filters, and get new resources if needed.
     * @param {string} source - An identifier for the origin of the filters
     * @param {object} newFilters - Key/value of parameters
     */
    updateFilters (source, newFilters) {
      this._filtersBySource[source] = newFilters
      // Let's merge the different filters in a single one
      this._filters = {}
      _.merge(this._filters, ..._.values(this._filtersBySource))
      // The 'search' filters have preference over others
      _.merge(this._filters, this._filtersBySource[SEARCH])
      // The default filters have preference over others
      _.merge(this._filters, this.defaultFilters)
      // todo if this is called multiple times for the same parameters use isEqual and firstTime combo
      if (!_.isNull(this._filters) && !_.isNull(this._sort)) this.getResources()
    }

    updateSearchQuery (newQuery) {
      this._query = newQuery
      this.getResources()
    }

    /**
     * updateFilters for source: search
     *
     * Filters of search come encoded and are not suitable for the query. This method adapts them and adds them
     * to all the filters.
     * @param {object} newFilters
     */
    updateFiltersFromSearch (newFilters) {
      newFilters = _.cloneDeep(newFilters)
      let mappedFilters = {}

      function mapFilterToServer (filters, parentKey) {
        // map filter prop names to server prop names
        _.forOwn(filters, function (value, key) {
          let fullPath = parentKey ? parentKey + '.' + key : key
          if (!_.get(value, '_meta.endpoint')) {
            return mapFilterToServer(value, fullPath)
          }

          value = _.omit(value, '_meta')

          // range mapping
          if (value.min || value.max) {
            value = [ value.min, value.max ]
          }

          // field specific mappings
          switch (fullPath) {
            case 'resources':
              fullPath = 'type'
              value = Object.keys(_.pickBy(value, x => x))
              break
            case 'brand':
              fullPath = 'manufacturer'
              break
            case 'rating.rating':
              value = value.map((v) => {
                switch (v) {
                  case 'Very low':
                    return 1
                  case 'Low':
                    return 2
                  case 'Medium':
                    return 3
                  case 'High':
                    return 4
                  case 'Very high':
                    return 5
                }
              })
              break
          }
          _.set(mappedFilters, fullPath, value)
        })
      }

      mapFilterToServer(newFilters)

      this.updateFilters(SEARCH, mappedFilters)
    }

    /**
     * Similar than *updateFilters* but for sorting params.
     * @param newSorts
     */
    updateSort (newSorts) {
      this._sort = newSorts

      if (!_.isNull(this._sort)) this.getResources()
    }

    /**
     * Obtains a new batch of resources from the server, updating the 'resources' array.
     *
     * You do not usually need to call this method, as it is automatically done by the other 'update' methods.
     *
     * @param {boolean} getNextPage - Shall we get the next page? If *false* then the first page is returned.
     * @param {boolean} showProgressBar - Should the progress bar be shown?
     * @return {promise} The Restangular promise.
     */
    getResources (getNextPage = false, showProgressBar = true) {
      if (getNextPage && !this.pagination.morePagesAvailable) {
        throw new Error('Tried to get more resources but there are no more pages available')
      }
      if (showProgressBar) this.progressBar.start()
      // Only 'Load more' adds pages, so if not getNextPage equals a new search from page 1
      this.pagination.pageNumber = getNextPage ? this.pagination.pageNumber + 1 : 1
      const q = {
        filter: this._filters,
        search: this._query
      }
      if (this._format) {
        q.format = this._format
      }
      //
      // const q = {
      //   where: this._filters,
      //   page: this.pagination.pageNumber,
      //   sort: this._sort,
      //   max_results: this.resourceType === 'Device'
      //     ? ($(window).height() < 800 ? 20 : 30)
      //     : 15
      // }

      return this.server.getList(q).then(this._processResources.bind(this, getNextPage, showProgressBar))
    }

    _processResources (getNextPage, showProgressBar, resources) {
      if (showProgressBar) this.progressBar.complete()
      if (!getNextPage) this.resources.length = 0
      if (this.resourceType === 'Device') {
        resources.forEach(r => {
          const components = ['Motherboard', 'RamModule', 'SoundCard', 'GraphicCard', 'OpticalDrive', 'HardDrive', 'Processor', 'NetworkAdapter']
          const isComponent = components.indexOf(r['type']) !== -1
          const computers = ['Desktop', 'Laptop']
          const isComputer = computers.indexOf(r['type']) !== -1
          const isPlaceholder = r['@type'] === 'Device'

          let parentLots = r.lots

          if (parentLots.length === 0) {
            parentLots.push({
              _id: 'NoParent',
              '@type': 'Lot',
              name: 'Without lot'
            })
          }

          let title
          if (isPlaceholder) {
            title = 'Placeholder'
          } else {
            if (isComponent) {
              _.assign(r, {
                '@type': 'Component'
              })
            } else if (isComputer) {
              _.assign(r, {
                '@type': 'Computer'
              })
            } else {
              _.assign(r, {
                '@type': 'Peripheral'
              })
            }
            const manufacturer = r.manufacturer ? (' ' + r.manufacturer) : ''
            const model = r.model ? (' ' + r.model) : ''
            title = manufacturer + model
          }

          // sort events by creation date
          r.events.sort((a, b) => {
            return (new Date(b.created)).getTime() - (new Date(a.created)).getTime()
          })

          // and map to client props
          r.events && r.events.forEach((e) => {
            _.defaults(e, {
              '@type': 'devices:' + e.type,
              '_id': e.id
            })
          })

          // map rating
          if (r.price) {
            const price = r.price
            r.pricing = {
              'refurbisher': price.refurbisher,
              'retailer': price.retailer,
              'platform': price.platform,
              'total': {
                'standard': price.price
              }
            }
          }

          // map rating
          if (r.rate) {
            const rate = r.rate
            r.condition = {
              'scoringSoftware': {
                'version': rate.software,
                'label': rate.version
              },
              'appearance': {
                'score': rate.appearance,
                'general': rate.appearanceRange
              },
              'functionality': {
                'score': rate.functionality,
                'general': rate.functionalityRange
              },
              'components': {
                'hardDrives': rate.data_storage,
                'hardDrivesRange': rate.dataStorageRange,
                'ram': rate.ram,
                'ramRange': rate.ramRange,
                'processors': rate.processor,
                'processorsRange': rate.processorRange
              },
              'general': {
                'score': rate.rating,
                'range': rate.ratingRange
              }
            }
          }

          // map components
          r.totalRamSize = r.ramSize
          r.totalHardDriveSize = _.isFinite(parseInt(r.dataStorageSize))
            ? Math.round(r.dataStorageSize / 1024)
            : r.dataStorageSize
          r.networkSpeedsEthernet = r.networkSpeeds && r.networkSpeeds.length && r.networkSpeeds[0]
          r.networkSpeedsWifi = r.networkSpeeds && (r.networkSpeeds.length > 1) && r.networkSpeeds[1]
          const existsValue = 'Yes' // TODO move to config (see utils.aggregateEntryToString)
          if (r.networkSpeedsWifi === 0) {
            r.networkSpeedsWifi = existsValue
          }

          // map status
          let status = 'Registered'
          if (r.physical && r.trading) {
            status = r.trading + ' / ' + r.physical
          } else if (r.physical || r.trading) {
            status = r.trading || r.physical
          }

          _.defaults(r, devicePropertiesStub)
          _.assign(r, {
            title: title,
            status: status,
            parentLots: parentLots
          })
        })

        this._updateResourcesAfterGet(getNextPage, resources)
      } else if (this.resourceType === 'Lot') {
        resources.forEach(lot => {
          function assignTypeRec (lot) {
            _.assign(lot, {
              '@type': 'Lot'
            })
            lot.nodes && lot.nodes.length && lot.nodes.forEach((node) => {
              assignTypeRec(node)
            })
          }
          assignTypeRec(lot)
        })
        this._updateResourcesAfterGet(getNextPage, resources)
      }

      return resources
    }

    _updateResourcesAfterGet (getNextPage, resources) {
      _.assign(this.resources, this.resources.concat(resources))
      this.totalNumberResources = (resources._meta && resources._meta.total) || 0 // TODO sometimes total number is not returned
      this.pagination.morePagesAvailable = resources._meta && resources._meta.page * resources._meta.max_results < resources._meta.total
      this.pagination.totalResources = resources._meta && resources._meta.total
      // broadcast to callbacks
      _.invokeMap(this._callbacksOnGetting, _.call, null, this.resources, this.lotID, this.resourceType, this.pagination, getNextPage)
    }

    getTotalNumberResources () {
      return this.totalNumberResources || 0
    }

    /**
     * Calls the method back every time the instance of resourceListGetter gets resources from server.
     *
     * The signature is as follows: callback(resources, resourceType, pagination)
     * @param callback
     */
    callbackOnGetting (callback) {
      this._callbacksOnGetting.push(callback)
    }
  }

  return ResourceListGetter
}

module.exports = ResourceListGetterFactory

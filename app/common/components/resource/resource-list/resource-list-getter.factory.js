function ResourceListGetterFactory (ResourceSettings, resources) {
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
     * @param {string} resourceType - The resource type where to get new resources. //TODO
     *   Deprecated
     * @param {array} models - An array of resource objects to update when new resources are got.
     *   This array is updated by reference, so do not re-assign it.
     * @param {object} filterSettings - Configuration object for the filters.
     * @param {progressBar} progressBar - An instance of ngProgress.
     * @param {defaultFilters} defaultFilters - Filters that will be applied to any request
     */
    constructor (resourceType, models, filterSettings, progressBar, defaultFilters, format) {
      this.resourceType = resourceType
      this.resources = models
      this.filterSettings = filterSettings
      this.Model = resources.resourceClass(resourceType)
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

      // All resource lists have a sort and a search. In init time, sort and search initializes
      // the sort and filters object, maybe with defaults, maybe not. To avoid double querying
      // (once for sort, once for search), we wait until _filters and _sort are both initialized,
      // i.e. not null.
      /**
       * Filter object, containing a *filterName: filterValue* object, result of merging. If
       * `null` then means it has not been initialized.
       * _filtersBySource.
       * @type {object|null}
       * @private
       */
      this._filters = null
      /**
       * Primitive object containing the sort parameters. If `null` then means that has not been
       * initialized.
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
      // todo if this is called multiple times for the same parameters use isEqual and firstTime
      // combo
      if (!_.isNull(this._filters) && !_.isNull(this._sort)) this.getResources()
    }

    updateSearchQuery (newQuery) {
      this._query = newQuery
      this.getResources()
    }

    /**
     * updateFilters for source: search
     *
     * Filters of search come encoded and are not suitable for the query. This method adapts them
     * and adds them to all the filters.
     * @param {object} newFilters
     */
    updateFiltersFromSearch (newFilters, checkIfEndpoint) {
      newFilters = _.cloneDeep(newFilters)
      let mappedFilters = {}

      function mapFilterToServer (filters, parentKey) {
        // map filter prop names to server prop names
        _.forOwn(filters, function (value, key) {
          let fullPath = parentKey ? parentKey + '.' + key : key
          const isEndpoint = checkIfEndpoint(value, fullPath)
          if (!isEndpoint) {
            return mapFilterToServer(value, fullPath)
          }

          value = _.omit(value, '_meta')

          // range mapping
          if (value.min || value.max) {
            value = [value.min, value.max]
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
     * You do not usually need to call this method, as it is automatically done by the other
     * 'update' methods.
     *
     * @param {boolean} getNextPage - Shall we get the next page? If *false* then the first page
     *   is returned.
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
      const q = { // todo from old format to new
        filter: this._filters,
        search: this._query
      }
      if (this._format) {
        q.format = this._format
      }
      return this.Model.server.getList(q).then(
        models => this._processResources(getNextPage, showProgressBar, models)
      )
    }

    _processResources (getNextPage, showProgressBar, models) {
      if (showProgressBar) this.progressBar.complete()
      if (!getNextPage) this.resources.length = 0
      if (this.resourceType === 'Lot') {
        models.forEach(lot => {
          function assignTypeRec (lot) {
            _.assign(lot, {
              '@type': 'Lot',
              'description': lot.description || 'Enter a description, rules, comments, restrictions etc. for this lot'
            })
            lot.nodes && lot.nodes.length && lot.nodes.forEach((node) => {
              assignTypeRec(node)
            })
          }

          assignTypeRec(lot)
        })
      }
      this._updateResourcesAfterGet(getNextPage, models)
      return models
    }

    _updateResourcesAfterGet (getNextPage, resources) {
      _.assign(this.resources, this.resources.concat(resources))
      this.totalNumberResources = (resources._meta && resources._meta.total) || 0 // TODO
                                                                                  // sometimes
                                                                                  // total number
                                                                                  // is not
                                                                                  // returned
      this.pagination.morePagesAvailable = resources._meta && resources._meta.page * resources._meta.max_results < resources._meta.total
      this.pagination.totalResources = resources._meta && resources._meta.total
      // broadcast to callbacks
      _.invokeMap(this._callbacksOnGetting, _.call, null, this.resources, this.lotID, this.resourceType, this.pagination, getNextPage)
    }

    getTotalNumberResources () {
      return this.totalNumberResources || 0
    }

    /**
     * Calls the method back every time the instance of resourceListGetter gets resources from
     * server.
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

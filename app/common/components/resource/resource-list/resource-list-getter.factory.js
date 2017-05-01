function ResourceListGetterFactory (ResourceSettings) {
  const SEARCH = 'search'
  let utils = require('./../../utils.js')
  class ResourceListGetter {
    /**
     * Creates a resourceListGetter for a specific resourceType.
     *
     * Note: A limitation of resourceListGetter is that needs a default sort.
     * @param {string} resourceType - The resource type where to get new resources.
     * @param {array} resources - An array of resource objects to update when new resources are got. This array is
     * updated by reference, so do not re-assign it.
     * @param {object} filterSettings - Configuration object for the filters.
     * @param {progressBar} progressBar - An instance of ngProgress.
     */
    constructor (resourceType, resources, filterSettings, progressBar) {
      this.resourceType = resourceType
      this.resources = resources
      this.filterSettings = filterSettings
      this.server = ResourceSettings(resourceType).server
      this.progressBar = progressBar
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
        totalPages: null,
        pageNumber: 0
      }

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
      _.merge.call(_, this._filters, ..._.values(this._filtersBySource))
      // The 'search' filters have preference over others
      _.merge(this._filters, this._filtersBySource[SEARCH])
      // todo if this is called multiple times for the same parameters use isEqual and firstTime combo
      if (!_.isNull(this._filters) && !_.isNull(this._sort)) this.getResources()
    }

    /**
     * updateFilters for source: search
     *
     * Filters of search come encoded and are not suitable for the query. This method adapts them and adds them
     * to all the filters.
     * @param {object} newFilters
     */
    updateFiltersFromSearch (newFilters) {
      let _filters = {}
      let callbacks = []
      let findSettings = _.bind(_.find, null, this.filterSettings.search.params, _)
      _.forOwn(_.cloneDeep(newFilters), (value, key) => {
        let settings = findSettings({key: key})
        if (!settings) {
          throw TypeError(`The filter with Key ${key} has no configuration parameter`)
        }
        if ('callback' in settings) {
          // Save the callbacks to execute them at the end, passing the resulting filters array and the value
          callbacks.push(_.bind(settings.callback, null, _filters, value))
        } else {
          if ('date' in settings) value = utils.parseDate(value)
          if ('boolean' in settings) value = value === 'Yes' || value === 'Succeed'
          if ('comparison' in settings) {
            if (_.isFunction(settings.comparison)) { // function comparisons are easier callbacks
              value = settings.comparison(value, ResourceSettings)
            } else {
              switch (settings.comparison) { // Case '=' is itself so no need to do anything
                case '<=':
                  value = {$lte: value}
                  break
                case '>=':
                  value = {$gte: value}
                  break
                case 'in':
                  value = {$in: _.isArray(value) ? value : [value]}
                  break
                case 'nin':
                  value = {$nin: _.isArray(value) ? value : [value]}
              }
            }
          } else {
            // We perform equality, and we could make it faster by using ^ at the beggining of the word
            value = {$regex: value, $options: 'ix'}
          }
          _filters[key] = value
        }
      })
      // Values from filters with a different 'key' than the filter sent to the server are moved
      // or merged with the 'real key'. This needs to be done after modifying the array above.
      _.forOwn(_filters, function (value, key) {
        let settings = findSettings({key: key})
        if ('realKey' in settings) {
          if (!_filters[settings['realKey']]) {
            _filters[settings['realKey']] = value
          } else {
            _.merge(_filters[settings['realKey']], value)
          }
          delete _filters[key]
        }
      })

      _.invokeMap(callbacks, _.call)

      this.updateFilters(SEARCH, _filters)
    }

    /**
     * Similar than *updateFilters* but for sorting params.
     * @param newSorts
     */
    updateSort (newSorts) {
      let oldSort = _.clone(this._sort)
      this._sort = newSorts
      // If there is no sort defined this._filters will equal with oldsort
      if (!_.isEqual(this._filters, oldSort) && !_.isNull(this._filters)) this.getResources()
    }

    /**
     * Obtains a new batch of resources from the server, updating the 'resources' array.
     *
     * You do not usually need to call this method, as it is automatically done by the other 'update' methods.
     *
     * @param {boolean} getNextPage - Shall we get the next page? If *false* then the first page is returned.
     * @return {promise} The Restangular promise.
     */
    getResources (getNextPage = false) {
      this.progressBar.start()
      if (getNextPage && !this.pagination.morePagesAvailable) throw TypeError('There are not more pages available.')
      let self = this
      // Only 'Load more' adds pages, so if not getNextPage equals a new search from page 0
      let page = this.pagination.pageNumber = getNextPage ? this.pagination.pageNumber + 1 : 0
      return this.server.getList({where: this._filters, page: page, sort: this._sort}).then((resources) => {
        self.progressBar.complete()
        if (!getNextPage) self.resources.length = 0
        _.assign(self.resources, self.resources.concat(resources))
        self.pagination.morePagesAvailable = resources._meta.page * resources._meta.max_results < resources._meta.total
        self.pagination.totalPages = resources._meta.total
        // broadcast to callbacks
        _.invokeMap(this._callbacksOnGetting, _.call, null, self.resources, self.resourceType, self.pagination)
      })
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













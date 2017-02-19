function ResourceListGetterFactory (ResourceSettings) {
  const SEARCH = 'search'
  let utils = require('./../../utils.js')
  class ResourceListGetter {
    /**
     * Creates a resourceListGetter for a specific resourceType.
     * @param {string} resourceType - The resource type where to get new resources.
     * @param {array} resources - An array of resource objects to update when new resources are got. This array is
     * updated by reference, so do not re-assign it.
     * @param {object} filterSettings - Configuration object for the filters.
     */
    constructor (resourceType, resources, filterSettings) {
      this.resourceType = resourceType
      this.resources = resources
      this.filterSettings = filterSettings
      this.server = ResourceSettings(resourceType).server
      /**
       * A key/value object of filters, where every key represents a different source.
       * Clients can update their filter, and all of them are merged into
       * one, *_filters*. Filters of resource-search have preference and they are the last
       * one merged. Use updateFilters.
       * @type {{}}
       * @private
       */
      this._filtersBySource = {}
      /**
       * Filter object, containing a *filterName: filterValue* object, result of merging
       * _filtersBySource.
       * @type {{}}
       * @private
       */
      this._filters = {}
      /**
       * Primitive object containing the sort parameters.
       * @type {{}}
       * @private
       */
      this._sort = {}

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
      let oldFilters = _.clone(this._filters)
      // Let's merge the different filters in a single one
      _.merge.apply(_, [this._filters].concat(_.values(this._filtersBySource)))
      // The 'search' filters have preference over others
      _.merge(this._filters, this._filtersBySource[SEARCH])
      if (!_.isEqual(this._filters, oldFilters)) this.getResources()
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
      let findSettings = _.bind(_.find, null, this.filterSettings.search.params, _)
      _.forOwn(newFilters, (value, key) => {
        let settings = findSettings({key: key})
        if (!settings) throw TypeError(`The filter with Key ${key} has no configuration parameter`)
        let result
        if ('date' in settings) result = utils.parseDate(value)
        if ('boolean' in settings) result = value === 'Yes' || value === 'Succeed'
        if ('comparison' in settings) {
          switch (settings.comparison) {
            case '<=':
              result = {$lte: value}
              break
            case '>=':
              result = {$gte: value}
              break
            case '=':
              result = value
              break
            case 'in':
              result = {$in: _.isArray(value) ? value : [value]}
              break
            case 'nin':
              result = {$nin: _.isArray(value) ? value : [value]}
          }
        } else {
          // We perform equality, and we could make it faster by using ^ at the beggining of the word
          result = {$regex: value, $options: 'ix'}
        }
        _filters[key] = result
      })
      // We may modify the array and need the full 'where'
      _.forOwn(_filters, function (value, key) { // todo is it safe to modify keys in the foreach?
        let settings = findSettings({key: key})
        if ('realKey' in settings) {
          _.merge(_filters[settings['realKey']], value)
          delete _filters[key]
        }
      })
      this.updateFilters(SEARCH, _filters)
    }

    /**
     * Similar than *updateFilters* but for sorting params.
     * @param newSorts
     */
    updateSort (newSorts) {
      let oldSort = _.clone(this._sort)
      this._sort = newSorts
      if (!_.isEqual(this._filters, oldSort)) this.getResources()
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
      if (getNextPage && !this.pagination.morePagesAvailable) throw TypeError('There are not more pages available.')
      let self = this
      // Only 'Load more' adds pages, so if not getNextPage equals a new search from page 0
      let page = this.pagination.pageNumber = getNextPage ? this.pagination.pageNumber + 1 : 0
      return this.server.getList({where: this._filters, page: page, sort: this._sort}).then((resources) => {
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













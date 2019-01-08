/**
 * @module deviceGetter
 */

/**
 * @param resources
 * @param progressBar
 * @return {DeviceGetter}
 */
function deviceGetterFactory (resources, progressBar) {

  /**
   * @memberOf module:deviceGetter
   */
  class DeviceGetter {
    constructor () {
      /**
       * @type {module:resources.ResourceList}
       */
      this.devices = new resources.ResourceList()
      this.q = {
        /** @type {object.<string, object>} */
        filter: null, // null only when not initialized
        /** @type {string} */
        search: '',
        /** @type {object.<string, boolean>} */
        sort: null, // null only when not initialized
        /**
         * The page requested or null.
         * @type {?number}
         */
        page: null
      }
      /**
       * Is the getter on the process of getting new devices?
       * @type {boolean}
       */
      this.working = false
    }

    /**
     * Return the next page or null if no available.
     * @return {?number}
     */
    get nextPage () {
      return this.devices.pagination.next
    }

    /** Are the initial filters / sort being set already? */
    get ready () {
      return this.q.filter != null && this.q.sort != null
    }

    /** Override the filters and, if ready, get new devices. */
    setFilters (filters) {
      this.q.filter = filters
      if (this.ready) this.get(false)
    }

    /** Set a filter and, if ready, get new devices. */
    setFilter (key, value) {
      this.q.filter = this.q.filter || {}
      this.q.filter[key] = value
      if (this.ready) this.get(false)
    }

    /**
     * Set the search text and, if ready, get new devices.
     * @param {string} text - Search text.
     * */
    setSearch (text) {
      console.assert(_.isString(text))
      this.q.search = text
      if (this.ready) this.get(false)
    }

    /**
     * Override the sort and, if ready, get new devices.
     * @param {string} key
     * @param {boolean} order
     */
    setSort (key, order) {
      console.assert(_.isBoolean(order), 'Order must be boolean, not %s', order)
      this.q.sort = {[key]: order}
      this.get()
    }

    /**
     * Reload the devices.
     * @param showProgressBar
     * @return {*}
     */
    reload (showProgressBar = true) {
      return this.get(false, showProgressBar)
    }

    /**
     * Get new devices.
     *
     * This starts a new petition for more devices,
     * independently if there was another one before.
     *
     * @param {boolean} getNextPage - Fetch the next page.
     * @param {boolean} showProgressBar - Should we show the
     * progress bar?
     * @throws {NoMorePagesAvailable} - If `getNextPage`
     * but not next pages to get from.
     * @return {$q}
     */
    get (getNextPage = true, showProgressBar = true, query = {}) {
      console.assert(this.ready, 'Getter is not yet ready to get devices.')
      if (getNextPage) {
        if (!this.nextPage) throw new NoMorePagesAvailable()
        else this.q.page = this.nextPage
      }
      if (!getNextPage) this.q.page = 1
      if (showProgressBar) progressBar.start()
      this.working = true
      return resources.Device.server.getList(_.defaults(query, this.q)).then(devices => {
        progressBar.complete()
        if (getNextPage) this.devices.add(devices)
        else this.devices.set(devices)
        return this.devices
      }).finally(() => {
        this.working = false
      })
    }

    /**
     * Get devices only if there are more pages and there is
     * not an already existing petition.
     * @return {?$q}
     */
    gentlyGet (getNextPage, showProgressBar) {
      if (!this.working && this.nextPage) return this.get(getNextPage, showProgressBar)
    }

    /**
     * Creates a new getter with the config of the passed-in one.
     * @param {module:deviceGetter.DeviceGetter} getter
     * @return {module:deviceGetter.DeviceGetter}
     */
    static fromDeviceGetter (getter) {
      const n = new this()
      n.q = getter.q
      return n
    }
  }

  /**
   * @memberOf module:deviceGetter
   * @extends Error
   */
  class NoMorePagesAvailable extends Error {
  }

  return {
    DeviceGetter: DeviceGetter,
    NoMorePagesAvailable: NoMorePagesAvailable
  }
}

module.exports = deviceGetterFactory

function ResourceSelectorFactory () {
  /**
   * Manages selecting resources in the resource-list.
   *
   * The user can select them through a checkbox in every row and through a 'select all on this list' / 'unselect all'
   * button at the end of the table.
   *
   * There is the concept of *actual list* and *total*. The actual list is formed by the list of resources the user
   * sees. However, as the user filters the list, resources appear and disappear. Those resources that
   * the user selected and disappeared are still being held in a *total* array, and if through the filters
   * those resources appear again, the user will see them selected.
   */
  class ResourceListSelector {
    /**
     *
     * @param {object} selector - A selector object with the ng-models of the checkboxes
     *  - 'checked': the ng-model for the 'selectAll' checkbox
     *  - 'checkboxes': an array of ng-models for the individual resource select checkboxes where the '_id' is the key.
     * @param {array} resources - The array that will hold the resources
     * @param {ResourceListGetter} resourceListGetter - An instance of ResourceListGetter
     */
    constructor (selector, resources, resourceListGetter) {
      this.selector = selector
      this.resources = resources

      /**
       * Array holding the resources that are selected in the actual list.
       * @type {Array}
       */
      this.inList = selector.inList = []
      /**
       * Resources selected through all lists.
       * @type {Array}
       */
      this.total = []
      resourceListGetter.callbackOnGetting(_.bind(this.reAddToActualList, this, _))
      this.callbacksForSelections = []
    }

    /**
     * Toggles the checkbox where the resource is in, selecting (or deselecting) the device(s)
     * accordingly. It can be multiple devices if *shift* is pressed.
     *
     * @param {object} resource - The resource to select/deselect
     * @param {$event} $event - JQuery's/JQLite event object
     * @param {number} $index - The index of the resource in the *resources* list.
     */
    toggle (resource, $event, $index) {
      if (this.isInList(resource)) { // Remove
        this.remove(resource)
      } else { // Add
        if ($event.shiftKey) { // Add multiple
          let foundPreviousSelectedOne = false
          // Selects all resources until finds a previously selected resources or reaches the beginning
          for (let i = $index - 1; i >= 0 && !foundPreviousSelectedOne; i--) {
            foundPreviousSelectedOne = !this.add(this.resources[i])
          }
        } else {  // Add one
          this.add(resource)
        }
      }
      $event.stopPropagation()
    }

    /**
     * Toggles the checkbox that lets selecting all resources on the list or unselect all resources, in general.
     * @param selectAll
     */
    toggleSelectAll (selectAll) {
      let self = this
      if (selectAll) {
        _.forEach(this.resources, (resource) => { self.add(resource) }) // We cannot bind as add() can return 'false'
      } else {
        this.inList.length = 0
        this.total.length = 0
        this.selector.checkboxes = {}
        this._control()
      }
    }

    /**
     * Re-populate the actual list of resources with the passed-in resources.
     *
     * This method is used after getting new resources, as some resources may have been
     * selected in other lists (they are in the total list).
     * @param resources
     */
    reAddToActualList (resources) {
      // We re-populate inList from the actual resources that are in total
      let self = this
      this.inList.length = 0
      this._control()
      this.selector.checkboxes = {} // todo is ok with ng-model?
      _.forEach(resources, function (resource) {
        if (_.find(self.total, {_id: resource._id})) {
          self.add(resource, true) // 2nd parameter -> We add it only to inList
        }
      })
    }

    /**
     * Returns true if the resource is in the *actual* list.
     * @param {object} resource
     * @returns {boolean}
     */
    isInList (resource) {
      return _.find(this.inList, {_id: resource._id})
    }

    /**
     * Adds a resource to the actual list and to the total, if it was not there before.
     * @param {object} resource - The resource to add
     * @param {boolean} inListOnly - True for not adding it to the total list
     * @return {boolean} True if a *new* resource has been added to the list
     */
    add (resource, inListOnly = false) {
      if (!this.isInList(resource)) {
        this.inList.push(resource)
        if (!inListOnly) this.total.push(resource)
        this.selector.checkboxes[resource['_id']] = true
        this._control()
        return true
      } else {
        return false
      }
    }

    /**
     * Removes a resources from the actual and total lists, if it was there.
     * @param resource
     */
    remove (resource) {
      _.remove(this.inList, {'_id': resource['_id']})
      _.remove(this.total, {'_id': resource['_id']})
      this.selector.checkboxes[resource['_id']] = false
      this._control()
    }

    /**
     * Performs common tasks after adding/removing resources on both lists.
     * @private
     */
    _control () {
      this.selector.checked = this.inList.length === this.resources.length
      _.invokeMap(this.callbacksForSelections, _.call, null, this.total, this.inList, this.resources)
    }

    callbackOnSelection (callback) {
      this.callbacksForSelections.push(callback)
    }

  }
  return ResourceListSelector
}

module.exports = ResourceSelectorFactory

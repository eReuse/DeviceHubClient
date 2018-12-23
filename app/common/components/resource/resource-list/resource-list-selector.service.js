function resourceListSelectorFactory () {
  /**
   * Manages selecting resources in the resource-list.
   *
   * The user can select them through a checkbox in every row and through a 'select all on this
   * list' / 'unselect all' button at the end of the table.
   *
   * There is the concept of *actual list* and *total*. The actual list is formed by the list of
   * resources the user sees. However, as the user filters the list, resources appear and
   * disappear. Those resources that the user selected and disappeared are still being held in a
   * *total* array, and if through the filters those resources appear again, the user will see
   * them selected.
   */
  class ResourceListSelector {
    constructor () {
      this.callbacksForSelections = []
      /** @type {Object.<integer, module:resources.Device>} */
      this.selected = {}
    }

    /**
     * Toggles the selected state of given resource, selecting (or deselecting) the device(s)
     * accordingly. It can be multiple devices if *shift* is pressed.
     *
     * @param {object} resource - The resource to select/deselect
     */
    toggle (resource) {
      if (this.isSelected(resource)) { // Remove
        this.remove(resource)
      } else { // Add
        this.add(resource)
      }
      this._control()
    }

    /**
     * Selects all given resources
     * @param resources
     */
    selectAll (resources) {
      _.forEach(resources, resource => {
        this.add(resource)
      })
      this._control()
    }

    /**
     * Deselects all given devices
     */
    deselectAll (devices) {
      this._deselectAll(devices)
      this._control()
    }

    _deselectAll (devices) {
      if (!devices || !devices.slice) {
        this.selected = {}
        return
      }

      devices = devices.slice() // given devices might be the same array we remove devices from
      devices.forEach(device => {
        this.remove(device)
      })
    }

    /**
     * Returns true if the resource is selected, i.e. is in one of the lots
     * @param {object} resource
     * @returns {boolean}
     */
    isSelected (resource) {
      return !!this.selected[resource.id]
    }

    /**
     * @param {object} resource - The resource to add
     */
    add (resource) {
      this.selected[resource.id] = resource
    }

    /**
     * @param resource
     */
    remove (resource) {
      this.selected[resource.id] = null
      delete this.selected[resource.id]
    }

    callbackOnSelection (callback) {
      this.callbacksForSelections.push(callback)
    }

    getAllSelectedDevices () {
      return Object.values(this.selected)
    }

    /**
     * Returns non empty lots. Lots in which devices where selected have lower indexes
     */
    getLots () {
      let lots = {}
      this.getAllSelectedDevices().forEach((device) => {
        device.lots.forEach((lot) => {
          if (!lots[lot.id]) {
            lots[lot.id] = _.defaults({}, lot, {selectedDevices: []})
          }
          lots[lot.id].selectedDevices.push(device)
        })
      })
      return Object.values(lots)
    }

    reselect (devices) {
      let selectedList = devices.filter((device) => {
        return this.selected[device.id]
      })
      this.selected = _.keyBy(selectedList, 'id')
      this._control()
    }

    /**
     * Performs common tasks after adding/removing resources on both lists.
     * @private
     */
    _control () {
      _.invokeMap(this.callbacksForSelections, _.call, null, this.getAllSelectedDevices())
    }
  }

  return ResourceListSelector
}

module.exports = resourceListSelectorFactory

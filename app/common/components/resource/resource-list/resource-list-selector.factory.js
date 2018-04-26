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
    constructor (_resources) {
      let resources = _resources
      let callbacksForSelections = []
      let lots = {}

      /**
       * Toggles the selected state of given resource, selecting (or deselecting) the device(s)
       * accordingly. It can be multiple devices if *shift* is pressed.
       *
       * @param {object} resource - The resource to select/deselect
       */
      this.toggle = resource => {
        if (this.isSelected(resource)) { // Remove
          this.remove(resource)
        } else { // Add
          console.log('Adding resource', resource)
          this.add(resource)
        }
      }

      /**
       * Selects all given resources
       * @param resources
       */
      this.selectAll = resources => {
        _.forEach(resources, resource => {
          this.add(resource)
        })
      }

      /**
       * Deselects all devices
       */
      this.deselectAll = () => {
        this.getLotsAsList().forEach(lot => {
          lot.selectedDevices.length = 0
        })
        _control()
      }

      /**
       * Re-populate the actual list of resources with the passed-in resources.
       *
       * This method is used after getting new resources, as some resources may have been
       * selected in other lists (they are in the total list).
       * @param resources
       * TODO refactor to use lots
       */
      this.reAddToLot = (resources, lotID) => {
        console.log('repopulating lot', lotID, 'with', resources.length, 'resources')
        // We re-populate inList from the actual resources that are in total
        lots[lotID] && (lots[lotID].length = 0)
        _control()

        // TODO refactor for lots: only add resources that are already selected in a lot
        // _.forEach(resources, resource => {
        //   this.add(resource) // 2nd parameter -> We add it only to inList
        // })
      }

      /**
       * Returns true if the resource is selected, i.e. is in one of the lots
       * @param {object} resource
       * @returns {boolean}
       */
      this.isSelected = resource => {
        let lotsList = this.getLotsAsList()
        for (let i = 0; i < lotsList.length; i++) {
          let existingResource = _.find(lotsList[i].selectedDevices, {_id: resource._id})
          if (existingResource) {
            return true
          }
        }
        return false
      }

      /**
       * Adds given resource to all parent lots of the resource, if it was not there before.
       * @param {object} resource - The resource to add
       */
      this.add = resource => {
        if (resource['@type'] !== 'Device') {
          return false
        }
        resource.lots.forEach(lot => {
          lots[lot._id] = lots[lot._id] || {
            lot: lot,
            selectedDevices: []
          }

          let existingResource = _.find(lots[lot._id].selectedDevices, {_id: resource._id})
          if (!existingResource) {
            lots[lot._id].selectedDevices.push(resource)
          }
        })
        _control()

        // Lot selection
        // let isLot = resource['@type'] === 'Lot'
        // if (isLot) {
        //   this.lots[resource._id] = {
        //     _id: resource._id,
        //     numSelectedDevices: resource.numDevicesTotal,
        //     allDevicesSelected: true,
        //     searchQuery: 'query', //query at time of selection or at time of event?
        //     filters: { price: { from: 0, to: 170 }} //filters at time of selection or at time of event?
        //   }
        // }
      }

      /**
       * Removes a resources from the actual and total lists, if it was there.
       * @param resource
       */
      this.remove = resource => {
        resource.lots.forEach(lot => {
          _.remove(lots[lot._id].selectedDevices, {'_id': resource['_id']})
          // TODO if selectedDevices.length === 0, delete lots[lot._id] ?
        })
        _control()
      }

      this.callbackOnSelection = callback => {
        callbacksForSelections.push(callback)
      }

      this.getTotalNumberOfSelectedDevices = () => {
        let devices = {}
        this.getLotsAsList().forEach(lot => {
          lot.selectedDevices.forEach(device => {
            devices[device._id] = device
          })
        })
        return _.values(devices).length
      }

      this.getNumberOfSelectedDevicesInLot = (lotID) => {
        return (lots[lotID] && lots[lotID].selectedDevices.length) || 0
      }

      this.getLotsAsList = () => {
        return _.values(lots)
      }

      /**
       * Performs common tasks after adding/removing resources on both lists.
       * @private
       */
      let _control = () => {
        console.log('control',
          this.getTotalNumberOfSelectedDevices(),
          'devices in',
          this.getLotsAsList().length,
          'lots have been selected')
        _.invokeMap(callbacksForSelections, _.call, null, lots, resources)
      }
    }
  }

  return ResourceListSelector
}

module.exports = ResourceSelectorFactory

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
   */
  constructor () {
    let callbacksForSelections = []
    let lots = []

    /**
     * Toggles the selected state of given resource, selecting (or deselecting) the device(s)
     * accordingly. It can be multiple devices if *shift* is pressed.
     *
     * @param {object} resource - The resource to select/deselect
     */
    this.toggle = (resource) => {
      if (this.isSelected(resource)) { // Remove
        remove(resource)
      } else { // Add
        add(resource)
      }
      _control()
    }

    /**
     * Selects all given resources
     * @param resources
     */
    this.selectAll = (resources) => {
      _.forEach(resources, resource => {
        add(resource)
      })
      _control()
    }

    /**
     * Deselects all given devices
     */
    this.deselectAll = devices => {
      _deselectAll(devices)
      _control()
    }

    let _deselectAll = devices => {
      if (!devices || !devices.slice) {
        lots.length = 0
        return
      }

      devices = devices.slice() // given devices might the same array we remove devices from
      devices.forEach(device => {
        remove(device)
      })
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
      // We re-populate inList from the actual resources that are in total
      this.getLotByID(lotID) && (this.getLotByID(lotID).length = 0)
      _control()
    }

    /**
     * Returns true if the resource is selected, i.e. is in one of the lots
     * @param {object} resource
     * @returns {boolean}
     */
    this.isSelected = resource => {
      let lotsList = getLotsAsList()
      for (let i = 0; i < lotsList.length; i++) {
        let existingResource = _.find(getSelectedDevices(lotsList[i]), {_id: resource._id})
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
    let add = (resource) => {
      if (resource['@type'] === 'Lot') {
        throw new Error('tried to add lot to selection')
      }

      resource.parentLots.forEach(_lot => {
        let lot = getOrCreateLot(_lot)

        let existingResource = _.find(lot.selectedDevices, {_id: resource._id})
        if (!existingResource) {
          lot.selectedDevices.push({
            _id: resource._id,
            device: resource
          })
        }
      })
    }

    /**
     * Removes a resources from the actual and total lists, if it was there.
     * @param resource
     */
    let remove = resource => {
      resource.parentLots.forEach(lot => {
        let selectedLot = this.getLotByID(lot._id)
        if (selectedLot) {
          _.remove(selectedLot.selectedDevices, {'_id': resource['_id']})
          if (selectedLot.selectedDevices === 0) {
            deleteLotByID(lot._id)
          }
        }
      })
    }

    this.callbackOnSelection = callback => {
      callbacksForSelections.push(callback)
    }

    this.getAllSelectedDevices = () => {
      let devices = {}
      getLotsAsList().forEach(lot => {
        getSelectedDevices(lot).forEach(device => {
          devices[device._id] = device.device
        })
      })
      return _.values(devices)
    }

    let getNonEmptyLots = () => {
      return getLotsAsList()
        .map((_lot) => {
          let selectedDevices = getSelectedDevices(_lot).map((device) => {
            return device.device
          })
          let lot = {}
          _.assign(lot, _lot.lot, { selectedDevices: selectedDevices })
          return lot
        }).filter((lot) => {
          return lot.selectedDevices.length > 0
        })
    }

    /**
     * Returns non empty lots. Lots in which devices where selected have lower indexes
     */
    this.getLots = () => {
      return getNonEmptyLots()
    }

    let getLotsAsList = () => {
      return lots
    }

    this.getLotByID = lotID => {
      return _.find(lots, {_id: lotID})
    }

    let deleteLotByID = lotID => {
      _.remove(lots, { _id: lotID })
    }

    let getSelectedDevices = lot => {
      return lot.selectedDevices
    }

    let getOrCreateLot = (_lot) => {
      let lot = this.getLotByID(_lot._id)
      if (!lot) {
        lot = {
          _id: _lot._id,
          lot: _lot,
          selectedDevices: [],
          hasOriginallySelectedDevices: false
        }
        lots.push(lot)
      }
      return lot
    }

    // Workaround to set labels of selected lots correctly. Necessary because API /devices doesn't include the 'label' property for device ancestors
    // TODO remove as soon as API returns ancestor lots with labels set
    this.nameLot = (_lot) => {
      let lot = getOrCreateLot(_lot)
      if (_lot.label) {
        lot.lot.label = _lot.label
      }
      return lot
    }

    // TODO move to resource-list.directive
    this.VARIOUS = 'Various'

    // TODO move to resource-list.directive
    this.getAggregatedPropertyOfSelected = (selectedDevices = [], pathToProp, valueIfDifferent = this.VARIOUS, postfix) => {
      if (selectedDevices.length === 0) {
        return null
      }
      let reducedDevice = selectedDevices.reduce((accumulate, device) => {
        let value = accumulate[pathToProp]
        if (_.has(device, pathToProp) && value !== _.get(device, pathToProp)) {
          value = valueIfDifferent
          postfix = ''
        }
        let reducedValue = {}
        _.set(reducedValue, pathToProp, value)
        return reducedValue
      })

      let aggregatedValue = _.get(reducedDevice, pathToProp)

      if (aggregatedValue && postfix) {
        aggregatedValue += postfix
      }
      return aggregatedValue
    }

    // TODO move to resource-list.directive
    this.getRangeOfPropertyOfSelected = (selectedDevices = [], pathToProp, filter = (a) => a) => {
      let min = 0
      let max = 0
      selectedDevices.forEach(device => {
        if (_.has(device, pathToProp) && !min || _.get(device, pathToProp) < min) {
          min = _.get(device, pathToProp)
        }
        if (_.has(device, pathToProp) && _.get(device, pathToProp) > max) {
          max = _.get(device, pathToProp)
        }
      })
      if (min === max) {
        return filter(min)
      }
      return filter(min) + ' - ' + filter(max)
    }

    // TODO move to resource-list.directive
    this.getAggregatedSetOfSelected = (selectedDevices = [], pathToProp, valueIdProp) => {
      let set = {}
      selectedDevices.forEach(device => {
        _.get(device, pathToProp, []).forEach(value => {
          let id = value[valueIdProp]
          set[id] = value
        })
      })
      return _.values(set)
    }

    /**
     * Performs common tasks after adding/removing resources on both lists.
     * @private
     */
    let _control = () => {
      _.invokeMap(callbacksForSelections, _.call, null, lots)
    }
  }
}

module.exports = ResourceListSelector

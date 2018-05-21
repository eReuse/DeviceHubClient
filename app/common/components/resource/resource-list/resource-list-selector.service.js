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
    /*
     * {
     *  selectedDevices: [
     *
     *  ]
     * }
     */

    /**
     * Toggles the selected state of given resource, selecting (or deselecting) the device(s)
     * accordingly. It can be multiple devices if *shift* is pressed.
     *
     * @param {object} resource - The resource to select/deselect
     */
    this.toggle = (resource, parentLot) => {
      if (this.isSelected(resource)) { // Remove
        remove(resource)
      } else { // Add
        console.log('Adding resource', resource)
        add(resource, parentLot)
      }
      _control()
    }

    /**
     * Selects all given resources
     * @param resources
     */
    this.selectAll = (resources, parentLot) => {
      if (!parentLot) {
        throw new Error('parentLot must be set')
      }
      _.forEach(resources, resource => {
        add(resource, parentLot)
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
        return lots.forEach((lot) => {
          lot.selectedDevices.forEach((device) => {
            remove(device.device)
          })
        })
      } else {
        devices = devices.slice() // given devices might the same array we remove devices from
        devices.forEach(device => {
          remove(device)
        })
      }
    }

    this.toggleAndDeselectOthers = (device, parentLot) => {
      let isSelected = this.isSelected(device)
      _deselectAll()
      if (!isSelected) {
        add(device, parentLot)
      }
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
      this.getLotByID(lotID) && (this.getLotByID(lotID).length = 0)
      _control()

      // TODO refactor for lots: only add resources that are already selected in a lot
      // _.forEach(resources, resource => {
      //   add(resource) // 2nd parameter -> We add it only to inList
      // })
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
     * @param {object} parentLot - Parent lot of given resource
     */
    let add = (resource, parentLot) => {
      if (resource['@type'] === 'Lot') {
        throw new Error('tried to add lot to selection')
      }
      if (!parentLot || !parentLot._id) {
        throw new Error('parentLot must be defined and have _id property set')
      }
      console.log('resource.parentLots', resource.parentLots)

      resource.parentLots.forEach(_lot => {
        let lot = getOrCreateLot(_lot)

        let existingResource = _.find(lot.selectedDevices, {_id: resource._id})
        console.log('existingResource', existingResource)
        if (!existingResource) {
          lot.selectedDevices.push({
            _id: resource._id,
            device: resource,
            originallySelectedInThisLot: _lot._id === parentLot._id
          })
          lot.hasOriginallySelectedDevices = true
          // if (_lot._id === parentLot._id) {
          //   lot.lot.label = parentLot.label
          // }
        }
      })

      // let lot = getOrCreateLot(parentLot)
      //
      //
      // let existingResource = _.find(getSelectedDevices(lot), {_id: resource._id})
      // console.log('existingResource', existingResource)
      // if (!existingResource) {
      //   getSelectedDevices(lot).push(resource)
      // }

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
    let remove = resource => {
      resource.parentLots.forEach(lot => {
        let selectedLot = this.getLotByID(lot._id)
        if (selectedLot) {
          _.remove(selectedLot.selectedDevices, {'_id': resource['_id']})
        }
        // TODO if selectedDevices.length === 0, delete lots[lot._id] ?
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

    this.getSelectedDevicesInLot = (lotID) => {
      console.log('get selected devices in lot', lotID)
      let lot = this.getLotByID(lotID)
      if (!lot) return []
      return getSelectedDevices(lot).map((d) => {
        return d.device
      })
    }

    let getNonEmptyLots = () => {
      return getLotsAsList()
        .map((lot) => {
          return {
            _id: lot._id,
            label: lot.lot.label,
            selectedDevices: getSelectedDevices(lot)
            /* .filter((device) => {
              return device.originallySelectedInThisLot
            }) */.map((device) => {
              return device.device
            })
          }
        }).filter((lot) => {
          return lot.selectedDevices.length > 0
        })
    }

    /**
     * Returns non empty lots. Lots in which devices where selected have lower indexes
     */
    this.getLots = () => {
      return getNonEmptyLots()
        // show lots w originally selected devices first
        // .sort((a, b) => {
        //   if (a.hasOriginallySelectedDevices && !b.hasOriginallySelectedDevices) {
        //     return -1
        //   } else if (!a.hasOriginallySelectedDevices && b.hasOriginallySelectedDevices) {
        //     return 1
        //   } else {
        //     return 0
        //   }
        // })
    }

    // this.getLotsWithOriginallySelectedDevicesOnly = () => {
    //   return getLotsAsList()
    //     .map((lot) => {
    //       return {
    //         _id: lot._id,
    //         label: lot.lot.label,
    //         selectedDevices: getSelectedDevices(lot)
    //           /* .filter((device) => {
    //             return device.originallySelectedInThisLot
    //           }) */.map((device) => {
    //             return device.device
    //           })
    //       }
    //     }).filter((lot) => {
    //       return lot.selectedDevices.length > 0
    //     }).sort((a, b) => {
    //       if (a.hasOriginallySelectedDevices && !b.hasOriginallySelectedDevices) {
    //         return -1
    //       } else if (!a.hasOriginallySelectedDevices && b.hasOriginallySelectedDevices) {
    //         return 1
    //       } else {
    //         return 0
    //       }
    //     })
    // }

    let getLotsAsList = () => {
      return lots
    }

    this.getLotByID = lotID => {
      return _.find(lots, {_id: lotID})
    }

    this.markSelectedDevicesInLotAsOriginal = _lot => {
      let lot = this.getLotByID(_lot._id)
      if (!lot) {
        return
      }
      lot.selectedDevices.forEach((device) => {
        device.originallySelectedInThisLot = true
      })
      lot.hasOriginallySelectedDevices = true
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

    this.getAggregatedPropertyOfSelected = (pathToProp, valueIfDifferent = 'Various', postfix) => {
      let selectedDevices = this.getAllSelectedDevices()
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

      if (postfix) {
        aggregatedValue += postfix
      }
      return aggregatedValue
    }

    this.getRangeOfPropertyOfSelected = (pathToProp) => {
      let min = 0
      let max = 0
      this.getAllSelectedDevices().forEach(device => {
        if (_.has(device, pathToProp) && !min || _.get(device, pathToProp) < min) {
          min = _.get(device, pathToProp)
        }
        if (_.has(device, pathToProp) && _.get(device, pathToProp) > max) {
          max = _.get(device, pathToProp)
        }
      })
      if (min === max) {
        return min
      }
      return min + ' - ' + max
    }

    /**
     * Performs common tasks after adding/removing resources on both lists.
     * @private
     */
    let _control = () => {
      console.log('control',
        this.getAllSelectedDevices().length,
        'devices in',
        getLotsAsList().length,
        'lots have been selected')
      _.invokeMap(callbacksForSelections, _.call, null, lots)
    }
  }
}

module.exports = ResourceListSelector

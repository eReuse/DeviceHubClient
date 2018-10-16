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
    let selected = {}

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
        selected = {}
        return
      }

      devices = devices.slice() // given devices might be the same array we remove devices from
      devices.forEach(device => {
        remove(device)
      })
    }

    /**
     * Returns true if the resource is selected, i.e. is in one of the lots
     * @param {object} resource
     * @returns {boolean}
     */
    this.isSelected = resource => {
      return selected[resource._id]
    }

    /**
     * @param {object} resource - The resource to add
     */
    let add = (resource) => {
      selected[resource._id] = resource
    }

    /**
     * @param resource
     */
    let remove = resource => {
      selected[resource._id] = null
      delete selected[resource._id]
    }

    this.callbackOnSelection = callback => {
      callbacksForSelections.push(callback)
    }

    this.getAllSelectedDevices = () => {
      return Object.values(selected)
    }

    /**
     * Returns non empty lots. Lots in which devices where selected have lower indexes
     */
    this.getLots = () => {
      let lots = {}
      this.getAllSelectedDevices().forEach((device) => {
        device.parentLots.forEach((lot) => {
          if (!lots[lot._id]) {
            lots[lot._id] = _.defaults({}, lot, { selectedDevices: [] })
          }
          lots[lot._id].selectedDevices.push(device)
        })
      })
      return Object.values(lots)
    }

    this.reselect = (devices) => {
      let selectedList = devices.filter((device) => {
        return selected[device._id]
      })
      selected = _.keyBy(selectedList, '_id')
      _control()
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
      let min = null
      let max = null
      selectedDevices.forEach(device => {
        if (_.has(device, pathToProp) && _.isNil(min) || _.get(device, pathToProp) < min) {
          min = _.get(device, pathToProp)
        }
        if ((_.has(device, pathToProp) && _.isNil(max)) ||
            (_.has(device, pathToProp) && _.get(device, pathToProp) > max)) {
          max = _.get(device, pathToProp)
        }
      })
      if (_.isNil(min)) {
        return min
      }
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
      _.invokeMap(callbacksForSelections, _.call, null, this.getAllSelectedDevices())
    }
  }
}

module.exports = ResourceListSelector

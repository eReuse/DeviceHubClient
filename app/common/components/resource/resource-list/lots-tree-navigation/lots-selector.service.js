/**
 * @module LotsSelector
 */

class LotsSelectorService {
  constructor () {
    let callbacksForSelections = []
    let selectedNodes = {} // TODO should not be exposed

    this.isSelected = (lotId) => {
      return !!selectedNodes[lotId]
    }

    this.toggle = (lot) => {
      let isSelected = selectedNodes[lot.id]
      this.deselectAll(true)
      if (!isSelected) {
        selectedNodes[lot.id] = lot
      }
      _control()
    }

    this.selectOnly = (lot) => {
      this.deselectAll(true)
      selectedNodes[lot.id] = lot
      _control()
    }

    this.toggleMultipleSelection = (lot) => {
      let isSelected = selectedNodes[lot.id]
      if (!isSelected) {
        selectedNodes[lot.id] = lot
      } else {
        selectedNodes[lot.id] = null
        delete selectedNodes[lot.id]
      }
      _control()
    }

    this.deselectAll = (skipControl) => {
      selectedNodes = {}
      if (skipControl) {
        return
      }
      _control()
    }

    this.callbackOnSelection = callback => {
      callbacksForSelections.push(callback)
    }

    this.getAllSelected = () => {
      return Object.values(selectedNodes)
    }

    /**
     * Performs common tasks after adding/removing resources on both lists.
     * @private
     */
    let _control = () => {
      _.invokeMap(callbacksForSelections, _.call, null, this.getAllSelected())
    }
  }
}

module.exports = LotsSelectorService

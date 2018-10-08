class LotsSelectorService {
  constructor () {
    let callbacksForSelections = []
    let selectedNodes = {} // TODO should not be exposed

    this.isSelected = (lot) => {
      return !!selectedNodes[lot._id]
    }

    this.toggle = (lot) => {
      if (!lot._id) {
        console.error('lot does not have id set', lot)
        throw new Error('lot does not have id set')
      }
      let isSelected = selectedNodes[lot._id]
      this.deselectAll(true)
      if (!isSelected) {
        selectedNodes[lot._id] = lot
      }
      _control()
    }

    this.toggleMultipleSelection = (lot) => {
      let isSelected = selectedNodes[lot._id]
      if (!isSelected) {
        selectedNodes[lot._id] = lot
      } else {
        selectedNodes[lot._id] = null
        delete selectedNodes[lot._id]
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

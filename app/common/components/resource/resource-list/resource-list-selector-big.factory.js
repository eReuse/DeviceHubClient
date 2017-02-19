/**
 *
 * @param {ResourceListSelector} ResourceSelector
 * @returns {ResourceSelectorBig}
 * @constructor
 */
function ResourceListSelectorBigFactory (ResourceListSelector) {
  let callbacksForSelections = []
  /**
   * ResourceListSelector with a way to broadcast
   */
  class ResourceListSelectorBig extends ResourceListSelector {

    _control () {
      super._control()
      // Perform callback
      _.invokeMap(callbacksForSelections, _.call, null, this.total, this.inList, this.$scope.resources)
    }

    /**
     * Callback to function after there have been changes in the selected resources.
     *
     * The callback method signature is: callback(totalSelectedResources, selectedResourcesInList, totalResources)
     * @param {Function} callback
     */
    static callbackOnSelection (callback) {
      callbacksForSelections.push(callback)
    }
  }

  return ResourceListSelectorBig
}

module.exports = ResourceListSelectorBigFactory

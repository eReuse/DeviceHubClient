/**
 * @param {ResourceListGetter} ResourceListGetter
 * @returns {ResourceListGetterBig}
 * @constructor
 */
function ResourceListGetterFactoryBig (ResourceListGetter) {
  /**
   * Note that this class has a Singleton instance.
   */
  let callbacksOnGetting = []
  class ResourceListGetterBig extends ResourceListGetter {

    getResources (getNextPage, showProgressBar) {
      return super.getResources(getNextPage, showProgressBar).then(() => {
        // Our superclass already has called the callbacks set by the non-static callbackOnGetting
        // Now we call the callbacks set by the static callbackOnGetting
        _.invokeMap(callbacksOnGetting, _.call, null, this.resources, this.resourceType, this.pagination, getNextPage)
      })
    }

    static callbackOnGetting (callback) {
      callbacksOnGetting.push(callback)
    }
  }

  return ResourceListGetterBig
}

module.exports = ResourceListGetterFactoryBig

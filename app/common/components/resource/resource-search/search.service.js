class DeviceSearchService {
  constructor () {
    let callbacksForSearchUpdate = []

    this.addSearchParameter = (parameter, value) => {
      _.invokeMap(callbacksForSearchUpdate, _.call, null, parameter, value)
    }

    this.callbackOnSearchUpdate = callback => {
      callbacksForSearchUpdate.push(callback)
    }
  }
}

module.exports = DeviceSearchService

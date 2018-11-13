function restangularConfig (RestangularProvider, CONSTANTS) {
  RestangularProvider.setBaseUrl(CONSTANTS.url)
  RestangularProvider.addRequestInterceptor(function (data, operation, what, url) {
    if (what === '/events/') {
      let eventData = _.clone(data)
      eventData.type = eventData['@type'].substring('devices:'.length, eventData['@type'].length)
      delete eventData['@type']
      // TODO change type in config files instead of mapping here
      switch (eventData.type) {
        case 'Ready':
          eventData.type = 'ReadyToUse'
          break
        case 'Dispose':
          eventData.type = 'DisposeProduct'
          break
        case 'ToDispose':
          eventData.type = 'ToDisposeProduct'
          break

      }
      return eventData
    }
    return data
  })
  RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
    if (what === 'schema') return data
    var extractedData
    // .. to look for getList operations
    switch (operation) {
      case 'getList':
        _.forEach(data, buildLink)
        extractedData = data
        extractedData._meta = data._meta || {}
        _.assign(extractedData._meta, data.pagination)
        break
      case 'get':
        buildLink(data)
        extractedData = data
        break
      default:
        extractedData = data
    }
    return extractedData
  })
  RestangularProvider.setRestangularFields({
    selfLink: '_links.self.href',
    parentResource: '_links.parent.href',
    id: '_id'
  })
  RestangularProvider.setErrorInterceptor(function (response, deferred, responseHandler) {
    console.log(response)
  })
  RestangularProvider.setDefaultHeaders(CONSTANTS.headers)
  function buildLink (item) {
    try {
      item._links.self.href = CONSTANTS.url + '/' + item._links.self.href
    } catch (err) {}
  }
}

module.exports = restangularConfig

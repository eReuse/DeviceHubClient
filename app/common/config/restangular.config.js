function restangularConfig (RestangularProvider, CONSTANTS) {
  RestangularProvider.setBaseUrl(CONSTANTS.url)
  RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
    if (what === 'schema') return data
    var extractedData
    // .. to look for getList operations
    switch (operation) {
      case 'getList':
        _.forEach(data._items, buildLink)
        extractedData = data._items
        extractedData._meta = data._meta
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

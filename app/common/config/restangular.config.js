function restangularConfig (RestangularProvider, CONSTANTS) {
  RestangularProvider.setBaseUrl(CONSTANTS.url)

  RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
    if (what === 'schema') return data
    const extractedData = data
    switch (operation) {
      case 'getList':
        _.forEach(data, buildLink)
        extractedData._meta = data._meta || {}
        _.assign(extractedData._meta, data.pagination)
        break
      case 'get':
        buildLink(data)
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
    } catch (err) {
    }
  }
}

module.exports = restangularConfig

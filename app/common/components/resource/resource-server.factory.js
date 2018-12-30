function ResourceServer (Restangular, CONSTANTS, session, resources) {
  return {
    loaded: session.loaded.then(function setAuthHeader (user) {
      const headers = _.clone(CONSTANTS.headers)
      headers.Authorization = 'Basic ' + user.token
      Restangular.setDefaultHeaders(headers)

      /** Restangular for resources */
      resources.RestangularConfigurerResource = Restangular.withConfig(RestangularProvider => {
        RestangularProvider.addResponseInterceptor((data, operation) => {
          let res
          if ('tree' in data) { // todo set good variable naming
            console.assert(operation === 'getList')
            res = new resources.Lots(data.items, data.tree, data.url)
          } else if ('items' in data) {
            console.assert(operation === 'getList')
            res = resources.ResourceList.fromServer(data.items, data.pagination, data.url)
          } else if (operation === 'get') {
            res = resources.resourceClass(data.type).fromObject(data)
          } else {
            // Do not handle post methods, let the object that POSTed handle it
            // itself (usually performing this.define() with the data)
            res = data
          }
          return res
        })
      })
    })
  }
}

module.exports = ResourceServer

function RestangularFactory (Restangular, CONSTANTS, session) {
  this.isLoaded = () => {
    return session.loaded.then(function setAuthHeader (account) {
      const headers = _.clone(CONSTANTS.headers)
      headers['Authorization'] = 'Basic ' + account.token
      Restangular.setDefaultHeaders(headers)
    })
  }
  return this
}

module.exports = RestangularFactory

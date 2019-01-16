/**
 * @module server
 */

/**
 * @param {$httpProvider} $http
 * @param CONSTANTS
 * @param {$qProvider} $q
 * @param {poller} poller
 * @param {module:android} android
 * @param {module:session} sessionLoaded
 */
function serverFactory ($http, CONSTANTS, $q, poller, android, sessionLoaded) {
  /**
   * Base class for connecting to Devicehub-like API endpoints.
   *
   * This class performs unauthenticated REST requests, and
   * can start / stop a poller.
   * @memberOf module:server
   */
  class Endpoint {
    /**
     * @param {string} baseUrl - Base URL to the service.
     * @param {string} path - A path in the service to request to.
     * @param {object} headers - Default headers as defined in $http
     * methods.
     */
    constructor (baseUrl,
                 path,
                 headers = {
                   'Content-Type': 'application/json',
                   Accept: 'application/json'
                 }) {
      console.assert(_.last(path) === '/', 'path must finish with a slash')
      const url = new URL(path, baseUrl)
      this.url = url.toString()
      this._config = {
        headers: headers
      }
      this.poller = null
    }

    get (uri = '', config = this.constructor.c) {
      return $http.get(this.url + uri, this.config(config))
    }

    post (model, uri = '', config = this.constructor.c) {
      return $http.post(this.url + uri, model, this.config(config))
    }

    patch (model, uri = '', config = this.constructor.c) {
      return $http.patch(this.url + uri, model, this.config(config))
    }

    start (config = {}) {
      this.poller = poller.get(this.url, {
        delay: CONSTANTS.workbenchPollingDelay,
        argumentsArray: [this.config(config)]
      })
      return this.poller.promise
    }

    stop () {
      this.poller.stop()
    }

    config (config = {}) {
      return _.defaultsDeep(config, this._config)
    }
  }

  Endpoint.RESPONSE_TYPE = {
    ARRAY_BUFFER: 'arraybuffer'
  }

  Endpoint.c = {params: {}, headers: {}, responseType: null}

  /**
   * As in ServerEndpoint, but performing authenticated
   * requests.
   *
   * This is safe to use before performing login, as the class
   * auto-waits for the login (to take the token)
   * before performing the request.
   * @memberOf module:server
   * @extends module:server.Endpoint
   */
  class AuthEndpoint extends Endpoint {
    constructor (baseUrl, path, headers) {
      super(baseUrl, path, headers)
      this.tokenPromise = sessionLoaded.loaded.then(user => {
        return {headers: {Authorization: 'Basic ' + user.token}}
      })
    }

    /**
     * Get
     * @param uri
     * @param config
     * @return {*}
     */
    get (uri, config) {
      return this.tokenPromise.then(headerWithAuth => {
        return super.get(uri, _.defaultsDeep(config, headerWithAuth))
      })
    }

    /**
     * Post.
     * @param model
     * @param uri
     * @param config
     * @return {*}
     */
    post (model, uri, config) {
      return this.tokenPromise.then(headerWithAuth => {
        return super.post(model, uri, _.defaultsDeep(config, headerWithAuth))
      })
    }

    /**
     * Start
     * @param config
     * @return {*}
     */
    start (config) {
      return this.tokenPromise.then(headerWithAuth => {
        return super.start(_.defaultsDeep(config, headerWithAuth))
      })
    }
  }

  /**
   * Devicehub endpoint.
   * @memberOf module:server
   * @extends module:server.AuthEndpoint
   */
  class Devicehub extends AuthEndpoint {
    constructor (path) {
      super(Devicehub.url, path)
    }
  }
  Devicehub.url = CONSTANTS.url

  /**
   * Devicehub Thing objects endpoint.
   * @memberOf module:server
   * @extends module:server.Devicehub
   */
  class DevicehubThing extends Devicehub {

    /**
     * @param path
     * @param {module:resources} resources
     */
    constructor (path, resources) {
      super(path)
      this.r = resources
    }

    /**
     * Get.
     * @param uri
     * @param config
     * @return {*}
     */
    get (uri, config) {
      return super.get(uri, config).then(response => {
        const data = response.data
        let things
        if ('tree' in data) {
          things = new this.r.Lots(data.items, data.tree, data.url)
        } else if ('items' in data) {
          things = this.r.ResourceList.fromServer(data)
        } else {
          things = this.r.resourceClass(data.type).fromObject(data)
        }
        return things
      })
    }

    /**
     * Performs login to devicehub.
     * @param credentials
     * @param {module:resources.User} User
     * @return {Promise}
     */
    static login (credentials, User) {
      const dh = new Endpoint(Devicehub.url, '/users/login/')
      return dh.post(credentials).then(response => {
        return User.fromObject(response.data)
      })
    }

    // We do not handle specially post
    // Allow the resource itself, that called this method, to handle it
  }

  /**
   * Workbench Server non-auth basic endpoint.
   * @memberOf module:server
   * @extends module:server.Endpoint
   */
  class Workbench extends Endpoint {
    constructor (path) {
      super(Workbench.base(), path)
    }

    static base () {
      const host = android.app.exists ? CONSTANTS.androidWorkbench : CONSTANTS.workbench
      return `http://${host}:8091`
    }
  }

  /**
   * Workbench Server endpoint translating to Snapshots.
   * @memberOf module:server
   * @extends module:server.AuthEndpoint
   */
  class WorkbenchSnapshots extends AuthEndpoint {
    constructor (path, workbenchResources) {
      super(Workbench.base(), path)
      this.wr = workbenchResources
      this._config.params = {
        'device-hub': CONSTANTS.url
      }
    }

    start (config) {
      return super.start(config).then(null, null, response => {
        const data = response.data
        let things
        if (_.includes(this.url, 'info')) {
          things = this.wr.WorkbenchComputerInfo.fromServer(data)
        }
        return things
      })
    }
  }

  return {
    Endpoint: Endpoint,
    AuthEndpoint: AuthEndpoint,
    Devicehub: Devicehub,
    DevicehubThing: DevicehubThing,
    Workbench: Workbench,
    WorkbenchSnapshots: WorkbenchSnapshots
  }
}

module.exports = serverFactory

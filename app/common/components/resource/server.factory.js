/**
 * @module server
 */

/**
 * @param {$httpProvider} $http
 * @param {DH_CONSTANTS} CONSTANTS
 * @param {$qProvider} $q
 * @param {poller} poller
 * @param {module:android} android
 * @param {module:session} sessionLoaded
 * @param {module:box} box
 */
function serverFactory ($http, CONSTANTS, $q, poller, android, sessionLoaded, box) {
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
      /** @type {string} **/
      this.baseUrl = baseUrl
      /** @type {string} **/
      this.path = path
      const url = new URL(path, baseUrl)
      /** @type {string} **/
      this.url = url.toString()
      this._config = {
        headers: headers
      }
      this.poller = null
    }

    get (uri = '', config = this.constructor.c) {
      return $http.get(this.url + uri, this.config(config))
        .catch(this.constructor._initException)
    }

    post (model, uri = '', config = this.constructor.c) {
      // Somehow angular doesn't stringify well, so we do it here
      return $http.post(this.url + uri, angular.toJson(model), this.config(config))
        .catch(this.constructor._initException)
    }

    patch (model, uri = '', config = this.constructor.c) {
      return $http.patch(this.url + uri, angular.toJson(model), this.config(config))
        .catch(this.constructor._initException)
    }

    delete (uri = '', config = this.constructor.c) {
      return $http.delete(this.url + uri, this.config(config))
        .catch(this.constructor._initException)
    }

    start (config = {}) {
      this.poller = poller.get(this.url, {
        delay: CONSTANTS.workbenchPollingDelay,
        argumentsArray: [this.config(config)],
        // Poller only sends new request after previous one is resolved
        smart: true
      })
      return this.poller.promise
    }

    stop () {
      this.poller.stop()
    }

    config (config = {}) {
      return _.defaultsDeep(config, this._config)
    }

    static _initException (r) {
      throw new (server[r.data.type] || DevicehubException)(r.data)
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

    patch (model, uri, config) {
      return this.tokenPromise.then(headerWithAuth => {
        return super.patch(model, uri, _.defaultsDeep(config, headerWithAuth))
      })
    }

    delete (uri, config) {
      return this.tokenPromise.then(headerWithAuth => {
        return super.delete(uri, _.defaultsDeep(config, headerWithAuth))
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
      sessionLoaded.loaded.then(user => {
        this.setInventory(user.inventories[0].id)
      })
    }

    /**
     * Sets the ID of the inventory to the beginning of the path
     * for the next requests —if constants allow it.
     * @param {string} inventoryId
     */
    setInventory (inventoryId) {
      if (CONSTANTS.inventories) {
        this.url = (new URL(inventoryId + this.path, this.baseUrl)).toString()
      }
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
          things = this.r.ResourceList.fromServer(data, true)
        } else {
          things = this.r.init(data, true)
        }
        return things
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
      return super.post(model, uri, config).then(response => {
        return response.data
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
        return User.init(response.data)
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

    /**
     * Is there connection to a Workbench Server?
     */
    static get exists () {
      if (this._exists === undefined) {
        // If we are in the Box or Android app then we have access to a WS
        this._exists = box.box.exists || android.app.exists
        if (!this._exists) {
          // No box. Still we can have access to a WS. Let's try a req
          this._exists = null // we will return before getting the info
          const test = new this('/info/')
          test.get().then(() => {
            this._exists = true
          }).catch(() => {
            this._exists = false
          })
        }
      }
      return this._exists
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
      if (!android.app.exists) {
        // Androids don't send this config info to the devicehub
        // As the users that are logged in on the androids are
        // regular employees, not the manager, which sets this
        // settings directly in the Workbench Server webview
        this._config.params = {
          'device-hub': CONSTANTS.url
        }
        if (CONSTANTS.inventories) {
          sessionLoaded.loaded.then(user => {
            this._config.params.db = user.inventories[0].id
          })
        }
      }
    }

    start (config) {
      return super.start(config).then(null, null, response => {
        const data = response.data
        let things
        if (_.includes(this.url, 'info')) {
          things = this.wr.WorkbenchComputerInfo.fromServer(data, false)
        }
        return things
      })
    }
  }

  /**
   * An exception from a server.
   * @memberOf module:server
   */
  class ServerException extends Error {
  }

  /**
   * An exception from the Devicehub server.
   * @memberOf module:server
   */
  class DevicehubException extends ServerException {
    constructor ({code, message, type}) {
      super()
      this.code = code
      this.message = message
      this.type = type
    }

    toString () {
      return this.message
    }

    valueOf () {
      return this.type
    }
  }

  /**
   * @memberOf module:server
   */
  class UniqueViolation extends DevicehubException {
    constructor ({constraint, fieldName, fieldValue, ...args}) {
      super(args)
      this.constraint = constraint
      this.fieldName = fieldName
      this.fieldValue = fieldValue
    }
  }

  const server = {
    Endpoint: Endpoint,
    AuthEndpoint: AuthEndpoint,
    Devicehub: Devicehub,
    DevicehubThing: DevicehubThing,
    Workbench: Workbench,
    WorkbenchSnapshots: WorkbenchSnapshots,
    DevicehubException: DevicehubException,
    UniqueViolation: UniqueViolation
  }

  return server
}

module.exports = serverFactory

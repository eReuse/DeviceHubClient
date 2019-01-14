/**
 * @module workbenchGetter
 */

/**
 *
 * @param {module:resources} resources
 * @param $interval
 * @param CONSTANTS
 */
function workbenchGetterFactory (resources, poller, CONSTANTS, session, $http) {
  /**
   * @memberOf module:workbenchGetter
   */
  class WorkbenchResponse extends Array {
    constructor (things = [],
                 {
                   ip = null,
                   attempts = null
                 } = {}) {
      super(...things)
      this.ip = ip
      this.attempts = attempts
    }

    static fromServer ({snapshots, ...rest}) {
      const sn = snapshots.map(x => this.T.fromObject(x))
      return new this(sn, rest)
    }
  }

  WorkbenchResponse.T = resources.Thing

  /**
   * @memberOf module:workbenchGetter
   */
  class WorkbenchGetter {
    constructor (path) {
      this.isAndroid = 'AndroidApp' in window
      const host = this.isAndroid ? CONSTANTS.androidWorkbench : CONSTANTS.workbench
      this.url = new URL(path, `http://${host}:8091`)
      this.poller = null
    }

    get (params) {
      return $http.get(this.url.toString(), params)
    }

    start (argumentsArray = [{}]) {
      this.poller = poller.get(this.url.toString(), {
        delay: CONSTANTS.workbenchPollingDelay,
        argumentsArray: argumentsArray
      })
      return this.poller.promise
    }

    stop () {
      this.poller.stop()
    }

    patch (model, id) {
      return $http.patch(this.url + id, model)
    }

    /**
     *
     * @param {object} model
     * @return {Promise}
     */
    post (model) {
      return $http.post(this.url.toString(), model)
    }
  }

  /**
   * @memberOf module:workbenchGetter
   */
  class WorkbenchListGetter extends WorkbenchGetter {
    /**
     * @param {typeof WorkbenchResponse} WResponse
     * @param path
     */
    constructor (WResponse = WorkbenchResponse, path = 'info') {
      super(path)
      this.things = new WResponse()
      this.config = this.isAndroid ? [{}] : [{
        params: {
          'device-hub': this.deviceHub
          //db: this.session.db
        },
        headers: {
          Authorization: 'Basic ' + session.user.token
        }
      }]
    }

    start () {
      return super.start(this.config).then(null, null, response => {
        this.things = this.things.constructor.fromServer(response.data)
      })
    }
  }

  return {
    WorkbenchGetter: WorkbenchGetter,
    WorkbenchListGetter: WorkbenchListGetter,
    WorkbenchResponse: WorkbenchResponse
  }
}

module.exports = workbenchGetterFactory

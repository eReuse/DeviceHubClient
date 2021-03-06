/**
 * @param {ui.router.$state} $state
 * @param {$q }$q
 * @param {module:resources} resources
 * @param {module:server} server
 */
function sessionFactory ($q, $state, resources, sessionLoaded, server) {
  /**
   * @module session
   */
  class Session {
    constructor () {
      /** @param {?module:resources.User} */
      this.user = null
      this.p = sessionLoaded
      this.storage = new Storage('user')
    }

    /**
     * Performs login.
     * @name login
     * @param {object} credentials
     * @param {string} credentials.email
     * @param {string} credentials.password
     * @param {boolean} saveInBrowser
     * @return {Promise}
     */
    login (credentials, saveInBrowser) {
      return server.DevicehubThing.login(credentials, resources.User).then(user => {
        this.user = user
        this.storage.save(this.user, !saveInBrowser)
        this._afterGettingUser()
        $state.go('auth.inventory')
        return this.p.loaded
      })
    }

    load () {
      console.assert(!this.user, 'User already exists.')
      const user = this.storage.load()
      if (user === null) throw new NoStoredUser()
      this.user = resources.init(user, true)
      this._afterGettingUser()
    }

    _afterGettingUser () {
      this.p._defer.resolve(this.user)
    }

    logout () {
      this.user = null
      this.storage.clear()
      window.location.reload(false)
    }
  }

  class NoStoredUser extends Error {
  }

  Session.NoStoredUser = NoStoredUser

  class Storage {
    constructor (key) {
      this.key = key
    }

    /**
     * Saves an object to a temporal or final storage.
     * @param {object} obj
     * @param {boolean} permanent - Save to a temporal or final storage?
     */
    save (obj, permanent) {
      const storage = this.constructor.storage(permanent)
      const serialized = JSON.stringify(obj)
      try { // Private mode in safari causes an exception
        storage.setItem(this.key, serialized)
      } catch (err) {
      }
    }

    /**
     * Gets an object from the storages
     * @return {?object} The obj if exists or null.
     */
    load () {
      let obj = sessionStorage.getItem(this.key) || localStorage.getItem(this.key) || null
      if (obj != null) obj = JSON.parse(obj)
      return obj
    }

    clear () {
      localStorage.clear()
      sessionStorage.clear()
    }

    static storage (permanent) {
      return permanent ? localStorage : sessionStorage
    }
  }

  return new Session()
}

module.exports = sessionFactory

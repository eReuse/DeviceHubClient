const utils = require('./../utils')

/**
 * Service to interact with the actual logged-in account.
 *
 * To set a logged-in account use save(), if you have performed logged-in and might want to save the account
 * to the browser storage, or use load() to try get the account from the local storage.
 *
 * This method has a promise that resolves once the account is obtained, and a callback that is triggered every time
 * the database changes (but not the first time the database is set, as you can get this from the promise).
 *
 * @property {string} ACCOUNT_STORAGE - Constant. The name of the property used in the browser storage.
 * @property {Object} account - The logged-in account.
 * @property {string} db - The active database. This is, the database of the account that is being in use. Users
 * can only have one active database at a time, and they can change it. This field only contains the name of the
 * database. Go to this.account.databases[nameOfTheDatabase] to get the permission the account has on the database.
 * @property {Promise} loaded - A promise that resolves once the account has been correctly loaded. It contains the
 * account as first parameter, and the active database as the second one.
 * @property {Role} role - The role of the account.
 */
class Session {
  constructor ($q, $rootScope, Role, $state, Restangular) {
    this.ACCOUNT_STORAGE = 'account'
    this.Role = Role
    this.$state = $state
    this.$q = $q
    this.Restangular = Restangular

    this._defer = $q.defer()
    this.loaded = this._defer.promise

    this._callbacksForDatabaseChange = []
    this.account = null
    this.$rootScope = $rootScope
    this.db = null
  }

  /**
   * The logged-in account.
   *
   * This will lazy load the account from local / session storage.
   */
  get account () {
    if (!this.isAccountSet()) {
      throw Error('No account set')
    }
    return this._account
  }

  set account (account) {
    this._account = account
  }

  /**
   * Sets the account as the logged in one and, if set, it saves it to the browser.
   * @param {Object} account
   * @param {boolean} saveInBrowser - Should the account be saved in localStorage?
   * @throw URIError - The user has no access to the database. Note that the account is still loaded.
   */
  save (account, saveInBrowser) {
    this.account = account
    const storage = saveInBrowser ? localStorage : sessionStorage
    try { // Private mode in safari causes an exception
      storage.setItem(this.ACCOUNT_STORAGE, JSON.stringify(this.account))
    } catch (err) {}
    this._afterGettingAccount(this.account.defaultDatabase)
  }

  /**
   * Loads the account from the browser storage and sets the database.
   *
   * @param {string} db - Optional. A database (for example from the URL params). If null, the account's default
   * database is used.
   * @throw Error - The account is already set.
   * @throw Error - There is no account in the browser storage.
   * @throw URIError - The user has no access to the database. Note that the account is still loaded.
   */
  load (db = this.account.defaultDatabase) {
    if (this.isAccountSet()) throw Error('Account already set')
    const account = 'AndroidApp' in window
      ? window.AndroidApp.account()
      : (sessionStorage.getItem(this.ACCOUNT_STORAGE) || localStorage.getItem(this.ACCOUNT_STORAGE) || null)
    if (account === null) throw Error('No account in the browser')
    this.account = JSON.parse(account)
    this._afterGettingAccount(db)
    this.updateAccount()
  }

  /**
   * Erases the account from the browser, part of performing log-out.
   */
  destroy () {
    this.account = null
    this.db = null
    localStorage.clear()
    sessionStorage.clear()
  }

  /**
   * Is the account set?
   * @returns {boolean}
   */
  isAccountSet () {
    return !_.isEmpty(this._account)
  }

  /**
   * Resolves the account and sets the active database.
   * @throw URIError - The user has no access to the database.
   * @private
   */
  _afterGettingAccount (db) {
    this.role = new this.Role(this.account.role)
    this.setActiveDb(db)
    this._defer.resolve(this.account)
  }

  /* Databases */
  /**
   * @param {string} db - The new database. This method assumes the database exists and the user has access at it.
   * @throw URIError - The user has no access to the database.
   */
  setActiveDb (db) {
    if (!_.includes(Object.keys(this.account.databases), db)) {
      throw URIError(`Account has no access to ${db}.`)
    }
    if (this.db !== db) {
      this.db = db
      this._callbacksForDatabaseChange.forEach(f => { f(db) })
    }
  }

  /**
   * Change the active database, going to 'index.inventory' and calling the callbacks sets by
   * callWhenDatabaseChanges, so the modules that show content based on the
   * active database can reload their content.
   * @param db
   * @return {Promise} - The $state.go promise
   */
  changeDb (db) {
    this.setActiveDb(db)
    const name = this.$state.current.name === 'index.workbench' ? 'index.workbench' : 'index.inventory'
    return this.$state.go(name, {db: db})
  }

  /**
   * Add a callback for when database changes. The callback will receive the new database.
   * @param {Function} callback
   */
  callWhenDbChanges (callback) {
    this._callbacksForDatabaseChange.push(callback)
  }

  /**
   * Does the actual user have explicit perms over the actual database?
   * @returns {boolean}
   */
  hasExplicitPerms () {
    return utils.perms.EXPLICIT_DB_PERMS.has(this.account.databases[this.db])
  }

  /**
   * Performs logout, reloading the app to the login screen.
   */
  logout () {
    this.destroy()
    this.$state.go('login')
    // We could avoid reloading if we had a way to reset promises like the ones used in schema or session
    location.reload(false)
  }

  updateAccount () {
    // TODO implement
    // const headers = {'Authorization': 'Basic ' + this.account.token}
    // this.Restangular.one('accounts', this.account.email).get({}, headers).then(account => {
    //   _.assignIn(this._account, account)
    // }).catch(error => {
    //   console.error('failed fetching account', this.account.email, error)
    //   if (error.status === 401) this.logout()
    //   throw error
    // })
  }

}

module.exports = Session

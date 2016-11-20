var ACCOUNT_STORAGE = 'account'

function Session ($q, $rootScope, Role) {
  this._account = {}
  this.saveInBrowser = true
  this.first_time = true
  this.callbacksForDatabaseChange = []
  this.activeDatabase = null
  this._accountIsSet = $q.defer()
  this._accountIsSetPromise = this._accountIsSet.promise
  this.$rootScope = $rootScope
  this._Role = Role
}

Session.prototype.accountIsSet = function () {
  return this._accountIsSetPromise
}

Session.prototype.create = function (account, saveInBrowser) {
  this._account = account
  this._prepareAccount()
  this.saveInBrowser = saveInBrowser
  this.setInBrowser(this.saveInBrowser)
}
Session.prototype.destroy = function () {
  this._account.length = 0
  localStorage.clear()
  sessionStorage.clear()
}
Session.prototype.isAccountSet = function () {
  return !_.isEmpty(this.getAccount())
}

Session.prototype._isAccountSet = function () {
  return !_.isEmpty(this._account)
}

/**
 * Gets the account. This method can trigger retrieval from session/localStorage.
 * @return {object} Account.
 */
Session.prototype.getAccount = function () {
  if (!this._isAccountSet()) {
    var account = sessionStorage.getItem(ACCOUNT_STORAGE) || localStorage.getItem(ACCOUNT_STORAGE) || '{}'
    _.extend(this._account, JSON.parse(account))
    this._prepareAccount()
  }
  return this._account
}

Session.prototype._prepareAccount = function () {
  if (typeof this._account['role'] === 'string') { // In some scenarios this can be already an instance of Role
    this._account['role'] = new this._Role(this._account['role'])
  }
}

/**
 * Resolves or rejects accountIsSet and triggers the callbacks of callWhenDatabaseChanges, depending if
 * the account is set.
 */
Session.prototype.broadcast = function () {
  if (this._isAccountSet()) {
    if (this.first_time) {
      this.setActiveDefaultDatabase()
      this.first_time = false
      this._accountIsSet.resolve(this._account)
    }
  } else {
    this._accountIsSet.reject()
  }
}

Session.prototype.update = function (email, password, name) {
  this._account.email = email
  this._account.password = password
  this._account.name = name
  this.setInBrowser(this.saveInBrowser)
}
Session.prototype.setInBrowser = function (persistence) {
  var storage = persistence ? localStorage : sessionStorage
  try { // Private mode in safari causes an exception
    storage.setItem(ACCOUNT_STORAGE, JSON.stringify(this._account))
  } catch (err) {
  }
}

/* Databases */
Session.prototype.setActiveDefaultDatabase = function () {
  this.setActiveDatabase(this._account.defaultDatabase || this._account.databases[0], false)
}
Session.prototype.setActiveDatabase = function (database, refresh) {
  this.activeDatabase = database
  _.forEach(this.callbacksForDatabaseChange, function (val) {
    val(database, refresh)
  })
  if (refresh) this.$rootScope.$broadcast('refresh@deviceHub')
}
Session.prototype.removeActiveDatabase = function () {
  this.setActiveDatabase(null, false)
}
Session.prototype.callWhenDatabaseChanges = function (callback) {
  this.callbacksForDatabaseChange.push(callback)
}

module.exports = Session

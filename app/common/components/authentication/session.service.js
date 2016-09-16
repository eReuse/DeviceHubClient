
var ACCOUNT_STORAGE = 'account';

function session($q, $rootScope) {
    this._account = {};
    this.saveInBrowser = true;
    this.first_time = true;
    this.callbacksForDatabaseChange = [];
    this.activeDatabase = null;
    this._accountIsSet = $q.defer();
    this._accountIsSetPromise = this._accountIsSet.promise;
    this.$rootScope = $rootScope;
}

session.prototype.accountIsSet = function(){
    return this._accountIsSetPromise;
};

session.prototype.create = function(account, saveInBrowser){
    this._account = account;
    this.saveInBrowser = saveInBrowser;
    this.setInBrowser(this.saveInBrowser)
};
session.prototype.destroy = function(){
    this._account.length = 0;
    localStorage.clear();
    sessionStorage.clear();
};
session.prototype.isAccountSet = function(){
    return !_.isEmpty(this.getAccount());
};

session.prototype._isAccountSet = function(){
    return !_.isEmpty(this._account);
};

/**
 * Gets the account. This method can trigger retrieval from session/localStorage.
 * @return {object} Account.
 */
session.prototype.getAccount = function(){
    if(!this._isAccountSet()){
        var account = sessionStorage.getItem(ACCOUNT_STORAGE) || localStorage.getItem(ACCOUNT_STORAGE) || '{}';
        _.extend(this._account, JSON.parse(account))
    }
    return this._account
};

/**
 * Resolves or rejects accountIsSet and triggers the callbacks of callWhenDatabaseChanges, depending if
 * the account is set.
 */
session.prototype.broadcast = function(){
    if(this._isAccountSet()){
        if(this.first_time){
            this.setActiveDefaultDatabase();
            this.first_time = false;
            this._accountIsSet.resolve(this._account);
        }
    }
    else this._accountIsSet.reject();
};


session.prototype.update = function(email, password, name){
    this._account.email = email;
    this._account.password = password;
    this._account.name = name;
    this.setInBrowser(this.saveInBrowser);
};
session.prototype.setInBrowser = function(persistence){
    var storage = persistence? localStorage : sessionStorage;
    try{ //Private mode in safari causes an exception
        storage.setItem(ACCOUNT_STORAGE, JSON.stringify(this._account));
    }
    catch(err){}
};

/* Databases */

session.prototype.setActiveDefaultDatabase = function(){
    this.setActiveDatabase(this._account.defaultDatabase || this._account.databases[0], false)
};
session.prototype.setActiveDatabase = function(database, refresh){
    //_.invokeMap(this.callbacksForDatabaseChange, _.call, null, database, refresh);
    this.activeDatabase = database;
    _.forEach(this.callbacksForDatabaseChange, function(val){
        val(database, refresh);
    });
    if(refresh) this.$rootScope.$broadcast('refresh@deviceHub');
};
session.prototype.removeActiveDatabase = function(){
    this.setActiveDatabase(null, false)
};
session.prototype.callWhenDatabaseChanges = function(callback){
    this.callbacksForDatabaseChange.push(callback);
};

module.exports = session;
'use strict';
var ACCOUNT_STORAGE = 'account';

function session(CONSTANTS, Restangular, $rootScope) {
    this._account = {};
    this.saveInBrowser = true;
    this.first_time = true;
    this.create = function(account, saveInBrowser){
        this._account = account;
        this.saveInBrowser = saveInBrowser;
        this.setActiveDefaultDatabase();
        this.setInBrowser(this.saveInBrowser);
        this.setAuthHeader();
    };
    this.destroy = function(){
        this.removeActiveDatabase();
        this._account.length = 0;
        localStorage.clear();
        sessionStorage.clear();
    };
    this.isAccountSet = function(){
        return !jQuery.isEmptyObject(this.getAccount());
    };

    this._isAccountSet = function(){
        return !jQuery.isEmptyObject(this._account);
    };
    this.getAccount = function(){
        if(!this._isAccountSet()) {
            var item = sessionStorage.getItem(ACCOUNT_STORAGE);
            if (item == null) item = localStorage.getItem(ACCOUNT_STORAGE);
            if (item == null) item = {};
            else angular.copy(JSON.parse(item), this._account);
        }
        if(this._isAccountSet() && this.first_time){
            this.setAuthHeader();
            this.setActiveDefaultDatabase();
            this.first_time = false;
        }
        return this._account;
    };
    this.update = function(email, password, name){
        this._account.email = email;
        this._account.password = password;
        this._account.name = name;
        this.setInBrowser(this.saveInBrowser);
    };
    this.setInBrowser = function(persistence){
        var storage = persistence? localStorage : sessionStorage;
        storage.setItem(ACCOUNT_STORAGE, JSON.stringify(this._account));
    };
    this.setAuthHeader = function(){
        var headers = CONSTANTS.headers;
        var self = this;
        headers['Authorization'] = 'Basic ' + this._account.token;
        Restangular.setDefaultHeaders(headers);
        Restangular.addRequestInterceptor(function(element, operation, what, url){
            if (operation == 'POST') element.byUser = self._account._id;
            return element;
        })
    };
    this.setActiveDefaultDatabase = function(){
        this.setActiveDatabase(
            'defaultDatabase' in this._account? this._account.defaultDatabase : this._account.databases[0],
            false
        );
    };

    /**
     * Sets the active database to what is introduced
     * @param newDatabase
     * @param refresh bool Optional. If true, broadcasts a message for components to refresh
     */
    this.setActiveDatabase = function(newDatabase, refresh){
        if(this._account.databases.indexOf(newDatabase) == -1) throw 'User is not authorized to access ' + newDatabase;
        this._account.activeDatabase = newDatabase;
        Restangular.setBaseUrl(CONSTANTS.url + '/' + this._account.activeDatabase);
        if(refresh) $rootScope.$broadcast('refresh@deviceHub');
    };

    this.removeActiveDatabase = function(){
        delete this._account.activeDatabase;
        Restangular.setBaseUrl(CONSTANTS.url);
    }
}

module.exports = session;
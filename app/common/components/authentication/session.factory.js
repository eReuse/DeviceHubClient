'use strict';
var sjv = require('simple-js-validator');
var ACCOUNT_STORAGE = 'account';

function session($rootScope, $q) {
    this._account = {};
    this.saveInBrowser = true;
    this.first_time = true;
    this.callbacksForDatabaseChange = [];
    this.activeDatabase = null;
    this.accountIsSet = $q.defer();

    this.create = function(account, saveInBrowser){
        this._account = account;
        this.saveInBrowser = saveInBrowser;
        this.setActiveDefaultDatabase();
        this.setInBrowser(this.saveInBrowser);
    };
    this.destroy = function(){
        this._account.length = 0;
        localStorage.clear();
        sessionStorage.clear();
    };
    this.isAccountSet = function(){
        return sjv.isNotEmpty(this.getAccount())
    };

    this._isAccountSet = function(){
        return sjv.isNotEmpty(this._account)
    };


    this.getAccount = function(){
        if(!this._isAccountSet()) {
            var item = sessionStorage.getItem(ACCOUNT_STORAGE);
            if (item == null) item = localStorage.getItem(ACCOUNT_STORAGE);
            if (item == null) item = {};
            else angular.copy(JSON.parse(item), this._account);
        }
        if(this._isAccountSet() && this.first_time){
            this.setActiveDefaultDatabase();
            this.first_time = false;
            this.accountIsSet.resolve();
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
        try{ //Private mode in safari causes an exception
            storage.setItem(ACCOUNT_STORAGE, JSON.stringify(this._account));
        } catch(err){}

    };

    /* Databases */

    this.setActiveDefaultDatabase = function(){
        this.setActiveDatabase(this._account.defaultDatabase || this._account.databases[0], false)
    };
    this.setActiveDatabase = function (database, refresh) {
        //_.invokeMap(this.callbacksForDatabaseChange, _.call, null, database, refresh);
        this.activeDatabase = database;
        _.forEach(this.callbacksForDatabaseChange, function (val) {
            val(database, refresh);
        });
        if(refresh) $rootScope.$broadcast('refresh@deviceHub');
    };
    this.removeActiveDatabase = function () {
        this.setActiveDatabase(null, false)
    };
    this.callWhenDatabaseChanges = function (callback) {
        this.callbacksForDatabaseChange.push(callback);
    };
    return this;
}

module.exports = session;
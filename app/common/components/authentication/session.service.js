'use strict';
var sjv = require('simple-js-validator');
var ACCOUNT_STORAGE = 'account';

function session(configureResources) {
    this._account = {};
    this.saveInBrowser = true;
    this.first_time = true;
    this.create = function(account, saveInBrowser){
        this._account = account;
        this.saveInBrowser = saveInBrowser;
        this.setActiveDefaultDatabase();
        this.setInBrowser(this.saveInBrowser);
        configureResources.setAuthHeader(account);
        configureResources.configureSchema();
    };
    this.destroy = function(){
        configureResources.removeActiveDatabase(this._account);
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
            configureResources.setAuthHeader(this._account);
            this.setActiveDefaultDatabase();
            configureResources.configureSchema();
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
        try{ //Private mode in safari causes an exception
            storage.setItem(ACCOUNT_STORAGE, JSON.stringify(this._account));
        } catch(err){}

    };
    this.setActiveDefaultDatabase = function(){
        configureResources.setActiveDatabase(
            'defaultDatabase' in this._account? this._account.defaultDatabase : this._account.databases[0],
            false,
            this._account
        );
    };
}

module.exports = session;
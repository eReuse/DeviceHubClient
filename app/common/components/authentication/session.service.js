'use strict';
function sessionService(CONSTANTS, Restangular) {
    this._account = null;
    this.saveInBrowser = true;
    this.first_time = true;
    this.create = function(account, saveInBrowser){
        this._account = account;
        if(this.saveInBrowser) this.setInBrowser();
        this.setAuthHeader();
    };
    this.destroy = function(){
        this._account = null;
        localStorage.clear();
    };
    this.getAccount = function(){
        if(this._account == null) this._account = JSON.parse(localStorage.getItem('account'));
        if(this._account != null && this.first_time) this.setAuthHeader();
        return this._account;
    };
    this.update = function(email, password, name){
        this._account.email = email;
        this._account.password = password;
        this._account.name = name;
        if(this.saveInBrowser) this.setInBrowser();
    };
    this.setInBrowser = function(){
        localStorage.setItem("account", JSON.stringify(this._account));
    };
    this.setAuthHeader = function(){
        var headers = CONSTANTS.headers;
        this.first_time = false;
        var self = this;
        headers['Authorization'] = 'Basic ' + this._account.token;
        Restangular.setDefaultHeaders(headers);
        Restangular.addRequestInterceptor(function(element, operation, what, url){
            if (operation == 'POST') element.byUser = self._account._id;
            return element;
        })
    }
}

module.exports = sessionService;
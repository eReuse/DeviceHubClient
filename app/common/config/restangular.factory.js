"use strict";

function RestangularFactory(Restangular, CONSTANTS, session){
    /**
     * Sets the AuthHeader in the default Restangular
     * @param {object} account The user account
     */
    var setAuthHeader = function (account) {
        var headers = CONSTANTS.headers;
        headers['Authorization'] = 'Basic ' + account.token;
        Restangular.setDefaultHeaders(headers);
    };
    var loaded = session.accountIsSet().then(setAuthHeader);
    this.isLoaded = function(){
        return loaded;
    };
    return this;
}

module.exports = RestangularFactory;
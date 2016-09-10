"use strict";

function RestangularFactory(Restangular, CONSTANTS, session){
    /**
     * Sets the AuthHeader in the default Restangular
     * @param _
     * @param {object} account The user account
     */
    var setAuthHeader = function (_, account) {
        var headers = CONSTANTS.headers;
        headers['Authorization'] = 'Basic ' + account.token;
        Restangular.setDefaultHeaders(headers);
    };
    session.accountIsSet.then(setAuthHeader);
    return this;
}

module.exports = RestangularFactory;
'use strict';

/**
 * @ngdoc factory
 * @name authService
 * @description Provides an authentication layer (login)
 */
function authServiceFactory(Restangular, session) {
    var authService = {};

    /**
     * Performs login and, upon success, generates a valid session (saving it in the browser if set) and
     * obtains the schema definition from the server.
     * @param {Object} credentials - Identification for the user.
     * @param {string} credentials.email
     * @param {string} credentials.password
     * @param {bool} saveInBrowser
     * @returns {Object} Account object.
     */
    authService.login = function (credentials, saveInBrowser) {
        return Restangular.all("login").post(credentials).then(function(account){
                session.create(account, saveInBrowser);
                return account;
            }
        );
    };
    /**
     * Checks if the user is authenticated. The method will automatically load the account, if this was saved
     * in the browser.
     * @returns {boolean}
     */
    authService.isAuthenticated = function () {
        return session.isAccountSet();
    };

    /**
     * Answers if the user is logged in and is one of the given roles.
     * @param {Array} authorizedRoles Roles to check the user against
     * @returns {boolean}
     */
    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(session.getAccount().role) !== -1);
    };

    return authService;
}

module.exports = authServiceFactory;
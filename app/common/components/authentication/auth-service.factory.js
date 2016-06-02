'use strict';

function authServiceFactory(Restangular, session) {
    var authService = {};

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
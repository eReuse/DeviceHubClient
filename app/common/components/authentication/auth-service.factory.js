/**
 * @ngdoc factory
 * @name authService
 * @description Provides an authentication layer (login)
 */
function authServiceFactory (Restangular, session, $state) {
  var authService = {}

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
    return Restangular.all('login').post(credentials).then(function (account) {
      session.create(account, saveInBrowser)
      return account
    })
  }
  /**
   * Checks if the user is authenticated. The method will automatically load the account, if this was saved
   * in the browser.
   * @returns {boolean}
   */
  authService.isAuthenticated = function () {
    return session.isAccountSet()
  }

  authService.broadcast = function () {
    session.broadcast()
  }

  /**
   * Answers if the user is logged in and is one of the given roles.
   * @param {Array} authorizedRoles Roles to check the user against
   * @returns {boolean}
   */
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles]
    }
    return (authService.isAuthenticated() &&
    authorizedRoles.indexOf(session.getAccount().role) !== -1)
  }

  /***
   * Protects all states of the application:
   * - If an user is not logged in, go to /login.
   * - If user has no access, show alert. todo: prevent user from doing action
   *
   * This method is supposed to be used when the event '$stateChangeStart' triggers, see 'shield-states.run.js'
   */
  authService.shieldStates = function (event, toState, toParams, fromState, fromParams, options) {
    if (toState.name !== 'login') {
      if (authService.isAuthenticated()) {
        authService.broadcast()
      } else {
        if (toState.public) {
          authService.broadcast()
        } else {
          session.removeActiveDatabase()
          event.preventDefault()
          $state.go('login')
        }
      }
    }
  }

  return authService
}

module.exports = authServiceFactory

/**
 * @ngdoc factory
 * @name authService
 * @description Provides an authentication layer (login)
 */
function authServiceFactory (Restangular, session, $state) {
  const authService = {}
  const userLoginURL = 'users/login'
  const defaultAccount = {
    'role': 'a',
    'active': true,
    // 'email': 'a@a.a',
    // 'token': 'Tk9GQVRETk5VQjo=',
    '@type': 'Account',
    'databases': {'db2': 'ad', 'db1': 'ad', 'reutilitza-upc': 'ad'},
    'shared': [],
    // '_id': '5acfa56aa0961e1b7f28c34a',
    'defaultDatabase': 'db1',
    'route': 'login',
    'reqParams': null,
    'restangularized': true,
    'fromServer': true,
    '_links.parent.href': null,
    'restangularCollection': false
  }

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
    return Restangular.all(userLoginURL).post(credentials).then(function (account) {
      account = _.defaults(account, defaultAccount)
      session.save(account, saveInBrowser)
      return account
    })
  }

  /**
   * Takes not logged-in users to the login screen, and logged in users that wrote a wrong URL to the inventory page.
   *
   * This method is supposed to be used when the event '$stateChangeStart' triggers, see 'shield-states.run.js'
   */
  authService.shieldStates = (event, toState, params) => {
    if (toState.name !== 'login') {
      if (session.isAccountSet()) { // User has performed login
        try {
          session.setActiveDb(params.db)
        } catch (err) {
          event.preventDefault()
          $state.go(toState.name, {db: session.account.defaultDatabase})
        }
      } else {
        try {
          session.load(params.db)
        } catch (err) {
          if (err instanceof URIError) {
            event.preventDefault()
            $state.go('index.inventory', {db: session.account.defaultDatabase})
          } else {
            // when I have not an account
            session.destroy()
            event.preventDefault()
            $state.go('login')
          }
        }
      }
    }
  }
  return authService
}

module.exports = authServiceFactory

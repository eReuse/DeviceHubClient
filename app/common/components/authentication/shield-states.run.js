function shieldStatesRun ($rootScope, session, $state) {
  $rootScope.$on('$stateChangeStart', (event, next, params) => {
    if (next.name !== 'login') {
      if (!session.user) {
        try {
          session.load()
        } catch (e) {
          if (!(e instanceof session.constructor.NoStoredUser)) throw e
          event.preventDefault()
          $state.go('login')
        }
      }
    }
  })
}

module.exports = shieldStatesRun

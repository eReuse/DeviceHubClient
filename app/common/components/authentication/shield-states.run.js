function shieldStatesRun (authService, $rootScope) {
  $rootScope.$on('$stateChangeStart', (event, next, params) => {
    authService.shieldStates(event, next, params)
  })
}

module.exports = shieldStatesRun

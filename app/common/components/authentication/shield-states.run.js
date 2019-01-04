function shieldStatesRun ($transitions, session) {
  $transitions.onStart({to: 'auth.**'}, trans => {
    if (!session.user) {
      try {
        session.load()
      } catch (e) {
        if (!(e instanceof session.constructor.NoStoredUser)) throw e
        return trans.router.stateService.target('login')
      }
    }
  })
}

module.exports = shieldStatesRun

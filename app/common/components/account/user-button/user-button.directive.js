function userButton (session, $state) {
  return {
    template: require('./user-button.directive.html'),
    restrict: 'E',
    replace: true,
    scope: {},
    link: $scope => {
      $scope.account = session.account
      $scope.logout = () => {
        session.destroy()
        $state.go('login')
        // We could avoid reloading if we had a way to reset promises like the ones used in schema or session
        location.reload(false)
      }
    }
  }
}

module.exports = userButton

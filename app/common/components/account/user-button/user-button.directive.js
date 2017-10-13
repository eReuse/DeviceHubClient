function userButton (session) {
  return {
    template: require('./user-button.directive.html'),
    restrict: 'E',
    replace: true,
    scope: {},
    link: $scope => {
      $scope.account = session.account
      $scope.logout = () => session.logout()
    }
  }
}

module.exports = userButton

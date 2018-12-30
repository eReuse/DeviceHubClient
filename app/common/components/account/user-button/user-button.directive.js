function userButton (session) {
  return {
    template: require('./user-button.directive.html'),
    restrict: 'E',
    replace: true,
    scope: {},
    link: $scope => {
      $scope.user = session.user
      $scope.logout = () => session.logout()
    }
  }
}

module.exports = userButton

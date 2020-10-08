function userButton (session, server, $rootScope) {
  return {
    template: require('./user-button.directive.html'),
    restrict: 'E',
    replace: true,
    scope: {},
    link: $scope => {
      $scope.user = session.user
      $scope.logout = () => session.logout()
      new server.DevicehubThing('/versions/').get('').then(result => {
        $scope.appVersions = $rootScope.appVersions
        $rootScope.appVersions.server = result.data.devicehub
        $rootScope.appVersions.tags = result.data.ereuse_tag
      })  
    }
  }
}

module.exports = userButton

function userButton (session, server, $rootScope) {
  return {
    template: require('./user-button.directive.html'),
    restrict: 'E',
    replace: true,
    scope: {},
    link: $scope => {
      $scope.user = session.user
      $scope.logout = () => session.logout()
      const versionsResource = { //TODO convert to proper ressource
        init: (data) => {
          return data
        }
      }
      new server.DevicehubThing('/versions/', versionsResource).get('').then(result => {
        $scope.appVersions = $rootScope.appVersions
        $rootScope.appVersions.server = result.devicehub
        $rootScope.appVersions.tags = result.ereuse_tag
      })  
    }
  }
}

module.exports = userButton

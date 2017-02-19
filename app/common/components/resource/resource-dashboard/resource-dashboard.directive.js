function resourceDashboard () {
  return {
    templateUrl: require('./__init__').PATH + '/resource-dashboard.directive.html',
    restrict: 'E',
    scope: {
      resource: '=' // One-way data-binding
    },
    link: $scope => {}
  }
}

module.exports = resourceDashboard

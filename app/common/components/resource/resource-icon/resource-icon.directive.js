function resourceIcon (ResourceSettings) {
  return {
    templateUrl: require('./__init__').PATH + '/resource-icon.directive.html',
    restrict: 'E',
    scope: {
      resourceType: '@',
      resourceSubtype: '@?',
      fillTo: '=' // If defined == true
    },
    link: function ($scope) {
      let rSettings = ResourceSettings($scope.resourceType)
      $scope.settings = rSettings.settings
      $scope.isDevice = $scope.resourceType === 'Device' || rSettings.isSubResource('Device')
      $scope.to = _.includes($scope.resourceType, 'To')
    }
  }
}

module.exports = resourceIcon

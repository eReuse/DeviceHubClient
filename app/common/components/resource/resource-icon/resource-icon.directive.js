function resourceIcon (ResourceSettings) {
  return {
    templateUrl: require('./__init__').PATH + '/resource-icon.directive.html',
    restrict: 'E',
    scope: {
      resourceType: '@'
    },
    link: function ($scope) {
      let rSettings = ResourceSettings($scope.resourceType)
      $scope.settings = rSettings.settings
    }
  }
}

module.exports = resourceIcon

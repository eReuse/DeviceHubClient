function maps (formlyConfigProvider) {
  // noinspection JSUnusedGlobalSymbols
  formlyConfigProvider.setType({
    name: 'maps',
    templateUrl: window.COMPONENTS + '/forms/types/maps/maps.formly-type.config.html',
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    apiCheck: function (check) {
      return {
        templateOptions: {
          getUserPosition: check.bool
        }
      }
    },
    defaultOptions: {
      templateOptions: {
        getUserPosition: true
      }
    },
    link: function ($scope) {
      $scope.enabled = $scope.options.key in $scope.model
      var initialGeoJSON = angular.copy($scope.model[$scope.options.key] || {coordinates: []})
      $scope.toggle = function () {
        if (!$scope.enabled) {
          $scope.model[$scope.options.key] = angular.copy(initialGeoJSON)
        } else {
          delete $scope.model[$scope.options.key]
        }
        $scope.enabled = !$scope.enabled
      }
    }
  })
}

module.exports = maps

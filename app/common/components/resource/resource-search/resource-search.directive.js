function resourceSearch (ResourceSettings) {
  return {
    templateUrl: window.COMPONENTS + '/resource/resource-search/resource-search.directive.html',
    restrict: 'E',
    scope: {
      settings: '=', // Array
      onParamsChanged: '&',
      defaultParams: '=' // object
    },
    link: function ($scope) {
      window.rs = $scope
      $scope._settings = unpackSettings($scope.settings)
      $scope.params = angular.copy($scope.defaultParams)

      $scope.$watchCollection('params', function (params) {
        if (angular.isDefined(params)) $scope.onParamsChanged({params: params})
      })

      function unpackSettings (settings) {
        _.forEach(settings, function (param) {
          var result = {}
          if (_.isString(param.select)) {
            _.forEach(ResourceSettings(param.select).getSubResources(), function (rSettings) {
              if (rSettings.isALeaf) result[rSettings.type] = rSettings.humanName
            })
            param.select = result
          } else if (_.isArray(param.select)) {
            _.forEach(param.select, function (value) {
              result['methods' in settings ? param.methods[0](value) : value] = value
            })
            param.select = result
          }
        })
        return settings
      }
    }
  }
}

module.exports = resourceSearch

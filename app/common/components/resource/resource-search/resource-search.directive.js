function resourceSearch (ResourceSettings) {
  return {
    templateUrl: window.COMPONENTS + '/resource/resource-search/resource-search.directive.html',
    restrict: 'E',
    scope: {
      settings: '=', // Array
      onParamsChanged: '&',
      defaultParams: '=' // object
    },
    link: {
      pre: function ($scope) {
        if (!$scope.settings.resourceSearchProcessed) {  // The creation of the directive has to be idempotent
          $scope._settings = unpackSettings($scope.settings)
          $scope.settings.resourceSearchProcessed = true
        } else {
          $scope._settings = $scope.settings
        }
        $scope.params = angular.copy($scope.defaultParams)

        $scope.$watchCollection('params', function (params, oldParams) {
          if (angular.isDefined(params)) {
            // todo we copy params to delete 'query' in case its there. Query is populated when user
            // types something in search that is not a filter per se. We have to disable that possibility instead
            // of deleting 'behind the scenes' the query
            // note that we copy to not modify params inside its watcher
            const newParams = _.clone(params)
            // equal means that the changed has not been provoked by the query
            if (_.pop(newParams, 'query') === _.pop(oldParams, 'query')) $scope.onParamsChanged({params: newParams})
          }
        })

        function unpackSettings (settings) {
          _.forEach(settings, function (param) {
            let select = []
            // For selects
            if (_.isString(param.select)) {
              _.forEach(ResourceSettings(param.select).getSubResources(), function (rSettings) {
                if (rSettings.isALeaf) select.push({key: rSettings.type, label: rSettings.humanName})
              })
              param.select = select
            } else if (_.isArray(param.select)) {
              _.forEach(param.select, function (value) {
                select.push({key: value, label: value})
              })
              param.select = select
            }
          })
          settings.sort(function (a, b) {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
          })
          return settings
        }
      }
    }
  }
}

module.exports = resourceSearch

function deviceIcon (CONSTANTS, ResourceSettings) {
  return {
    template: '<img ng-if="icon" ng-src="{{icon}}"/>',
    restrict: 'E',
    scope: {
      type: '@',
      subtype: '@'
    },
    link: function ($scope) {
      $scope.$watch('type', function (type) {
        if (angular.isDefined(type)) {
          $scope.icon = CONSTANTS.url + '/' + ResourceSettings(type).settings.icon + ($scope.subtype || type) + '.svg'
        }
      })
    }
  }
}

module.exports = deviceIcon

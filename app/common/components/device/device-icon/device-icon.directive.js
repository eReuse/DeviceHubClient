function deviceIcon (CONSTANTS, ResourceSettings) {
  return {
    template: '<img ng-if="icon" ng-src="{{icon}}"/>',
    restrict: 'E',
    scope: {
      type: '@',
      subtype: '@'
    },
    link: function ($scope) {
      $scope.$watchGroup(['type', 'subtype'], function (values) {
        var type = values[0]
        var subtype = values[1]
        if (angular.isDefined(type)) {
          $scope.icon = CONSTANTS.url + '/' + ResourceSettings(values[0]).settings.icon + (subtype || type) + '.svg'
        }
      })

    }
  }
}

module.exports = deviceIcon

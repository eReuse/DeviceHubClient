function deviceIcon (CONSTANTS) {
  return {
    template: '<img ng-if="icon.length > 0" ng-src="{{domain}}/{{icon}}"/>',
    restrict: 'E',
    scope: {
      icon: '@'
    },
    link: function ($scope) {
      $scope.domain = CONSTANTS.url
    }
  }
}

module.exports = deviceIcon

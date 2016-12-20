function label () {
  return {
    templateUrl: require('./__init__').PATH + '/label.directive.html',
    restrict: 'E',
    scope: {
      device: '=',
      set: '='
    },
    link: function ($scope, $element, $attrs) {
      $scope.code = $scope.device._links.self.href
    }
  }
}

module.exports = label

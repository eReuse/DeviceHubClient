function label (cerberusToView) {
  return {
    templateUrl: require('./__init__').PATH + '/label.directive.html',
    restrict: 'E',
    scope: {
      device: '=',
      set: '='
    },
    link: $scope => {
      $scope.code = $scope.device._links.self.href
      $scope.humanizeValue = cerberusToView.humanizeValue
    }
  }
}

module.exports = label

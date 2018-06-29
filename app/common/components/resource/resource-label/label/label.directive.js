function label () {
  return {
    template: require('./label.directive.html'),
    restrict: 'E',
    scope: {
      resource: '=',
      model: '='
    },
    link: {
      pre: $scope => {
        $scope.code = $scope.resource._links.self.href
        // $scope.humanizeValue = cerberusToView.humanizeValue TODO provide humanizeValue fn from somewhere?
      }
    }
  }
}

module.exports = label

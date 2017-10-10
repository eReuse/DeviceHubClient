function headerNav (CONSTANTS) {
  return {
    template: require('./header-nav.directive.html'),
    restrict: 'E',
    link: $scope => {
      $scope.CONSTANTS = CONSTANTS
    }
  }
}
module.exports = headerNav

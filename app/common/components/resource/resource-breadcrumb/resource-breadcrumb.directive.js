function resourceBreadcrumb (ResourceBreadcrumb) {
  return {
    template: require('./resource-breadcrumb.directive.html'),
    restrict: 'E',
    link: ($scope) => {
      $scope.log = ResourceBreadcrumb.log
      $scope.Naming = require('./../../utils').Naming
      $scope.goTo = resource => {
        ResourceBreadcrumb.go(resource)
      }
    }
  }
}

module.exports = resourceBreadcrumb

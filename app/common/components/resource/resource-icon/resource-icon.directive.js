function resourceIcon (ResourceSettings) {
  return {
    template: '<small ng-if="to"><i  class="fa fa-arrow-right"></i></small>' +
    '<i class="fa {{settings.fa}} {{class}}"></i>',
    restrict: 'E',
    scope: {
      resourceType: '@'
    },
    link: function ($scope) {
      $scope.settings = ResourceSettings($scope.resourceType).settings
      $scope.to = _.includes($scope.resourceType, 'To')
    }
  }
}

module.exports = resourceIcon

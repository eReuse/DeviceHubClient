function resourceIcon (ResourceSettings) {
  return {
    template: '<span ng-if="to"><i class="fa fa-fw fa-arrow-right"></i></span>' +
    '<span ng-if="fillTo && !to"><i style="opacity:0" class="fa fa-fw fa-arrow-right"></i></span>' +
    '<i class="fa fa-fw fa-lg {{settings.fa}} {{class}}"></i>',
    restrict: 'E',
    scope: {
      resourceType: '@',
      fillTo: '=' // If defined == true
    },
    link: function ($scope) {
      $scope.settings = ResourceSettings($scope.resourceType).settings
      $scope.to = _.includes($scope.resourceType, 'To')
    }
  }
}

module.exports = resourceIcon

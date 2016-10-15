function closePopover () {
  return {
    template: '<i class="fa fa-lg fa-border fa-times" ng-click="closePopover()"></i>',
    restrict: 'E',
    scope: {
      popover: '='
    },
    link: function ($scope) {
      $scope.closePopover = function () {
        $scope.popover.isOpen = false
      }
    }
  }
}

module.exports = closePopover

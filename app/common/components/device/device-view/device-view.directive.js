function deviceView (RecursionHelper, cerberusToView) {
  // if needed, this can be split into view (which gets the device) and theme (which just outputs the html given a device)
  return {
    templateUrl: window.COMPONENTS + '/device/device-view/device-view.directive.html',
    restrict: 'E',
    scope: {
      device: '=',
      teaser: '='
    },
    compile: function (element) {
      return RecursionHelper.compile(element, function ($scope, iElement, iAttrs, controller, transcludeFn) {
        $scope.$watch('device._id', function () {
          $scope.model = cerberusToView.parse($scope.device)
        })
      })
    }
  }
}

module.exports = deviceView

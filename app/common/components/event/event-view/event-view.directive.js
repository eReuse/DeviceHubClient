function eventView (cerberusToView, RecursionHelper) {
  return {
    templateUrl: window.COMPONENTS + '/event/event-view/event-view.directive.html',
    restrict: 'E',
    scope: {
      event: '=',
      id: '=',  // Optional. The id of the actual device. Stylish purposes.
      teaser: '='
    },
    compile: function (element) {
      return RecursionHelper.compile(element, function ($scope, iElement, iAttrs, controller, transcludeFn) {
        $scope.Naming = require('./../../utils').Naming
        $scope.$watchCollection('event', function (event) {
          if (angular.isDefined(event)) {
            $scope.model = cerberusToView.parse(event)
          }
        })
      })
    }
  }
}

module.exports = eventView

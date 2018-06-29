function eventExplanation () {
  return {
    templateUrl: window.COMPONENTS + '/event/event-explanation/event-explanation.directive.html',
    restrict: 'E',
    link: function ($scope) {
      $scope.popover = {
        templateUrl: window.COMPONENTS + '/event/event-explanation/event-explanation.popover.directive.html',
        isOpen: false,
        title: 'The events'
      }
    }
  }
}

module.exports = eventExplanation

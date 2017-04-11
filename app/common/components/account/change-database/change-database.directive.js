function changeDatabase (session) {
  return {
    templateUrl: window.COMPONENTS + '/account/change-database/change-database.directive.html',
    restrict: 'E',
    replace: true,
    scope: false, // It should be {} but it doesn't work with replace
    link: function ($scope, $element, $attrs) {
      $scope.session = session
    }
  }
}

module.exports = changeDatabase

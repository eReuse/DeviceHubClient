function deviceRange () {
  return {
    template: `
        <span class="resource-range">{{range}}</span>
    `,
    restrict: 'E',
    replace: true,
    scope: {
      score: '='
    },
    link: $scope => {
      // todo take the values from the server
      function conversion (newV) {
        if (newV <= 2) {
          $scope.range = 'VeryLow'
        } else if (newV <= 3) {
          $scope.range = 'Low'
        } else if (newV <= 4) {
          $scope.range = 'Medium'
        } else if (newV > 4) {
          $scope.range = 'High'
        } else {
          $scope.range = '?'
        }
      }

      $scope.$watch('score', conversion)
      if ($scope.score) conversion($scope.score)
    }
  }
}

module.exports = deviceRange

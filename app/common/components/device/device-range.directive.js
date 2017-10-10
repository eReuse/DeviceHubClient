function deviceRange () {
  return {
    template: `
        <span class="label resource-range" ng-class="{
                                        'label-danger': range == 'VeryLow',
                                        'label-warning': range == 'Low',
                                        'label-info': range == 'Medium',
                                        'label-success': range == 'High',
                                        'label-default': range == '?'
                                      }"
        >
          {{range}}
        </span>
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

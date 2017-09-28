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
      function conversion (newV) {
        if (newV <= 2) {
          $scope.range = 'VeryLow'
        } else if (newV <= 2.5) {
          $scope.range = 'Low'
        } else if (newV <= 3.25) {
          $scope.range = 'Medium'
        } else if (newV > 3.25) {
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

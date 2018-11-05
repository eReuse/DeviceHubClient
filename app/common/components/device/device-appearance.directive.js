function deviceAppearance () {
  return {
    template: `
        <device-range score="score" display-empty="displayEmpty"></device-range>
    `,
    restrict: 'E',
    scope: {
      appearance: '=',
      displayEmpty: '='
    },
    link: {
      pre: $scope => {
        function rangeToScore (appearance) {
          switch (appearance) {
            case 'A':
              return 5
            case 'B':
              return 4
            case 'C':
              return 3
            case 'D':
              return 2
            case 'E':
              return 1
          }
        }

        $scope.score = rangeToScore($scope.appearance)
      }
    }
  }
}

module.exports = deviceAppearance

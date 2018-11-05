function deviceRating () {
  return {
    template: `
        <span class="resource-range"><span>{{range}}</span></span>
    `,
    restrict: 'E',
    replace: true,
    scope: {
      score: '='
    },
    link: $scope => {
      const score = parseFloat($scope.score)
      if (_.isFinite(score)) {
        $scope.range = scoreToRange(score)
      }
      function scoreToRange (score) {
        if (score < 1.5) {
          return 'Very low'
        } else if (score < 2.5) {
          return 'Low'
        } else if (score < 3.5) {
          return 'Medium'
        } else if (score < 4.5) {
          return 'High'
        } else if (score >= 4.5) {
          return 'Very high'
        }
      }
    }
  }
}

module.exports = deviceRating

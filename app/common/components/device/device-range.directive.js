function deviceRange () {
  return {
    template: `
        <span class="resource-range"><span ng-repeat="s in stars track by $index"><i class="fa fa-star-o fa-fw"></i></span></span>
    `,
    restrict: 'E',
    replace: true,
    scope: {
      score: '='
    },
    link: $scope => {
      const score = parseFloat($scope.score)
      if (_.isFinite(score)) {
        $scope.stars = new Array(Math.round(score))
      }
    }
  }
}

module.exports = deviceRange

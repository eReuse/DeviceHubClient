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
      $scope.stars = new Array(Math.round($scope.score))
    }
  }
}

module.exports = deviceRange

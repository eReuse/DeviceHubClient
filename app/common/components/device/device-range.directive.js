function deviceRange () {
  return {
    template: `
        <span class="resource-range">
          <span ng-repeat="s in stars track by $index"><i class="fa fa-star-o fa-fw"></i></span>
          <span ng-if="displayEmpty">
            <span ng-repeat="s in emptyStars track by $index"><i class="fa fa-star-o fa-star-o-inactive fa-fw"></i></span>
          </span>
        </span>
    `,
    restrict: 'E',
    replace: true,
    scope: {
      score: '=',
      displayEmpty: '='
    },
    link: $scope => {
      const score = parseFloat($scope.score)
      const max = 5 // TODO get from config
      if (_.isFinite(score)) {
        const rounded = Math.round(score)
        $scope.stars = new Array(rounded)
        $scope.emptyStars = new Array(max - rounded)
      }
    }
  }
}

module.exports = deviceRange

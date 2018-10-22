function deviceRange () {
  return {
    template: `
        <span class="resource-range">{{score}}</span>
    `,
    restrict: 'E',
    replace: true,
    scope: {
      score: '='
    },
    link: $scope => {
    }
  }
}

module.exports = deviceRange

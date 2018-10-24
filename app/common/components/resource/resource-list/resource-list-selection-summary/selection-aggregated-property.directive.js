module.exports = function () {
  return {
    template: require('./selection-aggregated-property.html'),
    restrict: 'E',
    scope: {
      addFilter: '&',
      aggregate: '=',
      title: '='
    },
    link: {
      pre: ($scope) => {
        $scope._addFilter = (path, value, title) => {
          $scope.addFilter({path: path, value: value, title: title})
        }
      }
    }
  }
}

var utils = require('./../../utils')

function tableView () {
  return {
    templateUrl: window.COMPONENTS + '/view/table-view/table-view.directive.html',
    restrict: 'E',
    scope: {
      model: '=',
      teaser: '=?'
    },
    link: $scope => {
      $scope._teaser = !!$scope.teaser
      // Filter only values with something
      // And then, if teaser, only show teaser values
      $scope.filterEmptyAndTeaser = value => _.isPresent(value.value) && ($scope._teaser ? value.teaser : true)
      $scope.Naming = utils.Naming
    }
  }
}

module.exports = tableView

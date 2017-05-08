var utils = require('./../../utils')

function tableView () {
  const filter = value => value.teaser && !_.isEmpty(value.value)
  return {
    templateUrl: window.COMPONENTS + '/view/table-view/table-view.directive.html',
    restrict: 'E',
    scope: {
      model: '=',
      teaser: '=?'
    },
    link: $scope => {
      $scope._teaser = !!$scope.teaser
      $scope.filterTeaser = $scope._teaser ? filter : {}
      $scope.Naming = utils.Naming
    }
  }
}

module.exports = tableView

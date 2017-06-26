var utils = require('./../../utils')

function tableView () {
  return {
    template: require('./table-view.directive.html'),
    restrict: 'E',
    scope: {
      model: '=',
      teaser: '=?',
      resource: '=?'
    },
    link: $scope => {
      $scope._teaser = !!$scope.teaser
      // Filter only values with something
      // And then, if teaser, only show teaser values
      $scope.filterEmptyAndTeaser =
        value => (_.isPresent(value.value) || value.editable) && ($scope._teaser ? value.teaser : true)
      $scope.Naming = utils.Naming
    }
  }
}

module.exports = tableView

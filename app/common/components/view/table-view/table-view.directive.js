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
      // Filter only values with something or that are editable
      // And then, if teaser, only show teaser values
      $scope.filterEmptyAndTeaser = field => {
        return (_.isPresent(field.value) || field.editable) && ($scope._teaser ? field.teaser : true)
      }
      $scope.Naming = utils.Naming
    }
  }
}

module.exports = tableView

/**
 * Gets a new list of devices from the server and updates scope.
 * @param {'expression'} setSort An function that is executed every time the sort changes, with a 'sort' parameter
 * containing the python-eve sort GET query
 * @param {string} key The machine name of the field to sort
 * @param {string} name The human name of the field to sort
 * @param {object} group Pass the same empty object to the field-sorts that you want to connect together
 * @param {string} sortByDefault If there is any value it is interpreted as true, do not send value for false.
 */
function fieldSort () {
  return {
    templateUrl: window.COMPONENTS + '/device-list/field-sort/field-sort.directive.html',
    restrict: 'A',
    scope: {
      sort: '&',
      key: '@',
      name: '@',
      group: '=', // empty object, same for the group of orders
      sortByDefault: '@?' // if defined -> true, else -> false.
    },
    link: function ($scope) {
      var actualSorting = null
      $scope.changeSorting = changeSorting
      if (angular.isDefined($scope.sortByDefault)) {
        actualSorting = true
        setSorting()
      } else setClassSorting()

      function changeSorting () {
        actualSorting = !actualSorting // null -> true, or boolean inverse
        setSorting()
      }

      function setSorting () {
        $scope.sort({sort: (actualSorting ? '' : '-') + $scope.key})
        $scope.group.actual = $scope.key
        setClassSorting()
      }

      function setClassSorting () {
        $scope.SORTING = {
          'fa fa-sort': _.isNull(actualSorting),
          'fa fa-sort-asc': actualSorting,
          'fa fa-sort-desc': actualSorting === false
        }
      }

      // Let's listen if another field becomes the actual
      $scope.$watch('group.actual', function (newV) {
        if (newV !== $scope.key) {
          actualSorting = null
          setClassSorting()
        }
      })
    }
  }
}

module.exports = fieldSort

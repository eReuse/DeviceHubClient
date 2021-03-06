/**
 * Gets a new list of devices from the server and updates scope.
 *
 * Note that if no sortByDefault is set per the entire group, sort does not act at the beginning.
 * @param {'expression'} setSort An function that is executed every time the sort changes, with a
 *   'sort' parameter containing the python-eve sort GET query
 * @param {string} key The machine name of the field to sort
 * @param {string} name The human name of the field to sort
 * @param {object} group Pass the same empty object to the field-sorts that you want to connect
 *   together
 * @param {boolean} sortByDefault Set which
 */
function fieldSort () {
  return {
    template: require('./field-sort.directive.html'),
    restrict: 'A',
    transclude: true,
    scope: {
      sort: '&',
      key: '@',
      name: '@',
      fa: '@',
      group: '=', // empty object, same for the group of orders
      sortByDefault: '=?',
      sortEnabled: '=?'
    },
    link: function ($scope) {
      let actualSorting = null
      $scope.changeSorting = changeSorting
      if ($scope.sortByDefault) {
        actualSorting = false // We set sorting but to reverse (bigger -> smaller)
        setSorting()
      } else {
        setClassSorting()
      }

      function changeSorting () {
        if (!$scope.sortEnabled) return
        actualSorting = !actualSorting // null -> true, or boolean inverse
        setSorting()
      }

      function setSorting () {
        $scope.sort({key: $scope.key, order: actualSorting})
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
      $scope.$watch('group.actual', newV => {
        if (newV !== $scope.key) {
          actualSorting = null
          setClassSorting()
        }
      })
    }
  }
}

module.exports = fieldSort

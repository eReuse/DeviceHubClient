function navHeader ($state, CONSTANTS) {
  let firstTime = true
  /**
   * Goes to the stated specified by route.
   *
   * As this function is executed when the tab is selected, and the tab is selected in the page loading,
   * it does not change state when executing at the first time.
   * @param route
   */
  let go = route => {
    if (!firstTime) {
      $state.go(route)
    } else {
      firstTime = false
    }
  }
  let active = route => {
    return $state.is(route)
  }
  return {
    templateUrl: require('./__init__').PATH + '/header-nav.directive.html',
    restrict: 'E',
    link: $scope => {
      $scope.tabs = [
        {heading: 'Inventory', route: 'index.inventory', glyphicon: 'phone'}
        // {heading: 'Reports', route: 'index.reports', glyphicon: 'file'}
      ]
      $scope.tabs.forEach(function (tab, index) {
        if (active(tab.route)) {
          $scope.actualTab = index
        }
      })
      $scope.setTab = function (index) {
        $scope.actualTab = index
      }
      $scope.go = go

      $scope.$on('$stateChangeSuccess', function () {
        $scope.tabs.forEach(function (tab) {
          tab.active = active(tab.route)
        })
      })

      $scope.CONSTANTS = CONSTANTS
    }
  }
}
module.exports = navHeader
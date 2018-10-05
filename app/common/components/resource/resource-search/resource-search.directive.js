function resourceSearch () {
  return {
    templateUrl: window.COMPONENTS + '/resource/resource-search/resource-search.directive.html',
    restrict: 'E',
    scope: {
      onSearchChanged: '&',
      setSearchQuery: '&'
    },
    link: {
      pre: ($scope, element) => {
        let timeout
        $scope.$on('updateSearchQuery', (_, query) => {
          $scope.searchQuery = query
          $scope.onSearchChanged({ query: query })
        })
        element.bind('keyup keypress', function () {
          let query = $scope.searchQuery
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            $scope.onSearchChanged({ query: query })
          }, 1000)
        })
      }
    }
  }
}

module.exports = resourceSearch

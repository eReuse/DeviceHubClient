function resourceSearch () {
  return {
    templateUrl: window.COMPONENTS + '/resource/resource-search/resource-search.directive.html',
    restrict: 'E',
    scope: {
      onSearchChanged: '&'
    },
    link: {
      pre: ($scope, element) => {
        let timeout
        element.bind('keydown keypress', function () {
          let query = element.find('input').val()
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

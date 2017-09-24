/**
 * Loads and shows a resource
 */
function resource (RecursionHelper, ResourceSettings) {
  return {
    template: require('./resource.directive.html'),
    restrict: 'E',
    scope: {
      resource: '=',
      type: '@' // big / medium / small
    },
    compile: element => {
      return RecursionHelper.compile(element, $scope => {
        $scope.resource = $scope.resource || {}
        let rSettings = ResourceSettings($scope.resource['@type'])
        $scope.isEvent = rSettings.isSubResource('Event')
        // Get the resource
        if (rSettings.authorized) {
          rSettings.server.one($scope.resource._id).get().then(resource => {
            _.assign($scope.resource, resource) // So the value it is already there
          }).catch(error => {
            $scope.error = true
            throw error
          })
        } else {
          $scope.error = true
        }
      })
    }
  }
}

module.exports = resource

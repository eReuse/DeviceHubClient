/**
 * Loads and shows a resource
 */
// eslint-disable-next-line no-unused-vars
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
        const fakeResource = {
          '_updated': '2018-04-13T10:35:39',
          '_created': '2018-04-12T18:29:30',
          'label': 'BDR',
          '@type': 'Lot',
          'ancestors': [],
          '_id': 'NCZ0iW0mC',
          '_links': {
            'self': {'href': 'db1/lots/n98tkSWa', 'title': 'Lot'},
            'collection': {'href': 'db1/lots', 'title': 'lots'},
            'parent': {'href': '/', 'title': 'home'}
          },
          'children': {'lots': ['aEduoh01']},
          'perms': [{'account': '5acfa595a0961e1b7f28c456', 'perm': 'r'}],
          'byUser': '5acfa56aa0961e1b7f28c34a',
          'sharedWith': ['5acfa595a0961e1b7f28c456']
        }
        _.assign($scope.resource, fakeResource) // So the value it is already there

        // TODO comment in when removing fake resource
        // let rSettings = ResourceSettings($scope.resource['@type'])
        // // Get the resource
        // if (rSettings.authorized) { // TODO why authorized setting?
        //   rSettings.server.one($scope.resource._id).get().then(resource => {
        //     _.assign($scope.resource, resource) // So the value it is already there
        //   }).catch(error => {
        //     $scope.error = true
        //     throw error
        //   })
        // } else {
        //   $scope.error = true
        // }
      })
    }
  }
}

module.exports = resource

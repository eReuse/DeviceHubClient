function deleteButton (Notification, $rootScope, ResourceSettings) {
  const utils = require('./../../utils.js')
  return {
    template: '<i ng-show="canDelete" class="fa fa-trash text-danger clickable" ng-click="delete(resource)"></i>',
    restrict: 'E',
    scope: {
      resource: '='
    },
    link: $scope => {
      $scope.canDelete = _.includes(ResourceSettings($scope.resource['@type']).settings.itemMethods, 'DELETE')
      $scope.delete = resource => {
        if (confirm('Deleting literally erases traceability, and it cannot be undone. Are you sure?')) {
          const title = utils.getResourceTitle(resource)
          resource.remove().then(() => {
            Notification.success(title + ' successfully deleted.')
            $rootScope.$broadcast('submitted@' + resource['@type'])
            $rootScope.$broadcast('submitted@any')
          }).catch(
            error => {
              Notification.error(title + ' couldn\'t be erased.' + _.get(error.data, '_error.message', ''))
            }
          )
        }
      }
    }
  }
}

module.exports = deleteButton

/**
 *
 * @param Notification
 * @param $rootScope
 * @param ResourceSettings
 * @param {Session} session
 * @returns {{template: string, restrict: string, scope: {resource: string}, link: (function(*))}}
 */
function deleteButton (Notification, $rootScope, ResourceSettings, session) {
  const utils = require('./../../utils.js')
  return {
    template: `
      <button class="btn btn-warning btn-sm" ng-show="canDelete" ng-click="delete(resource)">
        <i class="fa fa-trash fa-fw"></i>
        Delete
      </button>`,
    restrict: 'E',
    scope: {
      resource: '='
    },
    link: $scope => {
      const rSettings = ResourceSettings($scope.resource['@type'])
      $scope.canDelete = _.includes(rSettings.settings.itemMethods, 'DELETE') &&
        session.hasExplicitPerms() && rSettings.isSubResource('Group') // todo remove 'Event' from equation
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

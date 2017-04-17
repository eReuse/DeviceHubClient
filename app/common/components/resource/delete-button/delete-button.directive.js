function deleteButton (Notification, $rootScope, ResourceSettings) {
  const utils = require('./../../utils.js')
  return {
    template: '<i ng-show="canDelete" class="fa fa-lg fa-trash text-danger clickable" ng-click="delete(model)"></i>',
    restrict: 'E',
    scope: {
      model: '='
    },
    link: function ($scope) {
      $scope.canDelete = _.includes(ResourceSettings($scope.model['@type']).settings.itemMethods, 'DELETE')
      $scope.delete = model => {
        if (confirm('Deleting literally erases traceability, and it cannot be undone. Are you sure?')) {
          const title = utils.getResourceTitle(model)
          model.remove().then(() => {
            Notification.success(title + ' successfully deleted.')
            $rootScope.$broadcast('submitted@' + model['@type'])
            $rootScope.$broadcast('submitted@any')
          },
            () => Notification.error(title + ' could not be erased.')
          )
        }
      }
    }
  }
}

module.exports = deleteButton

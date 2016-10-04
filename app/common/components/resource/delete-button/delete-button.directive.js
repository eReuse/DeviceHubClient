var utils = require('./../../utils.js')

function deleteButton (Notification, $rootScope) {
  return {
    template: '<i class="fa fa-lg fa-trash clickable" style="color: darkred" ng-click="delete(model)"></i>',
    restrict: 'E',
    scope: {
      model: '='
    },
    link: function ($scope) {
      $scope.delete = function (model) {
        if (confirm('Deleting literally erases traceability, and it cannot be undone. Are you sure?')) {
          var title = utils.getResourceTitle(model)
          model.remove().then(function () {
            Notification.success(title + ' successfully deleted.')
            $rootScope.$broadcast('submitted@' + model['@type'])
            $rootScope.$broadcast('submitted@any')
          }, function () {
            Notification.error(title + ' could not be erased.')
          })
        }
      }
    }
  }
}

module.exports = deleteButton

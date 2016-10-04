var utils = require('./../../utils.js')

var doNotDelete = ['devices:Add', 'devices:Remove', 'devices:TestHardDrive', 'devices:EraseBasic', 'devices:EraseSectors']

function deleteButton (Notification, $rootScope) {
  return {
    template: '<i ng-hide="_.includes(doNotDelete, model[\'@type\'])" class="fa fa-lg fa-trash clickable"' +
    ' style="color: darkred" ng-click="delete(model)"></i>',
    restrict: 'E',
    scope: {
      model: '='
    },
    link: function ($scope) {
      $scope._ = window._ // todo why don't we get it from rootscope?
      $scope.doNotDelete = doNotDelete // todo get this from schema
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

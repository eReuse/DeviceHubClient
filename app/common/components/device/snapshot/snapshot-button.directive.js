function registerButton ($uibModal, SnapshotFormSchema, ResourceSettings) {
  return {
    templateUrl: window.COMPONENTS + '/device/snapshot/snapshot-button.directive.html',
    restrict: 'E',
    scope: {},
    link: function ($scope) {
      $scope.openModal = function (type) {
        var modalInstance = $uibModal.open({
          templateUrl: window.COMPONENTS + '/device/computer-snapshot-modal/computer-snapshot-modal.controller.html',
          controller: 'computerSnapshotModalCtrl',
          resolve: {
            type: function () {
              return type
            }
          }
        })
        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem
        })
      }
      $scope.openFormModal = openFormModal
    }
  }
  function openFormModal (type) {
    $uibModal.open({
      templateUrl: window.COMPONENTS + '/forms/form-modal/form-modal.controller.html',
      controller: 'formModalCtrl',
      resolve: {
        model: function () {
          return {'@type': 'devices:Snapshot'}
        },
        options: function () {
          return {
            FormSchema: SnapshotFormSchema,
            deviceType: type,
            title: ResourceSettings(type).humanName
          }
        }
      }
    })
  }
}

module.exports = registerButton

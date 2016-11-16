function userButton (session, $uibModal, CONSTANTS) {
  return {
    templateUrl: window.COMPONENTS + '/account/user-button/user-button.directive.html',
    restrict: 'E',
    scope: {},
    link: function ($scope, $element, $attrs) {
      $scope.DEFAULT_AVATAR = encodeURI('https://data.ereuse.org/images/timmy/avatar.png')
      $scope.account = session.getAccount()
      $scope.openModal = function (type) {
        var modalInstance = $uibModal.open({
          templateUrl: window.COMPONENTS + '/account/user-modal/user-modal.controller.html',
          controller: 'userModalCtrl'
        })
        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem
        })
      }
    }
  }
}

module.exports = userButton

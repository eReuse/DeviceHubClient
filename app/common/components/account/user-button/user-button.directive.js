

function userButton(session, $uibModal) {
    return {
        templateUrl: window.COMPONENTS + '/account/user-button/user-button.directive.html',
        restrict: 'E',
        scope: {},
        link: function ($scope, $element, $attrs) {
            $scope.account = session.getAccount();
            $scope.openModal = function (type) {
                var modalInstance = $uibModal.open({
                    templateUrl: window.COMPONENTS + '/account/user-modal/user-modal.controller.html',
                    controller: 'userModalCtrl'
                });
                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    // $log.info('Modal dismissed at: ' + new Date());
                });
            }
        }
    }
}

module.exports = userButton;
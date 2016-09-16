

function registerButton($uibModal){
    return {
        templateUrl: window.COMPONENTS + '/device/register-button/register-button.directive.html',
        restrict: 'E',
        scope:{},
        link: function($scope, $element, $attrs){
            $scope.openModal = function(type){
                var modalInstance = $uibModal.open({
                    templateUrl: window.COMPONENTS + '/device/register-modal/register-modal.controller.html',
                    controller: 'registerModalCtrl',
                    resolve: {
                        type: function(){return type}
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    // $log.info('Modal dismissed at: ' + new Date());
                });
            };
        }
    }
}

module.exports = registerButton;


function listModalCtrl($scope,$uibModalInstance,devices,type){
    $scope.devices = devices;
    $scope.type = type;
    $scope.title = type;
    $scope.event = {'@type': type, devices:devices}; //Just useful for some actions, rubbish for others.
    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

module.exports = listModalCtrl;
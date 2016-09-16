

var options = [
    {name: 'link', humanName: 'Share public links', desc: 'Set which devices are public, and get links to publicly share them.'}
];


function share($uibModal){
    return {
        templateUrl: window.COMPONENTS + '/device/share/share.directive.html',
        restrict: 'E',
        scope: {
            devices: "="
        },
        link: function ($scope) {
            $scope.options = options;
            $scope.openModal = openModalFactory($uibModal)
        }
    }
}

function openModalFactory($uibModal){
    return function (type, devices){
        $uibModal.open({
            templateUrl: window.COMPONENTS + '/device/share/share-modal.controller.html',
            controller: 'shareModalCtrl',
            resolve: {
                model: function(){ return {'@type': type, devices: devices}},
                options: function(){ return {}}
            }
        })
    }
}

module.exports = share;
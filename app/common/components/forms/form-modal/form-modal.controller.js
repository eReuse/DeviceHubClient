'use strict';

function formModal($scope, $uibModalInstance, options, model, event){
    $scope.model = model;
    $scope.options = options;
    $scope.defined = angular.isDefined(event.EVENTS[model['@type']]);
    $scope.status = {};
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.$watch(function(){return $scope.status.done}, function(newV){
        if(newV) $scope.cancel();
    })

}

module.exports = formModal;
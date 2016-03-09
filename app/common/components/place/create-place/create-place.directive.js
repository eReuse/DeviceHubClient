'use strict';

function createPlace($uibModal, configureResources){
    return {
        templateUrl: window.COMPONENTS + '/place/create-place/create-place.directive.html',
        restrict: 'E',
        link: function ($scope) {
            $scope.openModal = openModalFactory($uibModal);
            $scope.schemaLoaded = false;
            configureResources.configureSchema().then(function(){
                $scope.schemaLoaded = true;
            })
        }
    }
}

function openModalFactory($uibModal){
    return function (){
        $uibModal.open({
            templateUrl: window.COMPONENTS + '/forms/form-modal/form-modal.controller.html',
            controller: 'formModalCtrl',
            resolve: {
                model: function(){ return {'@type': 'Place'}},
                options: function(){ return {doNotUse: ['devices']}}
            }
        })
    }
}

module.exports = createPlace;
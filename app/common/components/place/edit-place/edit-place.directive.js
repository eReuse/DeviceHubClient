

var utils = require('./../../utils.js');

function createPlace($uibModal, $rootScope){
    return {
        templateUrl: window.COMPONENTS + '/place/edit-place/edit-place.directive.html',
        restrict: 'E',
        scope:{
            place: '='
        },
        link: function ($scope) {
            $scope.openModal = openModalFactory($uibModal, $scope.place, $rootScope);
        }
    }
}

function openModalFactory($uibModal, place, $rootScope){
    return function (){
        var p = utils.copy(place);
        p.devices = _.map(p.devices, function(elem){return {'_id': elem}});
        var modal = $uibModal.open({
            templateUrl: window.COMPONENTS + '/forms/form-modal/form-modal.controller.html',
            controller: 'formModalCtrl',
            resolve: {
                model: function(){ return p},
                options: function(){ return {doNotUse: []}}
            }
        });
        modal.result.then(function(reason){
            //We need to refresh the devicelist to update them, if their place has changed
            if(reason == 'success' && !_.isEqual(p.devices, place.devices)) $rootScope.$broadcast('refresh@deviceList');
        })
    }
}

module.exports = createPlace;
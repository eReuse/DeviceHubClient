'use strict';

var utils = require('./../../utils.js');
var path = window.COMMON + '/elements/modal/';

function shareModal($scope, $uibModalInstance, options, model, CONSTANTS, Notification){
    $scope.url = CONSTANTS.url;
    $scope.title = 'Admin public shared devices';
    $scope.header = path + 'header.html';
    $scope.footer = path + 'done.html';
    $scope.model = model;
    $scope.done = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.patchPublic = patchPublicFactory(Notification);
}

function patchPublicFactory(Notification){
    return function (device){
        device.patch({public: device.public}).then(function(){
            var text = device.public? 'public' : 'private';
            Notification.success(utils.getTitle(device) + ' is now ' + text + '.');
        }).catch(function(error){
            Notification.error('We could not update '+ utils.getTitle(device));
        });
    }
}

module.exports = shareModal;
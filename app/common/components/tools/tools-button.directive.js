'use strict';

function toolsButton(CONSTANTS){
    return {
        templateUrl: window.COMPONENTS + '/tools/tools-button.directive.html',
        restrict: 'E',
        link: function($scope){
            $scope.DEVICE_INVENTORY_URL = CONSTANTS.deviceInventoryUrl;
        }
    }
}

module.exports = toolsButton;
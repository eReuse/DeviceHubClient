'use strict';

function indexButton(CONSTANTS){
    return {
        templateUrl: window.COMPONENTS + '/index-button/index-button.directive.html',
        restrict: 'E',
        link: function($scope){
            $scope.appName = CONSTANTS.appName;
        }
    }
}

module.exports = indexButton;
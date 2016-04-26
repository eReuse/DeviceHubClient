'use strict';

function label(){
    return {
        templateUrl: window.COMPONENTS + '/device-label/label/label.directive.html',
        restrict: 'E',
        scope: {
            device: '=',
            width: '@',
            height: '@',
            logo: '@',
            useLogo: '=',
            leftPadding: '@',
            topPadding: '@'
        },
        link: function ($scope, $element, $attrs) {
            $scope.code = $scope.device._links.self.href;
        }
    }
}

module.exports = label;
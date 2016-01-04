'use strict';

function computerView(Restangular) {
    //if needed, this can be splitted into view (which gets the device) and theme (which just outputs the html given a device)
    return {
        templateUrl: window.COMPONENTS + '/device/computer-view/computer-view.directive.html',
        restrict: 'E',
        scope: {
            computer: '='
        },
        link: function ($scope, $element, $attrs) {
            $scope.teaser = true;
        }
    }
}

module.exports = computerView;
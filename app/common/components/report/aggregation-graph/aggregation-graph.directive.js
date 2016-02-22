'use strict';

function aggregationGraph(Restangular){
    return {
        templateUrl: window.COMPONENTS + '/report/aggregation-graph/aggregation-graph.directive.html',
        restrict: 'E',
        scope: {
            params: '=',
            resourceName: '@',
            type: '@'
        },
        link: function ($scope, $element, $attrs) {
            $scope.model = window.gg = Restangular.all('aggregate').one($scope.resourceName).get($scope.params).$object;
        }
    }

}

module.exports = aggregationGraph;
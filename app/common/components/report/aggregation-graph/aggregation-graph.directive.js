'use strict';

function aggregationGraph(Restangular){
    return {
        templateUrl: window.COMPONENTS + '/report/aggregation-graph/aggregation-graph.directive.html',
        restrict: 'E',
        scope: {
            params: '=',
            resourceName: '@',
            method: '@',
            type: '@'
        },
        link: function ($scope, $element, $attrs) {
            $scope.model = Restangular.all('aggregations').all($scope.resourceName)
                .one($scope.method).get($scope.params).$object;
        }
    }

}

module.exports = aggregationGraph;
'use strict';

function changeDatabase(configureResources, session){
    return {
        templateUrl: window.COMPONENTS + '/account/change-database/change-database.directive.html',
        restrict: 'E',
        scope:{},
        link: function($scope, $element, $attrs){
            $scope.configureResources = configureResources;
            $scope.session = session;
        }
    }
}

module.exports = changeDatabase;
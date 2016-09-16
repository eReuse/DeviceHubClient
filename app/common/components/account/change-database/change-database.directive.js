

function changeDatabase(session){
    return {
        templateUrl: window.COMPONENTS + '/account/change-database/change-database.directive.html',
        restrict: 'E',
        scope:{},
        link: function($scope, $element, $attrs){
            $scope.session = session;
        }
    }
}

module.exports = changeDatabase;
'use strict';


function eventEasyExplanation(){
    return{
        templateUrl: window.COMPONENTS + '/event/event-easy-explanation/event-easy-explanation.directive.html',
        restrict: 'E',
        scope:{
            event: '=',
            useResourceButton: '&?',
            id: '='  //Optional. The id of the actual device. Stylish purposes.
        },
        link: function($scope){
            var type = $scope.event['@type'];
            $scope.useRB = angular.isDefined($scope.useResourceButton)? $scope.useResourceButton() : true;
            if(type == 'TestHardDrive' || type== 'EraseBasic') $scope.name = type;
            else $scope.name = type.concat(type.charAt(type.length - 1) == 'e'? 'd' : 'ed');
            $scope.preposition = $scope.name == 'Removed'? 'from' : 'to'
        }
    }
}

module.exports = eventEasyExplanation;
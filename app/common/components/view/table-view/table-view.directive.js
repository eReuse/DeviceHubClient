'use strict';


function tableView(){
    return{
        templateUrl: window.COMPONENTS + '/view/table-view/table-view.directive.html',
        restrict: 'E',
        scope:{
            model: '='
        },
        link:function($scope){
            $scope.model.forEach(function(field){
                field.showAsJson =
                    Object.prototype.toString.call(field.value) == '[object Object]' || angular.isArray(field.value);
            });
        }
    }
}

module.exports = tableView;
'use strict';


function tableView(){
    return{
        templateUrl: window.COMPONENTS + '/view/table-view/table-view.directive.html',
        restrict: 'E',
        scope:{
            model: '='
        },
        link:function($scope){
            _.forEach($scope.model, function(field){
                field.showAsJson =
                    Object.prototype.toString.call(field.value) == '[object Object]' || angular.isArray(field.value);
            });
        }
    }
}

module.exports = tableView;
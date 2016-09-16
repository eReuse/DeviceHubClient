

var utils = require('./../../utils');


function tableView(){
    return{
        templateUrl: window.COMPONENTS + '/view/table-view/table-view.directive.html',
        restrict: 'E',
        scope:{
            model: '=',
            teaser: '&?'
        },
        link:function($scope){
            $scope._teaser = $scope.teaser();
            $scope.filterTeaser = {

            };
            if($scope._teaser)
                $scope.filterTeaser.teaser = true;
            _.forEach($scope.model, function(field){
                field.showAsJson = _.isPlainObject(field.value) || _.isArray(field.value);
            });
            $scope.Naming = utils.Naming;

        }
    }
}

module.exports = tableView;
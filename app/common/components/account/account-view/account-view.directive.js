

function accountView(RecursionHelper, cerberusToView){

    //if needed, this can be splitted into view (which gets the device) and theme (which just outputs the html given a device)
    return{
        templateUrl: window.COMPONENTS + '/account/account-view/account-view.directive.html',
        restrict: 'E',
        scope:{
            account: '=',
            teaser: '='
        },
        compile: function(element) {
            return RecursionHelper.compile(element, function ($scope, iElement, iAttrs, controller, transcludeFn) {
                $scope.$watch('account._id', function(){
                    $scope.model = cerberusToView.parse($scope.account);
                });
            });
        }
    }
}

module.exports = accountView;
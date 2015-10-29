/**
 * Created by busta on 29/10/2015.
 */
angular.module('Account', ['Authentication','ui.bootstrap'])
    .directive('userButtonWidget',['Session','$modal', function(Session, $modal){
        return {
            templateUrl: 'app/accounts/userButtonWidget.html',
            restrict: 'E',
            scope: {},
            link: function ($scope, $element, $attrs) {
                $scope.account = Session.account;
                $scope.openModal = function (type) {
                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: 'app/accounts/userModal.html',
                        controller: 'userModalCtrl',
                        size: 'lg',
                        keyboard: true,
                        windowClass: 'modal-xl',
                        backdrop: 'static'
                    });
                    modalInstance.result.then(function (selectedItem) {
                        $scope.selected = selectedItem;
                    }, function () {
                        // $log.info('Modal dismissed at: ' + new Date());
                    });
                }
            }
        }
    }])
    .directive('accountRole',['Session','$modal', function(Session, $modal){
        return {
            templateUrl: 'app/accounts/accountRole.html',
            restrict: 'E',
            scope: {
                role: '@'
            }
        }
    }])
    .controller('userModalCtrl', ['$scope','$modalInstance','Restangular','Session', function($scope,$modalInstance,Restangular,Session){
        //$scope.account = Session.account;
        $scope.account = $.extend(true, {}, Session.account);
        $scope.title = $scope.account.hasOwnProperty('name')? $scope.account.name : $scope.account.email;
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.ok = function(){
            Session.account = Restangular.one('users',$scope._id).put({
                email: $scope.email,
                password: $scope.password,
                name: $scope.name
            });
        }
    }]);

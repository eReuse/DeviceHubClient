/**
 * Created by busta on 29/10/2015.
 */
angular.module('Account', ['Authentication','ui.bootstrap'])
    .directive('userButtonWidget',['Session','$uibModal', function(Session, $uibModal){
        return {
            templateUrl: 'app/accounts/userButtonWidget.html',
            restrict: 'E',
            scope: {},
            link: function ($scope, $element, $attrs) {
                $scope.account = Session.getAccount();
                $scope.openModal = function (type) {
                    var modalInstance = $uibModal.open({
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
    .directive('accountRole',['Session','$uibModal', function(Session, $uibModal){
        return {
            templateUrl: 'app/accounts/accountRole.html',
            restrict: 'E',
            scope: {
                role: '@'
            }
        }
    }])
    .controller('userModalCtrl', ['$scope','$uibModalInstance','Restangular','Session', function($scope,$uibModalInstance,Restangular,Session){
        //$scope.account = Session.account;
        $scope.account = $.extend(true, {}, Session.getAccount());
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.ok = function() {
            $("#accountForm").submit();
        };
        $scope.update = function(account){
            //We will copy stuff to Session once it is validated through the server.
             Restangular.one('accounts',Session.getAccount()._id).customOperation('patch','',{},{},{
                email: account.email,
                password: account.password,
                name: account.name
            }).then(function(){
                 Session.update(account.email, account.password, account.name);
             }, function(data){
                 alert('Verify that the data is correct and try again.');
             });
        };
        $scope.logout = function(){
            Session.destroy();
            location.reload();
        }
    }]);

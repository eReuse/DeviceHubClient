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
                $scope.account = Session.getAccount();
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
        $scope.account = $.extend(true, {}, Session.getAccount());
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
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

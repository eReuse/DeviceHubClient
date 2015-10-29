/**
 * Created by Xavier on 27/5/2015.
 */
angular.module('Main',['ui.router','Config','Devices','Authentication', 'ngAnimate'] )
    .config(
    function($urlRouterProvider,$stateProvider){
        $stateProvider.state('devices',{
            url:'/devices',
            templateUrl:'app/devices/devices.html',
            abstract: true
        }).state('login',{
            url:'/login',
            templateUrl:'app/accounts/login.html',
            controller: 'LoginCtrl as LnCl',
            css: 'app/accounts/login.css'
        });
        $urlRouterProvider.otherwise("/devices")
    })
    .controller('MainCtrl',['config', function(config){
        this.appName = config.appName;
    }])
    .directive('showValidation', [function() {
        return {
            restrict: "A",
            link: function(scope, element, attrs, ctrl) {

                if (element.get(0).nodeName.toLowerCase() === 'form') {
                    element.find('.form-group').each(function(i, formGroup) {
                        showValidation(angular.element(formGroup));
                    });
                } else {
                    showValidation(element);
                }

                function showValidation(formGroupEl) {
                    var input = formGroupEl.find('input[ng-model],textarea[ng-model]');
                    if (input.length > 0) {
                        scope.$watch(function() {
                            return input.hasClass('ng-invalid') && input.hasClass('ng-dirty');
                        }, function(isInvalid) {
                                formGroupEl.toggleClass('has-error', isInvalid);
                        });
                    }
                }
            }
        };
    }]);

/**
 * Created by busta on 28/10/2015.
 */
angular.module('Authentication',['ui.router','Config'])
    .controller('LoginCtrl', function ($scope, $rootScope, AUTH_EVENTS, AuthService, $state, $location) {
        $scope.credentials = {
            email: '',
            password: ''
        };
        $scope.login = function (credentials) {
            AuthService.login(credentials).then(function (user) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $state.go('devices.show');
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };
    })
    .service('Session', function () {
        this.account = null;
        this.create = function(account){
            this.account = account;
        };
        this.destroy = function(){
            this.account = null;
        };
    })
    .factory('AuthService', function (Restangular, Session, config) {
        var authService = {};

        authService.login = function (credentials) {
            return Restangular.all("login").post(credentials).then(function(account){
                    Session.create(account);
                    var headers = config.headers;
                    headers['Authorization'] = 'Basic ' + Session.account.token;
                    Restangular.setDefaultHeaders(headers);
                    return account;
                }
            );
        };
        authService.isAuthenticated = function () {
            return !!Session.account;
        };

        /**
         * Answers if the user is logged in and is one of the given roles.
         * @param authorizedRoles Array Roles to check the user against
         * @returns {boolean}
         */
        authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
            authorizedRoles.indexOf(Session.account.role) !== -1);
        };

        return authService;
    })
/***
 * Protects all states of the application:
 * - If an user is not logged in, go to /login.
 * - If user has no access, show alert. todo: prevent user from doing action
 */
    .run(function ($rootScope, $state, $location, AUTH_EVENTS, AuthService) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
            if(next.name != 'login'){
                if (AuthService.isAuthenticated()) {
                    if(next.data.hasOwnProperty('authorizedRoles')
                        && !AuthService.isAuthorized(next.data.authorizedRoles)){
                        // user is not allowed
                        alert("You are not allowed to do so. Contact the admin.");
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    }
                }
                else{
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    $state.transitionTo('login');
                    $location.path('/login');
                }
            }
        });
    })
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    .constant('USER_ROLES', {
        basic: 'basic',
        amateur: 'amateur',
        employee: 'employee',
        admin: 'admin',
        superuser: 'superuser'
    })
    .constant('MANAGERS', {
        admin: 'admin',
        superuser: 'superuser'
    });
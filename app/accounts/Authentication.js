/**
 * Created by busta on 28/10/2015.
 */
angular.module('Authentication',['ui.router','Config'])
    .controller('LoginCtrl', function ($scope, $rootScope, AUTH_EVENTS, AuthService, $state, $location) {
        $scope.credentials = {
            email: '',
            password: ''
        };
        $scope.saveInBrowser = false;
        $scope.login = function (credentials, saveInBrowser) {
            AuthService.login(credentials, saveInBrowser).then(function (user) {
                $state.go('devices.show');
            }, function () {
                alert("The email or password is incorrect " + String.fromCharCode(0xD83D, 0xDE22));
            });
        };
    })
    .service('Session', function (config, Restangular) {
        this._account = null;
        this.saveInBrowser = true;
        this.first_time = true;
        this.create = function(account, saveInBrowser){
            this._account = account;
            if(this.saveInBrowser) this.setInBrowser();
            this.setAuthHeader();
        };
        this.destroy = function(){
            this._account = null;
            localStorage.clear();
        };
        this.getAccount = function(){
            if(this._account == null) this._account = JSON.parse(localStorage.getItem('account'));
            if(this._account != null && this.first_time) this.setAuthHeader();
            return this._account;
        };
        this.update = function(email, password, name){
            this._account.email = email;
            this._account.password = password;
            this._account.name = name;
            if(this.saveInBrowser) this.setInBrowser();
        };
        this.setInBrowser = function(){
            localStorage.setItem("account", JSON.stringify(this._account));
        };
        this.setAuthHeader = function(){
            var headers = config.headers;
            this.first_time = false;
            var self = this;
            headers['Authorization'] = 'Basic ' + this._account.token;
            Restangular.setDefaultHeaders(headers);
            Restangular.addRequestInterceptor(function(element, operation, what, url){
                if (operation == 'POST') element.byUser = self._account._id;
                return element;
            })
        }
    })
    .factory('AuthService', function (Restangular, Session) {
        var authService = {};

        authService.login = function (credentials, saveInBrowser) {
            return Restangular.all("login").post(credentials).then(function(account){
                    Session.create(account, saveInBrowser);
                    return account;
                }
            );
        };
        authService.isAuthenticated = function () {
            return Session.getAccount() != null;
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
            authorizedRoles.indexOf(Session.getAccount().role) !== -1);
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
                    try{
                        if(!AuthService.isAuthorized(next.data.authorizedRoles)){
                            alert("You are not allowed to do so. Contact the admin.");
                            $state.transitionTo('login');
                            $location.path('/login');
                        }
                    }
                    catch(err){}
                }
                else{
                    // user is not logged in
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
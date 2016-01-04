'use strict';

/***
 * Protects all states of the application:
 * - If an user is not logged in, go to /login.
 * - If user has no access, show alert. todo: prevent user from doing action
 */
function shieldStatesRun($rootScope, $state, $location, authService) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
        if(next.name != 'login'){
            if (authService.isAuthenticated()) {
                try{
                    if(!authService.isAuthorized(next.data.authorizedRoles)){
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
}

module.exports = shieldStatesRun;
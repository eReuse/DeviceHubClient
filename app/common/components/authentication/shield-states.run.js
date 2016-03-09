'use strict';

/***
 * Protects all states of the application:
 * - If an user is not logged in, go to /login.
 * - If user has no access, show alert. todo: prevent user from doing action
 */
function shieldStatesRun($rootScope, $state, $location, authService, configureResources) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
        if(next.name != 'login'){
            if (authService.isAuthenticated()) { //This call triggers the account loading
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
                if(next.name == 'fullDevice') return;
                // user is not logged in
                configureResources.removeActiveDatabase({});
                event.preventDefault();
                $state.go('login');
                //$state.transitionTo('login');
                //$location.path('/login');
            }
        }
    });
}

module.exports = shieldStatesRun;



function shieldStatesRun(authService, $rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
        authService.shieldStates(event, next);
    });
}

module.exports = shieldStatesRun;
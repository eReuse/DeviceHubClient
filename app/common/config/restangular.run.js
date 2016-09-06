"use strict";

function RestangularRun(Restangular, $rootScope){
    var setAuthHeader = function (account) {
        var headers = CONSTANTS.headers;
        headers['Authorization'] = 'Basic ' + account.token;
        Restangular.setDefaultHeaders(headers);
    };
    $rootScope.$on('session:AccountIsSet', setAuthHeader);
}

module.exports = RestangularRun;
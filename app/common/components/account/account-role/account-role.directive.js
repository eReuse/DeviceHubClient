'use strict';

function accountRole(){
    return {
        templateUrl: window.COMPONENTS + '/account/account-role/account-role.directive.html',
        restrict: 'E',
        scope: {
            role: '@'
        }
    }
}

module.exports = accountRole;
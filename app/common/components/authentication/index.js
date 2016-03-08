'use strict';

require('angular-ui-router');
require('restangular');

module.exports = angular.module('common.components.authentication',
    [
        //require('./../../config').name,
        'restangular',
        'ui.router',
        require('./../../config').name
    ])
    .service('session', require('./session.service.js'))
    .factory('authService', require('./auth-service.factory.js'))
    .run(require('./shield-states.run.js'))
    .constant('AUTH_EVENTS', require('./AUTH_EVENTS.js'))
    .constant('USER_ROLES', require('./USER_ROLES.js'))
    .constant('MANAGERS', require('./MANAGERS.js'));
require('restangular')

/**
 * @ngdoc module
 * @name common.components.authentication
 * @description
 * Authentication and session handling.
 *
 * Handles authenticating the user through the `session` service,
 * for example reading the account from the browser storage and
 * DeviceHub or managing the actual active database; and
 * protects views that require user authorization through
 * `auth-service` factory and `shield-states` run.
 */
module.exports = angular.module('common.components.authentication',
  [
    'restangular',
    require('@uirouter/angularjs').default
  ])
.service('session', require('./session.service.js'))
.run(require('./shield-states.run.js'))

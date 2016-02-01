'use strict';

require('restangular');
require('angular-ui-bootstrap');

module.exports = angular.module('common.config',
    [
        require('./../constants').name,
        'restangular',
        'ui.bootstrap'
    ])
    .config(require('./restangular.config.js'))
    .config(require('./modal.config.js'))
    .factory('configureResources', require('./configureResources.factory.js'))
    .factory('schema', require('./schema.factory.js'));
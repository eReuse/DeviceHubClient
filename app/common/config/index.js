'use strict';

require('restangular');
require('angular-ui-bootstrap');
require('jsonformatter');

module.exports = angular.module('common.config',
    [
        require('./../constants').name,
        'restangular',
        'ui.bootstrap',
        'jsonFormatter'
    ])
    .config(require('./restangular.config.js'))
    .config(require('./modal.config.js'))
    .config(require('./json-formatter.config.js'))
    .factory('configureResources', require('./configureResources.factory.js'))
    .factory('schema', require('./schema.factory.js'));
'use strict';

require('restangular');
require('angular-ui-bootstrap');
require('jsonformatter');
require('angular-ui-notification');

module.exports = angular.module('common.config',
    [
        require('./../constants').name,
        'restangular',
        'ui.bootstrap',
        'jsonFormatter',
        'ui-notification'
    ])
    .config(require('./restangular.config.js'))
    .config(require('./modal.config.js'))
    .config(require('./json-formatter.config.js'))
    .config(require('./html5.config.js'))
    .config(require('./ui-notification.config.js'))
    .run(require('./restangular.run.js'))
    .factory('schema', require('./schema.factory.js'))
    .run(function ($rootScope) {
            $rootScope._ = window._;
    });
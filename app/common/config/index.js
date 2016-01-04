'use strict';

require('restangular');

module.exports = angular.module('common.config',
    [
        require('./../constants').name,
        'restangular'
    ])
    .config(require('./restangular.config.js'));
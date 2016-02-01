'use strict';

require('restangular');

module.exports = angular.module('common.components.forms',
    [
        require('angular-formly'),
        require('angular-formly-templates-bootstrap'),
        require('./../../config').name,
        require('./../event').name,
        'restangular'
    ])
    .config(require('./types/devices/devices.formly-type.config.js'))
    .config(require('./types/maps/maps.formly-type.config.js'))
    .directive('formSchema', require('./form-schema/form-schema.directive.js'))
    .factory('cerberusToFormly', require('./cerberus-to-formly.factory.js'))
    .controller('formModalCtrl', require('./form-modal/form-modal.controller.js'));
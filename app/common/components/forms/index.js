'use strict';

require('restangular');
require('angular-ui-notification');

module.exports = angular.module('common.components.forms',
    [
        require('angular-formly'),
        require('angular-formly-templates-bootstrap'),
        require('./../../config').name,
        require('./../event').name,
        require('./../../constants').name,
        'restangular',
        'ui-notification'
    ])
    .config(require('./types/devices/devices.formly-type.config.js'))
    .config(require('./types/maps/maps.formly-type.config.js'))
    .config(require('./types/typeahead/typeahead.formly-type.config.js'))
    .config(require('./types/datepicker/datepicker.formly-type.config.js'))
    .directive('formSchema', require('./form-schema/form-schema.directive.js'))
    .factory('cerberusToFormly', require('./cerberus-to-formly.factory.js'))
    .controller('formModalCtrl', require('./form-modal/form-modal.controller.js'));
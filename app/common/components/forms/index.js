

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
    .config(require('./types/devices/devices.formly-type.config'))
    .config(require('./types/maps/maps.formly-type.config'))
    .config(require('./types/typeahead/typeahead.formly-type.config'))
    .config(require('./types/datepicker/datepicker.formly-type.config'))
    .directive('formSchema', require('./form-schema/form-schema.directive'))
    .service('FormSchema', require('./form-schema/form-schema.service'))
    .service('cerberusToFormly', require('./cerberus-to-formly.service'))
    .controller('formModalCtrl', require('./form-modal/form-modal.controller'));
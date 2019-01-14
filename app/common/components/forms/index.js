require('restangular')
require('angular-ui-notification')

module.exports = angular.module('common.components.forms',
  [
    require('angular-formly'),
    require('angular-formly-templates-bootstrap'),
    require('./../../config').name,
    require('./../event').name,
    require('./../../constants').name,
    require('./../utilities').name,
    'restangular',
    'ui-notification'
  ])
  .config(require('./types/resources/resources.formly-type.config'))
  .config(require('./types/maps/maps.formly-type.config'))
  .config(require('./types/typeahead/typeahead.formly-type.config'))
  .config(require('./types/datepicker/datepicker.formly-type.config'))
  .config(require('./types/upload/upload.formly-type.config'))
  .config(require('./types/get-from-data-relation-or-create/get-from-data-relation-or-create.formly-type.config'))
  .factory('fields', require('./fields.factory'))
  .factory('resourceFields', require('./resource.fields.factory'))
  .directive('dhForm', require('./dh-form/dh-form.directive'))

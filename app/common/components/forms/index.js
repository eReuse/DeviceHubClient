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
//.directive('formSchema', require('./form-schema/form-schema.directive'))
.factory('FormSchema', require('./form-schema/form-schema.factory'))
.config(require('./form-modal/form-modal.config'))
.controller('formModalCtrl', require('./form-modal/form-modal.controller'))
.directive('resourceForm', require('./resource.form.directive'))
.factory('ResourceForm', require('./resource.form.factory'))

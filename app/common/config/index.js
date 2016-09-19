require('restangular')
require('angular-ui-bootstrap')
require('jsonformatter')
require('angular-ui-notification')

module.exports = angular.module('common.config',
  [
    require('./../constants').name,
    'restangular',
    'ui.bootstrap',
    'jsonFormatter',
    'ui-notification',
    require('angular-formly')
  ])
.config(require('./restangular.config'))
.config(require('./modal.config'))
.config(require('./json-formatter.config'))
.config(require('./html5.config'))
.config(require('./ui-notification.config'))
.config(require('./formly.config'))
.factory('RestangularFactory', require('./restangular.factory'))
.factory('schema', require('./schema.factory'))
.run(require('./formly.run'))
.run(function ($rootScope) {
  $rootScope._ = window._
})

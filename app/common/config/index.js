require('restangular')
require('angular-ui-bootstrap')
require('angular-ui-notification')
require('angular-simple-logger')

module.exports = angular.module('common.config',
  [
    require('./../constants').name,
    'restangular',
    'ui.bootstrap',
    'ui-notification',
    require('angular-formly')
  ])
  .config(require('./restangular.config'))
  .config(require('./modal.config'))
  .config(require('./html5.config'))
  .config(require('./ui-notification.config'))
  .config(require('./formly.config'))
  .factory('RestangularFactory', require('./restangular.factory'))
  .run(require('./formly.run'))
  .run(function ($rootScope) {
    $rootScope._ = window._
  })

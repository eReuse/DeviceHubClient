require('restangular')
require('angular-ui-notification')
require('angular-simple-logger')
require('angular-translate')

module.exports = angular.module('common.config',
  [
    require('./../constants').name,
    'restangular',
    require('angular-ui-bootstrap'),
    'ui-notification',
    require('angular-formly'),
    'pascalprecht.translate'
  ])
  .config(require('./restangular.config'))
  .config(require('./modal.config'))
  .config(require('./html5.config'))
  .config(require('./ui-notification.config'))
  .config(require('./formly.config'))
  .config(require('./translations.config'))
  .run(require('./formly.run'))
  .run(function ($rootScope) {
    $rootScope._ = window._
  })

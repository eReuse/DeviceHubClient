require('angular-ui-notification')
require('angular-simple-logger')
require('angular-translate')

module.exports = angular.module('common.config',
  [
    require('./../constants').name,
    require('angular-ui-bootstrap'),
    'ui-notification',
    require('angular-formly'),
    'pascalprecht.translate'
  ])
  .config(require('./modal.config'))
  .config(require('./html5.config'))
  .config(require('./ui-notification.config'))
  .config(require('./translations.config'))
  .run(function ($rootScope) {
    $rootScope._ = window._
  })
  .config($httpProvider => {
    // As of angular docs, improves http performance
    $httpProvider.useApplyAsync(true)
  })
  .config(require('./formly.config'))
  .run(require('./formly.run'))

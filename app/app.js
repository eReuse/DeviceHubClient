require('./init.js')

/**
 * @ngdoc module
 * @name deviceHub
 * @description
 * The central DeviceHub application.
 *
 * Glues the views of the application by using the library `UI.router`.
 */
module.exports = window.angular.module('deviceHub', [
  require('@uirouter/angularjs').default,
  require('./views').name,
  require('./common/components').name, // Only adds close-popover
  require('dist/templates.js').name,
  require('angular-animate'),
  'ngSanitize'  // angular-sanitize
])
  .config(
    ($urlServiceProvider, $stateProvider) => {
      // The views of the application
      // views that use the `resolve` property require the schema
      // to be loaded.
      $stateProvider.state({
        name: 'auth',
        url: '',
        template: require('./views/index/index.controller.html'),
        abstract: true
      }).state({
        name: 'auth.inventory',
        url: '/inventories/',
        template: require('./views/inventory/inventory.controller.html'),
        controller: 'inventoryCtrl as inCl',
        resolve: {resourceServerLoaded: resourceServer => resourceServer.loaded}
      }).state({
        name: 'auth.workbench',
        url: '/workbench/',
        template: require('./views/workbench/workbench.controller.html'),
        controller: 'workbenchCtl as wbCtl',
        resolve: {resourceServerLoaded: resourceServer => resourceServer.loaded}
      }).state({
        name: 'login',
        url: '/login',
        template: require('./views/login/login.controller.html'),
        controller: 'loginCtrl as LnCl'
      })
      $urlServiceProvider.rules.otherwise((matchValue, url, router) => {
        return '/inventories/'
      })
    })
  /**
   * @ngdoc type
   * @module deviceHub
   * @name deviceHubCtrl
   * @description
   * Completes the loading bar and finishes animations that
   * triggered when the page was loading.
   *
   * Note that this is one of the first things executed after being
   * the Angular and DeviceHub ready.
   */
  .controller('deviceHubCtrl', $scope => {
    window.progressSetVal(2)
    $('html,body').removeClass('dh-wait')
    $scope.isNotAndroid = !('AndroidApp' in window)
  })
  /**
   * @ngdoc service
   * @module deviceHub
   * @description
   * Sets window globals to `$rootScope` so they can be accessed
   * in templates with `$root`, like `$root._` for lodash.
   */
  .run(($rootScope, CONSTANTS) => {
    $rootScope._ = window._ // We add lodash for usage in templates
    $rootScope.COMMON = window.COMMON
    $rootScope.COMPONENTS = window.COMPONENTS
    $rootScope.CONSTANTS = CONSTANTS
    window.CONSTANTS = CONSTANTS // todo are we sure this is ok?
  })

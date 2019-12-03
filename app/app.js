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
      /**
       * Fades the loading screen and removes any mouse progress.
       * Useful for after-logging states.
       * @return {jQuery}
       */
      function fadeLoadingScreen () {
        $('body').removeClass('dh-progress')
        return $('#dh-loading').fadeOut(600)
      }

      /**
       * A factory that generates a function that redirects to
       * `target` when the user directly accesses the state through
       * the URL.
       * @param {string} target
       * @return {Function}
       */
      function redirectToIfAccessedThroughURLFactory (target) {
        return trans => {
          if (trans.options().source === 'url') return trans.router.stateService.target(target)
        }
      }

      // The views of the application
      // views that use the `resolve` property require the schema
      // to be loaded.
      $stateProvider.state({
        name: 'auth',
        url: '',
        template: require('./views/index/index.controller.html'),
        onEnter: fadeLoadingScreen,
        abstract: true
      }).state({
        name: 'auth.inventory',
        url: '/inventories/',
        template: require('./views/inventory/inventory.controller.html'),
        controller: 'inventoryCtrl as inCl'
      }).state({
        name: 'auth.tags',
        url: '/tags/',
        template: require('./views/tags/tags.controller.html'),
        controller: 'tagsCtrl as tgCl'
      }).state({
        name: 'auth.printTags',
        url: '/tags/print',
        params: {
          tags: {
            type: 'any',
            value: []
          }
        },
        template: require('./views/tags/print-tags.controller.html'),
        redirectTo: redirectToIfAccessedThroughURLFactory('auth.inventory'),
        controller: 'printTagsCtrl as ptCl'
      }).state({
        name: 'auth.createDeliveryNote',
        url: '/deliverynote/new',
        params: {
          funs: {}
        },
        template: require('./views/deliverynotes/create-deliverynote.controller.html'),
        redirectTo: redirectToIfAccessedThroughURLFactory('auth.inventory'),
        controller: 'createDeliveryCtrl as cdCl'
      }).state({
        name: 'auth.workbench',
        url: '/workbench/',
        abstract: true
      }).state({
        name: 'auth.workbench.computer',
        url: 'computer/',
        template: require('./views/workbench/workbench-computer.controller.html'),
        controller: 'workbenchComputerCtl as wcCl'
      }).state({
        name: 'auth.workbench.mobile',
        url: 'mobile/',
        template: require('./views/workbench/workbench-mobile.controller.html'),
        controller: 'workbenchMobileCtl as wmCl'
      }).state({
        name: 'auth.workbench.settings',
        url: 'settings/',
        template: require('./views/workbench/workbench-settings.controller.html'),
        controller: 'workbenchSettingsCtl as wsCl'
      }).state({
        name: 'auth.workbench.link',
        url: 'link/',
        params: {
          uuid: {
            type: 'string',
            value: null
          }
        },
        template: require('./views/workbench/workbench-link.controller.html'),
        redirectTo: redirectToIfAccessedThroughURLFactory('auth.workbench.computer'),
        controller: 'workbenchLinkCtl as wlCl'
      }).state({
        name: 'auth.inventory.newAction',
        url: 'new-action/',
        params: {
          action: {
            type: 'any',
            value: null
          }
        },
        template: require('./views/inventory/new-action.controller.html'),
        redirectTo: redirectToIfAccessedThroughURLFactory('auth.inventory'),
        controller: 'newActionCtrl as naCl'
      }).state({
        name: 'auth.inventory.snapshotUpload',
        url: 'upload-snapshot/',
        template: require('./views/inventory/upload.snapshot.controller.html'),
        controller: 'snapshotUploadCtrl'
      }).state({
        name: 'auth.inventory.snapshotManual',
        url: 'snapshot/',
        template: require('./views/inventory/manual.snapshot.controller.html'),
        controller: 'snapshotManualCtrl'
      }).state({
        name: 'auth.inventory.import',
        url: 'import/',
        template: require('./views/inventory/import.controller.html'),
        controller: 'importCtrl'
      }).state({
        name: 'login',
        url: '/login',
        template: require('./views/login/login.controller.html'),
        controller: 'loginCtrl as LnCl'
      })
      $urlServiceProvider.rules.otherwise(() => '/inventories/')
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
    window.document.title = CONSTANTS.appName
    window.CONSTANTS = CONSTANTS // todo are we sure this is ok?
  })

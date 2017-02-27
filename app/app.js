require('./init.js')
var utils = require('./common/components/utils')

module.exports = window.angular.module('deviceHub', [
  'ui.router',
  require('./common').name,
  require('./views').name,
  require('dist/templates.js').name,
  require('angular-animate')
])
  .config(
    function ($urlRouterProvider, $stateProvider) {
      $stateProvider.state('index', {
        url: '',
        templateUrl: 'views/index/index.controller.html',
        abstract: true
      }).state('index.inventory', {
        url: '/inventory',
        templateUrl: 'views/inventory/inventory.controller.html',
        resolve: {schemaLoaded: utils.schemaIsLoaded}
      }).state('index.inventory.resource', {
        url: '/:resourceName/:id',
        templateUrl: 'views/inventory/inventory.controller.html',
        controller: 'inventoryCtrl as inCl',
        resolve: {schemaLoaded: utils.schemaIsLoaded}
      }).state('fullDevice', {
        url: '/:db/devices/:id',
        templateUrl: 'views/full-device/full-device.controller.html',
        controller: 'fullDeviceCtrl as FeCl',
        resolve: {schemaLoaded: utils.schemaIsLoaded},
        public: true // This is custom value used in shield-states
      }).state('login', {
        url: '/login',
        templateUrl: 'views/login/login.controller.html',
        controller: 'loginCtrl as LnCl'
      }).state('index.reports', {
        url: '/reports',
        templateUrl: 'views/reports/reports.controller.html',
        controller: 'reportsCtrl as RsCl',
        resolve: {schemaLoaded: utils.schemaIsLoaded}
      })
      $urlRouterProvider.otherwise('/inventory')
    })
  .controller('deviceHubCtrl', function (CONSTANTS) {
    $('#intro-spinner').remove()
    $('html,body').removeClass('dh-wait')
    window.document.title = CONSTANTS.appName
  })
  .run(function ($rootScope) {
    $rootScope._ = window._ // We add lodash for usage in templates
    $rootScope.COMMON = window.COMMON
    $rootScope.COMPONENTS = window.COMPONENTS
  })

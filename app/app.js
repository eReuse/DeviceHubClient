require('./init.js')
const utils = require('./common/components/utils')

module.exports = window.angular.module('deviceHub', [
  'ui.router',
  require('./common').name,
  require('./views').name,
  require('dist/templates.js').name,
  require('angular-animate')
])
  .config(
    ($urlRouterProvider, $stateProvider) => {
      $stateProvider.state('index', {
        url: '',
        template: require('./views/index/index.controller.html'),
        abstract: true
      }).state('index.inventory', {
        url: '/inventories/:db',
        template: require('./views/inventory/inventory.controller.html'),
        controller: 'inventoryCtrl as inCl',
        resolve: {schemaLoaded: utils.schemaIsLoaded}
      }).state('index.inventory.resource', {
        url: '/{folderPath:[a-zA-Z0-9-.\'_|]*}?filters',
        template: require('./views/inventory/inventory.controller.html'),
        controller: 'inventoryCtrl as inCl',
        resolve: {schemaLoaded: utils.schemaIsLoaded}
      }).state('index.workbench', {
        url: '/workbench/:db',
        template: require('./views/workbench/workbench.controller.html'),
        controller: 'workbenchCtl as wbCtl',
        resolve: {schemaLoaded: utils.schemaIsLoaded}
      }).state('login', {
        url: '/login',
        template: require('./views/login/login.controller.html'),
        controller: 'loginCtrl as LnCl'
      }).state('redirect', {
        url: '/',
        controller: ($state, session) => {
          try {
            $state.go('index.inventory', {db: session.account.defaultDatabase})
          } catch (err) {} // user without database
        }
      })
      $urlRouterProvider.otherwise('/')
    })
  .controller('deviceHubCtrl', $scope => {
    window.progressSetVal(2)
    $('html,body').removeClass('dh-wait')
    $scope.isNotAndroid = !('AndroidApp' in window)
  })
  .run(($rootScope, CONSTANTS) => {
    $rootScope._ = window._ // We add lodash for usage in templates
    $rootScope.COMMON = window.COMMON
    $rootScope.COMPONENTS = window.COMPONENTS
    $rootScope.CONSTANTS = CONSTANTS
  })

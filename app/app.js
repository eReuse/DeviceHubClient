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
        templateUrl: 'views/index/index.controller.html',
        abstract: true
      }).state('index.inventory', {
        url: '/inventories/:db',
        templateUrl: 'views/inventory/inventory.controller.html',
        controller: 'inventoryCtrl as inCl',
        resolve: {schemaLoaded: utils.schemaIsLoaded}
      }).state('index.inventory.resource', {
        url: "/{folderPath:[a-zA-Z0-9-.'_|]*}?filters",
        templateUrl: 'views/inventory/inventory.controller.html',
        controller: 'inventoryCtrl as inCl',
        resolve: {schemaLoaded: utils.schemaIsLoaded}
      }).state('login', {
        url: '/login',
        templateUrl: 'views/login/login.controller.html',
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
  .controller('deviceHubCtrl', () => {
    window.progressSetVal(2)
    $('html,body').removeClass('dh-wait')
  })
  .run($rootScope => {
    $rootScope._ = window._ // We add lodash for usage in templates
    $rootScope.COMMON = window.COMMON
    $rootScope.COMPONENTS = window.COMPONENTS
  })

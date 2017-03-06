require('angular-ui-router')
/**
 * @ngdoc module
 * @name common.components.elements
 * @description Elements are UI components that are not explicitly inherent of any module, and they have inner
 * dependencies.
 */
module.exports = angular.module('common.components.elements',
  [
    require('./../resource').name,
    require('./../device').name,
    require('./../event').name,
    require('./../utilities').name,
    require('./../account').name,
    require('./../tools').name,
    require('./../../constants').name,
    require('./../forms').name,
    'ui.router'
  ])
  .directive('newButton', require('./new-button/new-button.directive'))
  .directive('headerNav', require('./header-nav/header-nav.directive'))

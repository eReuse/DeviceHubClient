require('angular-translate')
/**
 * @ngdoc module
 * @name common.components.elements
 * @description Elements are UI components that are not explicitly inherent of any module, and they have inner
 * dependencies.
 */
module.exports = angular.module('common.components.elements',
  [
    require('./../resource').name,
    require('./../event').name,
    require('./../utilities').name,
    require('./../account').name,
    require('./../tools').name,
    require('./../../constants').name,
    require('./../forms').name,
    require('./../workbench').name,
    require('@uirouter/angularjs').default,
    'pascalprecht.translate'
  ])
  .directive('headerNav', require('./header-nav/header-nav.directive'))
  .directive('languageButton', require('./language-button/language-button.directive'))

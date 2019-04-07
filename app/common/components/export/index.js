module.exports = angular.module('common.components.export',
  [])
  .directive('exportButton', require('./export-button/export-button.directive'))
  .directive('importButton', require('./import-button/import-button.directive'))

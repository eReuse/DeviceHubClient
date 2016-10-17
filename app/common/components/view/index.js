require('jsonformatter')
require('angular-recursion')

module.exports = angular.module('common.components.view',
  [
    require('./../../config').name,
    require('./../../constants').name,
    'jsonFormatter',
    'RecursionHelper'
  ])
.factory('cerberusToView', require('./cerberus-to-view.factory.js'))
.directive('tableView', require('./table-view/table-view.directive.js'))

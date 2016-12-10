require('angular-ui-bootstrap')
module.exports = angular.module('common.components.resource.resource-list',
  [
    'ui.bootstrap'
  ])
.directive('resourceListFooter', require('./resource-list-footer/resource-list-footer.directive'))

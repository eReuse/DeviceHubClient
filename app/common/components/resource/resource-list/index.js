require('angular-ui-bootstrap')
module.exports = angular.module('common.components.resource.resource-list',
  [
    'ui.bootstrap',
    require('./../../authentication').name,
    require('./../../../constants').name
  ])
.directive('resourceListFooter', require('./resource-list-footer/resource-list-footer.directive'))
.directive('resourceListSelectAll', require('./resource-list-select-all/resource-list-select-all.directive'))

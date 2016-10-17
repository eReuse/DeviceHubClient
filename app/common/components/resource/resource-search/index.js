require('angular-ui-bootstrap')
require('./angular-advanced-searchbox-ereuse')

module.exports = angular.module('common.components.resource.resource-search',
  [
    require('./../../../config').name,
    'angular-advanced-searchbox'
  ])
.directive('resourceSearch', require('./resource-search.directive'))
.constant('RESOURCE_SEARCH', require('./resource-search.constant'))

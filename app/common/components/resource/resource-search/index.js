require('angular-ui-bootstrap')

module.exports = angular.module('common.components.resource.resource-search',
  [
    require('./../../../config').name
  ])
  .service('SearchService', require('./search.service'))
  .directive('resourceSearch', require('./resource-search.directive'))
.constant('RESOURCE_SEARCH', require('./resource-search.constant'))

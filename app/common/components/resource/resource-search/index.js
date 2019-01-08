module.exports = angular.module('common.components.resource.resource-search',
  [
    require('./../../../config').name
  ])
  .directive('resourceSearch', require('./resource-search.directive'))

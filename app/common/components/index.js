module.exports = angular.module('common.components',
  [
    require('./account').name,
    require('./authentication').name,
    require('./device').name,
    require('./event').name,
    require('./place').name,
    require('./authentication').name,
    require('./tools').name,
    require('./forms').name,
    require('./geo').name,
    require('./view').name,
    require('./report').name,
    require('./index-button').name,
    require('./resource').name,
    require('./utilities').name,
    require('./elements').name,
    require('./group').name,
    require('./resource-label').name,
    require('./workbench').name
  ])
.directive('closePopover', require('./close-popover'))

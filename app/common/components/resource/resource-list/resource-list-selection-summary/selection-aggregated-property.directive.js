module.exports = function () {
  return {
    template: require('./selection-aggregated-property.html'),
    restrict: 'E',
    scope: {
      addFilter: '&',
      aggregate: '=',
      title: '='
    }
  }
}

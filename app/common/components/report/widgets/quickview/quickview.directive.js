function quickview () {
  return {
    templateUrl: require('./__init__').PATH + '/quickview.directive.html',
    restrict: 'E',
    scope: {
      resources: '='
    }
  }
}

module.exports = quickview

function resourceIcon () {
  return {
    template: '<i class="fa fa-fw {{::resource.icon}}"></i>',
    restrict: 'E',
    scope: {
      resource: '<' // Class or instance
    }
  }
}

module.exports = resourceIcon

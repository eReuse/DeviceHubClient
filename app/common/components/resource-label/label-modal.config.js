function labelModalConfig (dhModalProvider) {
  dhModalProvider.config.resourceLabel = {
    template: require('./label.controller.html'),
    controller: 'resourceLabelCtrl'
  }
}

module.exports = labelModalConfig

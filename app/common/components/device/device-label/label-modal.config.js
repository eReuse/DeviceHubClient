function labelModalConfig (dhModalProvider) {
  dhModalProvider.config.label = {
    templateUrl: require('./__init__').PATH + '/label.controller.html',
    controller: 'deviceLabelCtrl'
  }
}

module.exports = labelModalConfig

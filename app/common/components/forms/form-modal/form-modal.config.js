function formModalConfig (dhModalProvider) {
  dhModalProvider.config.form = {
    templateUrl: require('./__init__').PATH + '/form-modal.controller.html',
    controller: 'formModalCtrl'
  }
}

module.exports = formModalConfig

function certificateModalConfig (dhModalProvider) {
  dhModalProvider.config.certificate = {
    template: require('./certificate.modal.controller.html'),
    controller: 'certificateModalCtrl'
  }
}

module.exports = certificateModalConfig

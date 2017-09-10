function groupShare (dhModalProvider) {
  dhModalProvider.config.groupShare = {
    template: require('./group-share-modal.controller.html'),
    controller: 'groupShareModalCtrl'
  }
}

module.exports = groupShare

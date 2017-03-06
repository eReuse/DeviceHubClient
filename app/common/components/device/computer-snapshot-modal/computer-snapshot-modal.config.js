function computerSnapshotModalConfig (dhModalProvider) {
  dhModalProvider.config.computerSnapshot = {
    templateUrl: require('./__init__').PATH + '/computer-snapshot-modal.controller.html',
    controller: 'computerSnapshotModalCtrl'
  }
}

module.exports = computerSnapshotModalConfig

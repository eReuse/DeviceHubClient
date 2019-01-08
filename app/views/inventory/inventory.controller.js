function inventoryCtrl ($scope, progressBar) {
  progressBar.complete()
  $('#dh-loading').fadeOut(800)
}

module.exports = inventoryCtrl


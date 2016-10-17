function modalConfig ($uibModalProvider) {
  var ops = $uibModalProvider.options
  ops.animation = true
  ops.size = 'lg'
  ops.keyboard = true
  ops.windowClass = 'modal-xl'
  ops.backdrop = 'static'
}

module.exports = modalConfig

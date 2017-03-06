function dhModalProvider () {
  let self = this
  this.config = {}
  this.$get = $uibModal => { // factory
    return {
      open: (modalName, resolve) => {
        if (!(modalName in self.config)) throw TypeError('There is no config for modal ' + modalName)
        self.config[modalName].resolve = resolve
        return $uibModal.open(self.config[modalName])
      }
    }
  }
}

module.exports = dhModalProvider

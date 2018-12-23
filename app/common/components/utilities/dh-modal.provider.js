/** @module dh-modal-provider */

function dhModalProvider () {
  let self = this
  this.config = {}

  function factory ($uibModal) {
    /**
     * @alias module:dh-modal-provider.open
     * @param modalName
     * @param resolve
     * @return {*}
     */
    function open (modalName, resolve) {
      if (!(modalName in self.config)) throw TypeError('There is no config for modal ' + modalName)
      self.config[modalName].resolve = resolve
      return $uibModal.open(self.config[modalName])
    }

    return {
      open: open
    }
  }

  this.$get = factory
}

module.exports = dhModalProvider

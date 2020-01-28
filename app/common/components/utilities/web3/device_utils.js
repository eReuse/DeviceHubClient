const functions = {
  deployDevices: (factory, devices, owner, web3) => {
    return deployDevices(factory, devices, owner, web3)
  }
}

/**
 * Function to register into the Blockchain all the devices included in
 * the received DeliveryNote.
 * @param {Function} factory Instance of the DeviceFactory smart contract.
 * @param {Array} devices List of the devices to be registered.
 * @param {string} owner Address of the owner of the devices.
 * @param {Function} web3 Web3.js library.
 * @returns {Promise} A promise which resolves to the list of
 *                    deployed devices.
 */
function deployDevices (factory, devices, owner, web3) {
  return new Promise(resolve => {
    let deployedDevices = []
    for (let d in devices) {
      let current = devices[d]
      factory.createDevice(current.model, 0,
        web3.utils.toChecksumAddress(owner), { from: web3.eth.defaultAccount })
        .then(d => {
          deployedDevices.push(d)
          resolve(deployDevices)
        })
    }
  })
}

module.exports = functions

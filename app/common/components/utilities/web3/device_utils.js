const deviceArtifacts = require('../../../../eReuse-Blockchain/build/contracts/DepositDevice')
const deployments = require('./deployment_utils')

const functions = {
  deployDevices: (factory, devices, owner, web3) => {
    return deployDevices(factory, devices, owner, web3)
  },
  getDeployedDevice: (contract, provider, deviceAddress) => {
    return deployments.getContractInstance(contract, provider, deviceAddress,
      deviceArtifacts)
  }
}

/**
 * Function to register into the Blockchain all the devices included in
 * the received DeliveryNote.
 * @param {Function} factory Instance of the DeviceFactory smart contract.
 * @param {Array} devices List of the devices to be registered.
 * @param {string} owner Address of the owner of the devices.
 * @param {Function} web3 Web3.js library.
 */
function deployDevices (factory, devices, owner, web3) {
  return new Promise(resolve => {
    let deployedDevices = []
    for (let d of devices) {
      factory.createDevice(d.model, 0, owner, {
        from: web3.eth.defaultAccount,
        gas: '6721975'
      }).then(receipt => {
        let deviceAddress = extractDeviceAddress(web3, receipt)
        deployedDevices.push(deviceAddress)
      })
    }
    resolve(deployedDevices)
  })
}

/**
 * Auxiliar function to retrieve the address of the deployed device.
 * @param {Function} web3 Web3.js library.
 * @param {JSON} receipt JSON representation of the transaction receipt.
 * @returns {string} Ethereum address of the device.
 */
function extractDeviceAddress (web3, receipt) {
  return web3.utils.toChecksumAddress(receipt.logs[0].args._deviceAddress)
}

module.exports = functions

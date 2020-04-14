const deployments = require('./web3/deployment_utils')
const deliveryNoteUtils = require('./web3/deliverynote_utils')
const devicesUtils = require('./web3/device_utils')
const proofUtils = require('./web3/proof_utils')
// const accountsUtils = require('./web3/account_utils')

/**generate
 * Returns a global progressBar singleton.
 *
 * @param ngProgressFactory
 * @returns {progressBar}
 */
function web3Service($window) {
  const provider = new $window.web3.providers.WebsocketProvider('ws://' + $window.CONSTANTS.blockchain + ':8545')
  const web3 = new $window.web3(provider)
  const contract = $window.contract
  let deviceFactory, erc20, dao

  deployments.deployContracts(web3, contract, provider).then(res => {
    deviceFactory = res[0]
    erc20 = res[1]
    dao = res[2]
  })

  const service = {
    initTransfer: (obj) => {
      console.log(obj)
      let sender = web3.utils.toChecksumAddress(obj.sender)
      let receiver = web3.utils.toChecksumAddress(obj.receiver_address)
      let transferResult = initTransfer(contract, provider, deviceFactory, dao,
        sender, receiver, obj.devices, web3)
      return transferResult
    },
    acceptTransfer: (obj) => {
      console.log(obj)
      let receiver = web3.utils.toChecksumAddress(obj.receiver_address)
      let deposit = parseInt(obj.deposit)
      let deliverynoteAddress = web3.utils.toChecksumAddress(obj.deliverynote_address)
      let transfer = acceptTransfer(web3, contract, provider, erc20,
        deliverynoteAddress, receiver, deposit, erc20)
      return transfer
    },
    generateProofs: (proofs) => {
      // TODO
    },
    generateProof: (obj) => {
      console.log(obj)
      return generateProof(web3, contract, provider, obj.deviceAddress, obj.type, obj.data)
    },
    getProof: (obj) => {
      return devicesUtils.getDeployedDevice(contract, provider, obj.deviceAddress)
        .then(device => {
          return proofUtils.getProofData(device, obj.type, obj.hash, web3.eth.defaultAccount)
        })
    }
  }
  return service
}

/** Function that implements the initialization of a DeliveryNote transfer.
  * @param {Function} contract eth contract library.
  * @param {Function} provider blockchain provider.
  * @param {Function} deviceFactory smart contract for deviceFactory.
  * @param {Function} dao smart contract for dao.
  * @param {string} sender Ethereum address of sender (and transaction emmitter).
  * @param {string} receiver Ethereum address of receiver.
  * @param {Array} devices List of devices to be added to the DeliveryNote.
  * @param {Function} web3 Web3.js library
  * @returns {Promise} Promise which resolves to DeliveryNote address.
  */
function initTransfer(contract, provider, deviceFactory, dao, sender, receiver, devices, web3) {
  console.log(devices)
  return new Promise(async function (resolve) {
    let deployedDevices = await devicesUtils.deployDevices(deviceFactory, devices, sender, web3)
    let devicesAddresses = Object.keys(deployedDevices).map(function (key) { return deployedDevices[key] })
    let deliveryNote = await deliveryNoteUtils.createDeliveryNote(contract, provider,
      devicesAddresses, sender, receiver, dao)
    await deliveryNote.emitDeliveryNote({ from: sender, gas: '6721975' })
    console.log(`Delivery note address in InitTransfer: ${deliveryNote.address}`)
    console.log(deployedDevices)
    resolve({deliverynote_address: deliveryNote.address, device_addresses: deployedDevices})
  })
}

/** Function that implements the acceptance of a DeliveryNote
* transfer
* @param {Function} web3 Web3 library.
* @param {Function} contract eth contract library.
* @param {Function} provider blockchain provider.
* @param {Function} erc20 smart contract for erc20.
* @param {string} deliverynote_address Ethereum address of deliveryNote Contract
* @param {string} receiver Ethereum address of receiver.
* @param {number} deposit Deposit agreed.
* @returns {Promise} Promise that resolves to boolean
*/
function acceptTransfer(web3, contract, provider, erc20, deliveryNoteAddress,
  receiver, deposit, erc20) {
  console.log('AcceptTransfer')
  console.log(`Delivery Note: ${deliveryNoteAddress}`)
  return new Promise(async function (resolve) {
    await erc20.approve(deliveryNoteAddress, deposit, { from: receiver, gas: '6721975' })
    let deliveryNote = await deliveryNoteUtils.getDeliveryNote(contract,
      provider, deliveryNoteAddress)
    let owner = await deliveryNote.owner()
    let devices = await deliveryNote.getDevices({ from: owner })
    let data = {
      'supplier': await deliveryNote.getSender({ from: owner }),
      'receiver': receiver,
      'deposit': deposit,
      'isWaste': false
    }
    let hashes = {}
    for (d in devices) {
      let device = await devicesUtils.getDeployedDevice(contract, provider, devices[d])
      let device_id = await device.getUid()
      hashes[device_id] = await generateProof(web3, contract, provider, devices[d],
        'ProofTransfer', data)
    }
    await deliveryNote.acceptDeliveryNote(deposit, { from: receiver, gas: '6721975' })
    resolve(hashes)
  })
}

/**
* Function to generate a proof and return its associated hass.
* @param {Function} web3 web3 library.
* @param {Function} contract eth-contract library.
* @param {JSON} data input information to generate proof.
* @returns {Promise} Promise which resolves to proof hash.
*/
function generateProof(web3, contract, provider, deviceAddress, proofType, data) {
  return new Promise(resolve => {
    devicesUtils.getDeployedDevice(contract, provider, deviceAddress)
      .then(device => {
        resolve(proofUtils.generateProof(web3, device, proofType, data))
      })
  })
}

module.exports = web3Service

const deployments = require('./deployment_utils')
const deliveryNoteArtifacts = require('../../../../eReuse-Blockchain/build/contracts/DeliveryNote')
const deviceArtifacts = require('../../../../eReuse-Blockchain/build/contracts/DepositDevice')

const functions = {
  createDeliveryNote: (contract, provider, devices, sender, receiver, dao) => {
    return createDeliveryNote(contract, provider, devices, sender, receiver, dao)
  },
  acceptDeliveryNote: (contract, provider, deliveryNoteAddress, receiver, deposit) => {
    return acceptDeliveryNote(contract, provider, deliveryNoteAddress, receiver, deposit)
  }
}

/**
 * Auxiliary function to create an instance of DeliveryNote
 * smart contract as it has not been previously deployed.
 * @param {Function} contract Structure of the DeliveryNote
 *                            smart contract.
 * @param {string} sender Address of the sender.
 * @param {string} receiver Address of the sender.
 * @param {Function} dao Structure of the DAO smart contract.
 * @returns {Promise} A promise which resolves to the DeliveryNote
 *                    smart contract instance.
 */
function createDeliveryNoteInstance (contract, sender, receiver, dao) {
  return new Promise(resolve => {
    contract.new(receiver, dao.address, { from: sender }).then(instance => {
      resolve(instance)
    })
  })
}

/**
 * Function to create the DeliveryNote that will be sent to the second owner
 * inside the Blockchain.
 * @param {Function} contract truffle-contract library.
 * @param {Function} provider Blockchain provider configuration.
 * @param {Array} devices List of devices to be added to the DeliveryNote.
 * @param {String} sender String representation of the sender ethereum address.
 * @param {String} receiver String representation of the receiver ethereum address.
 * @param {Function} dao Instance of the DAO smart contract.
 * @return {Promise} A promise which resolves to the DeliveryNote contract
 */
function createDeliveryNote (contract, provider, devices, sender, receiver, dao) {
  let deliveryNoteContract = deployments.initializeContract(contract, provider,
    deliveryNoteArtifacts)
  return new Promise(resolve => {
    createDeliveryNoteInstance(deliveryNoteContract, sender, receiver, dao)
      .then(async function (deliveryNote) {
        for (let d in devices) {
          let current = devices[d]
          await deployments.getContractInstance(contract, provider, current, deviceArtifacts)
            .then(async function (instance) {
              await instance.addToDeliveryNote(deliveryNote.address, { from: sender })
            })
        }
        resolve(deliveryNote)
      })
  })
}

/**
 * Function to accept the DeliveryNote sent by previous owner.
 * @param {Function} contract truffle-contract library.
 * @param {Function} provider Blockchain provider configuration.
 * @param {String} deliveryNoteAddress String representation of the Delivery
 *                 Note ethereum address.
 * @param {String} receiver String representation of the receiver ethereum address.
 * @param {Number} deposit Value of the deposit to be paid.
 * @return {Promise} A promise which resolves to true if the operation succeeded
 */
function acceptDeliveryNote (contract, provider, deliveryNoteAddress, receiver, deposit) {
  return new Promise(resolve => {
    deployments.getContractInstance(contract, provider, deliveryNoteAddress,
      deliveryNoteArtifacts)
      .then(deliveryNote => {
        deliveryNote.acceptDeliveryNote(deposit, {from: receiver})
          .then(() => {
            resolve(true)
          })
      })
  })
}

module.exports = functions

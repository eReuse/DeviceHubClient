const DataWipeProof = require('./proofs/DataWipeProof')
const FunctionProof = require('./proofs/FunctionProof')
const ReuseProof = require('./proofs/ReuseProof')
const RecycleProof = require('./proofs/RecycleProof')
const DisposalProof = require('./proofs/DisposalProof')
const deviceUtils = require('./device_utils')

const functions = {
  generateProof: (web3, device, type, data) => {
    return generateProof(web3, device, type, data)
  },
  getAllOwnerProofs: (contract, provider, owner) => {
    return getAllOwnerProofs(contract, provider, owner)
  }
}

let proofTypes = {
  WIPE: 'wipe',
  FUNCTION: 'function',
  DISPOSAL: 'disposal',
  RECYCLE: 'recycle',
  REUSE: 'reuse'
}

/**
 * Extracts all proofs from all the devices of a given owner.
 * @param {Function} contract truffle-contract library.
 * @param {Function} provider blockchain provider configuration.
 * @param {string} owner ethereum address from owner.
 */
function getAllOwnerProofs (contract, provider, owner) {
  let proofHashes = []
  return new Promise(resolve => {
    deviceUtils.getDeployedDevicePerOwner(owner).then(devices => {
      devices.foreach((deviceAddress) => {
        extractProofsFromDevice(contract, provider, deviceAddress).then(hashes => {
          proofHashes += hashes
        })
      })
      resolve(proofHashes)
    })
  })
}

/**
 * Extracts all proofs from a given device.
 * @param {Function} contract truffle-contract library.
 * @param {Function} provider blockchain provider configuration.
 * @param {string} deviceAddress ethereum address from device.
 */
function extractProofsFromDevice (contract, provider, deviceAddress) {
  let proofs = []
  return new Promise(resolve => {
    functions.getDeployedDevice(contract, provider, deviceAddress).then(device => {
      proofTypes.foreach(type => {
        device.getProofs(type).then(hash => {
          proofs.push({ 'type': proofTypes[type], 'hash': hash })
        })
      })
      resolve(proofs)
    })
  })
}

/**
 * Generates the proof corresponding to the received type and maps it
 * to its corresponding device in the blockchain.
 * @param {Function} web3 Web3.js library.
 * @param {Function} device Blockchain smart contract object.
 * @param {string} type Type of the proof to be generated.
 * @param {JSON} data JSON structure with the information needed for the
 *                    proof to be generated.
 * @returns {Promise} A promise that resolves to the ethereum address of the
 *                    generated proof.
 */
function generateProof (web3, device, type, data) {
  let proof
  switch (type) {
    case proofTypes.WIPE:
      proof = new DataWipeProof(web3, data)
      break
    case proofTypes.FUNCTION:
      proof = new FunctionProof(web3, data)
      break
    case proofTypes.REUSE:
      proof = new ReuseProof(web3, data)
      break
    case proofTypes.RECYCLE:
      proof = new RecycleProof(web3, data)
      break
    case proofTypes.DISPOSAL:
      proof = new DisposalProof(web3, data)
      break
    default:
      break
  }
  return proof.generateProof(device, web3.eth.defaultAccount)
}

module.exports = functions

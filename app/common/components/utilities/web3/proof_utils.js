const DataWipeProof = require('./proofs/DataWipeProof')
const FunctionProof = require('./proofs/FunctionProof')
const ReuseProof = require('./proofs/ReuseProof')
const RecycleProof = require('./proofs/RecycleProof')
const TransferProof = require('./proofs/TransferProof')
const deviceUtils = require('./device_utils')

const functions = {
  generateProof: (web3, device, type, data) => {
    let proof = getProof(device, type)
    let receipt = proof.generateProof(web3, data, web3.eth.defaultAccount)
    return extractHashFromReceipt(receipt)
  },
  getProofData: (device, type, hash, account) => {
    return getProof(device, hash, type).getProofData(hash, account)
  },
  getAllOwnerProofs: (contract, provider, owner) => {
    return getAllOwnerProofs(contract, provider, owner)
  }
}

let proofTypes = {
  WIPE: 'ProofDataWipe',
  FUNCTION: 'ProofFunction',
  TRANSFER: 'ProofTransfer',
  RECYCLE: 'ProofRecycling',
  REUSE: 'ProofReuse'
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
 * Returns the proof object corresponding to the received type.
 * @param {Function} web3 Web3.js library.
 * @param {Function} device Blockchain smart contract object.
 * @param {string} type Type of the proof to be generated.
 * @param {JSON} data JSON structure with the information needed for the
 *                    proof to be generated.
 * @returns {Promise} A promise that resolves to the ethereum address of the
 *                    generated proof.
 */
function getProof (device, type) {
  switch (type) {
    case proofTypes.WIPE:
      return new DataWipeProof(device)
    case proofTypes.FUNCTION:
      return new FunctionProof(device)
    case proofTypes.REUSE:
      return new ReuseProof(device)
    case proofTypes.RECYCLE:
      return new RecycleProof(device)
    case proofTypes.TRANSFER:
      return new TransferProof(device)
    default:
      break
  }
}

/**
 * Returns the block information stored for a given proof. Used for the block
 * explorer.
 * @param {Function} device Blockchain smart contract object.
 * @param {string} hash unique proof identifier.
 * @param {string} type type of the proof.
 * @returns {Promise} A promise that resolves to the block information related
 *                    to some proof.
 */
function getProofBlockInfo (device, hash, type) {
  return device.getProof(hash, type)
}

/**
 * Returns the hash of the generated proof, which is obtained from the events
 * logged within the receipt of the transaction.
 * @param transaction promise containing the result of the transaction.
 * @returns the hash of the generated proof.
 */
function extractHashFromReceipt (transaction) {
  return transaction.then(receipt => {
    return receipt.logs[0].args.proofHash
  })
}

function getSampleWipeProofs () {
  return {
    'deviceAddress': '0x758D0639aB9C4Cb9cCF4f99557ba33926f8eE1E3',
    'type': 'ProofDataWipe',
    'data': {
      'erasureType': 'Full',
      'date': '05-03-2020',
      'result': 'true',
      'proofAuthor': '0x11891834542c32C509Aa1Eae38Dfccb5288EDa2b'
    }
  }
}

function getSampleFunctionProofs () {
  return {
    'deviceAddress': '0x758D0639aB9C4Cb9cCF4f99557ba33926f8eE1E3',
    'type': 'ProofDataFunction',
    'data': {
      'score': 5,
      'diskUsage': 24,
      'algorithmVersion': 'v1.3',
      'proofAuthor': '0x11891834542c32C509Aa1Eae38Dfccb5288EDa2b'
    }
  }
}

function getSampleRecycleProofs () {
  return {
    'deviceAddress': '0x758D0639aB9C4Cb9cCF4f99557ba33926f8eE1E3',
    'type': 'ProofRecycling',
    'data': {
      'collectionPoint': 'Donalo',
      'date': '2014-10-23',
      'contact': 'Alguien',
      'ticket': 'iuxb387be',
      'gpsLocation': '12.34543, -2.23214'
    }
  }
}

function getSampleReuseProofs () {
  return {
    'deviceAddress': '0x758D0639aB9C4Cb9cCF4f99557ba33926f8eE1E3',
    'type': 'ProofReuse',
    'data': {
      'receiverSegment': 'segment_1',
      'idReceipt': 'aiub8d77hs98',
      'supplier': '0x37be35ae7eced44ca25e4683e98425fc7830a8a5',
      'receiver': '0x4001645acd201b1889920250ec7040d846031615',
      'price': 50
    }
  }
}

module.exports = functions

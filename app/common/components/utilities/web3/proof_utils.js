const DatawipeProof = require('./proofs/DataWipeProof')
const FunctionProof = require('./proofs/FunctionProof')
const ReuseProof = require('./proofs/ReuseProof')
const RecycleProof = require('./proofs/RecycleProof')
const DisposalProof = require('./proofs/DisposalProof')

const proofTypes = {
  WIPE: 'wipe',
  FUNCTION: 'function',
  REUSE: 'reuse',
  RECYCLE: 'recycle',
  DISPOSAL: 'disposal'
}

const functions = {
  generateProof: (web3, proofFactory, proofContract, type, data) => {
    return generateProof(web3, proofFactory, proofContract, type, data)
  }
}

/**
 * Generates the proof corresponding to the received type and maps it
 * to its corresponding device in the blockchain.
 * @param {Function} web3 Web3.js library.
 * @param {Function} proofFactory Blockchain smart contract object.
 * @param {Function} proofContract Blockchain smart contract object.
 * @param {string} type Type of the proof to be generated.
 * @param {JSON} data JSON structure with the information needed for the
 *                    proof to be generated.
 * @returns {Promise} A promise that resolves to the ethereum address of the
 *                    generated proof.
 */
function generateProof (web3, proofFactory, proofContract, type, data) {
  let proof
  switch (type) {
    case proofTypes.WIPE:
      proof = new DatawipeProof(web3, data)
      break/** */
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
  return proof.generateProof(proofFactory, proofContract, type,
    web3.eth.defaultAccount)
}

module.exports = functions

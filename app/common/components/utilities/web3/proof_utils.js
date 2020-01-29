const deployments = require('./deployment_utils')
const proofDatawipe = require('./proofs/DataWipeProof')
const proofFunction = require('./proofs/FunctionProof')
const proofReuse = require('./proofs/ReuseProof')
const proofRecycle = require('./proofs/RecycleProof')

const proofs = {
  WIPE: 'wipe',
  FUNCTION: 'function',
  REUSE: 'reuse',
  RECYCLE: 'recycle'
}

const functions = {
  generateProof: (web3, type, data) => {
    generateProof(web3, type, data)
  }
}

function generateProof (web3, type, data) {
  let proof
  switch (type) {
    case proofs.WIPE:
      proof = proofDatawipe(data)
      break
    case proofs.FUNCTION:
      proof = proofFunction(data)
      break
    case proofs.REUSE:
      proof = proofReuse(data)
      break
    case proofs.RECYCLE:
      proof = proofRecycle(data)
      break
    default:
      break
  }
  proof.generateProof(web3)
}

module.exports = functions

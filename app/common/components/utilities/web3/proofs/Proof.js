/* eslint no-useless-constructor: "error" */
const path = require('path')
const deployments = require('../deployment_utils')

const proofFactoryArtifacts = require(path.join(process.env.PWD, 'app', 'truffle',
  'build', 'contracts', 'ProofFactory'))
const proofsArtifacts = require(path.join(process.env.PWD, 'app', 'truffle',
  'build', 'contracts', 'Proofs'))

class Proof {
  constructor (contractLib, provider, data) {
    this.proofTypes = this.initializeProofEnum()
    this.initializeContracts(contractLib, provider)
    this.extractData(data)
  }

  initializeProofEnum () {
    return {
      WIPE: 0,
      FUNCTION: 1,
      REUSE: 2,
      RECYCLE: 3
    }
  }

  initializeContracts (contractLib, provider) {
    let factoryContract = deployments.initializeContract(contractLib, provider,
      proofFactoryArtifacts)
    let pfContract = deployments.initializeContract(contractLib, provider,
      proofsArtifacts)

    this.factory = deployments.selectContractInstance(factoryContract)
    this.proofsContract = deployments.selectContractInstance(pfContract)
  }

  generateProof () {
    throw Error('Not implemented function')
  }

  extractData (data) {
    this.device = data.device
  }

  createProofContract () {
    throw Error('Not implemented function')
  }
}

module.exports = Proof

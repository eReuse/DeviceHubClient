const Proof = require('./Proof')
const deployments = require('../deployment_utils')
const functionArtifacts = require('../../../../truffle/build/contracts/FunctionProof')

class ProofFunction extends Proof {
  constructor (data) {
    super()
    this.extractData(data)
  }

  generateProof (web3) {

  }
  extractData (data) {
    super.extractData(data)
    this.rating = data.rating
    // this.version = data.version
    // this.algorithm = data.algorithm
  }
}

module.exports = ProofFunction

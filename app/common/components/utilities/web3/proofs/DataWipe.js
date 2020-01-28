const Proof = require('./Proof')
const deployments = require('../deployment_utils')
const wipeArtifacts = require('../../../../truffle/build/contracts/DataWipeProof')

class ProofDataWipe extends Proof {
  constructor (data) {
    super()
    this.extractData(data)
  }

  generateProof (web3) {
    
  }

  extractData (data) {
    super.extractData(data)
    this.erasureType = data.erasure
    this.result = data.result
    this.date = data.date
  }
}

module.exports = ProofDataWipe

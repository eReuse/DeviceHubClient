const Proof = require('./Proof')
const deployments = require('../deployment_utils')
const reuseArtifacts = require('../../../../truffle/build/contracts/ReuseProof')

class ProofReuse extends Proof {
  constructor (data) {
    super()
    this.extractData(data)
  }

  generateProof (web3) {
    
  }

  extractData (data) {
    super.extractData(data)
    this.algo = data.algo
  }
  
}

module.exports = ProofReuse

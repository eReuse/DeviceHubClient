const Proof = require('./Proof')
const path = require('path')
const artifactsPath = path.join(process.env.PWD, 'app', 'truffle', 'build', 'contracts',
  'FunctionProof')
const artifacts = require(artifactsPath)

class ProofFunction extends Proof {
  constructor (contract, provider, data) {
    super(contract, provider, artifacts)
    this.extractData(data)
  }

  createProofContract () {
    return new Promise(resolve => {
      this.factory.generateFunction(this.rating).then(instance => {
        resolve(instance)
      })
    })
  }

  generateProof () {
    this.createProofContract().then(result => {
      this.proofsContract.addProof(this.device, this.proofTypes.FUNCTION, result)
    })
  }

  extractData (data) {
    this.rating = data.rating
    // this.version = data.version
    // this.algorithm = data.algorithm
  }
}

module.exports = ProofFunction

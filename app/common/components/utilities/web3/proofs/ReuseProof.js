const Proof = require('./Proof')
const path = require('path')
const artifactsPath = path.join(process.env.PWD, 'app', 'truffle', 'build', 'contracts',
  'ReuseProof')
const artifacts = require(artifactsPath)

class ProofReuse extends Proof {
  constructor (contract, provider, data) {
    super(contract, provider, artifacts)
    this.extractData(data)
  }

  createProofContract () {
    return new Promise(resolve => {
      this.factory.generateReuse(this.algo).then(instance => {
        resolve(instance)
      })
    })
  }

  generateProof () {
    this.createProofContract().then(result => {
      this.proofsContract.addProof(this.device, this.proofTypes.REUSE, result)
    })
  }

  extractData (data) {
    this.algo = data.algo
  }
}

module.exports = ProofReuse

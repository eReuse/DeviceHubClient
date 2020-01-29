const Proof = require('./Proof')
const path = require('path')
const artifactsPath = path.join(process.env.PWD, 'app', 'truffle', 'build', 'contracts',
  'DataWipeProof')
const artifacts = require(artifactsPath)

class ProofDataWipe extends Proof {
  constructor (contract, provider, data) {
    super(contract, provider, artifacts)
    this.extractData(data)
  }

  createProofContract () {
    return new Promise(resolve => {
      this.factory.generateDataWipe(this.erasureType, this.result, this.date).then(instance => {
        resolve(instance)
      })
    })
  }

  generateProof () {
    this.createProofContract().then(result => {
      this.proofsContract.addProof(this.device, this.proofTypes.WIPE, result)
    })
  }

  extractData (data) {
    this.erasureType = data.erasure
    this.result = data.result
    this.date = data.date
  }
}

module.exports = ProofDataWipe

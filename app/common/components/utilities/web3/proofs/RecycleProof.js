const Proof = require('./Proof')
const path = require('path')
const artifactsPath = path.join(process.env.PWD, 'app', 'truffle', 'build', 'contracts',
  'RecycleProof')
const artifacts = require(artifactsPath)

class ProofRecycle extends Proof {
  constructor (web3, contract, provider, data) {
    super(web3, contract, provider, artifacts)
    this.extractData(data)
  }

  createProofContract () {
    return new Promise(resolve => {
      this.factory.generateRecycle(this.collectionPoint, this.timestamp,
        this.contact).then(instance => {
        resolve(instance)
      })
    })
  }

  generateProof () {
    this.createProofContract().then(result => {
      this.proofsContract.addProof(this.device, this.proofTypes.RECYCLE, result)
    })
  }

  extractData (data) {
    this.collectionPoint = data.collectionPoint
    this.timestamp = data.time
    this.contact = data.contact
    // this.ticket = data.ticket
  }
}

module.exports = ProofRecycle

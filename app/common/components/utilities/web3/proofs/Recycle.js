const Proof = require('./Proof')

class ProofRecycle extends Proof {
  constructor (data) {
    super()
    this.extractData(data)
  }

  generateProof (web3) {
    console.log('Recycle Proof. Attributes')
  }

  extractData (data) {
    super.extractData(data)
    this.collectionPoint = data.collectionPoint
    this.timestamp = data.time
    this.contact = data.contact
    // this.ticket = data.ticket
  }
}

module.exports = ProofRecycle

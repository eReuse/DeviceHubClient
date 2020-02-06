const Proof = require('./Proof')

class RecycleProof extends Proof {
  constructor (web3, data) {
    super(web3, data)
    this.extractData(web3, data)
  }

  createProofContract (proofFactory) {
    return new Promise(resolve => {
      proofFactory.generateRecycle(this.collectionPoint, this.timestamp,
        this.contact).then(instance => {
        resolve(instance)
      })
    })
  }

  extractData (web3, data) {
    this.collectionPoint = data.collectionPoint
    this.timestamp = data.time
    this.contact = data.contact
    // this.ticket = data.ticket
  }
}

module.exports = RecycleProof

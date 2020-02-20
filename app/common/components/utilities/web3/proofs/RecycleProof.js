const Proof = require('./Proof')

class RecycleProof extends Proof {
  constructor (web3, data) {
    super(web3, data)
    this.extractData(web3, data)
  }

  generateProof (device, account) {
    return new Promise(resolve => {
      return device.generateRecycleProof(this.collectionPoint, this.date,
        this.contact, this.ticket, { from: account })
        .then(hash => {
          resolve(hash)
        })
    })
  }

  extractData (web3, data) {
    this.collectionPoint = data.collectionPoint
    this.date = data.date
    this.contact = data.contact
    this.ticket = data.ticket
  }
}

module.exports = RecycleProof

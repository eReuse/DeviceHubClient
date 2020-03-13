class RecycleProof {
  constructor (device) {
    this.device = device
  }

  generateProof (web3, data, account) {
    return new Promise(resolve => {
      this.device.generateRecycleProof(data.collectionPoint, data.date,
        data.contact, data.ticket, data.gpsLocation, { from: account })
        .then(receipt => {
          resolve(receipt)
        })
    })
  }

  getProofData (hash, account) {
    return new Promise(resolve => {
      this.device.getRecycleProof(hash, { from: account })
        .then(data => {
          resolve(data)
        })
    })
  }
}

module.exports = RecycleProof

class RecycleProof {
  constructor (device) {
    this.device = device
  }

  generateProof (web3, data, account) {
    return new Promise(resolve => {
      this.device.generateRecycleProof(data.collectionPoint, data.date.toString(),
        data.contact, data.ticket, data.gpsLocation, data.recyclerCode,
        { from: account })
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

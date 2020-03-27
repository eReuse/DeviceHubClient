class ReuseProof {
  constructor (device) {
    this.device = device
  }

  generateProof (web3, data, account) {
    return new Promise(resolve => {
      this.device.generateReuseProof(data.receiverSegment, data.idReceipt,
        web3.utils.toChecksumAddress(data.receiver), data.price,
        { from: account })
        .then(receipt => {
          resolve(receipt)
        })
    })
  }

  getProofData (hash, account) {
    return new Promise(resolve => {
      this.device.getReuseProof(hash, { from: account })
        .then(data => {
          resolve(data)
        })
    })
  }
}

module.exports = ReuseProof

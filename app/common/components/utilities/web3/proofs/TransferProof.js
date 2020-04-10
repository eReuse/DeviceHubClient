class TransferProof {
  constructor (device) {
    this.device = device
  }

  generateProof (web3, data, account) {
    return new Promise(resolve => {
      return this.device.generateTransferProof(
        web3.utils.toChecksumAddress(data.supplier),
        web3.utils.toChecksumAddress(data.receiver),
        data.deposit, data.isWaste, { from: account })
        .then(hash => {
          resolve(hash)
        })
    })
  }

  getProofData (hash, account) {
    return new Promise(resolve => {
      return this.device.getTransferProof(hash, { from: account })
        .then(data => {
          resolve(data)
        })
    })
  }
}

module.exports = TransferProof

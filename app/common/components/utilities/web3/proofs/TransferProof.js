const Proof = require('./Proof')

class TransferProof extends Proof {
  constructor (web3, data) {
    super(web3, data)
    this.extractData(web3, data)
  }

  generateProof (device, account) {
    return new Promise(resolve => {
      return device.generateTransferProof(this.supplier, this.receiver,
        this.deposit, this.isWaste, { from: account })
        .then(hash => {
          resolve(hash)
        })
    })
  }

  extractData (web3, data) {
    this.supplier = web3.utils.toChecksumAddress(data.supplier)
    this.receiver = web3.utils.toChecksumAddress(data.receiver)
    this.deposit = data.deposit
    this.isWaste = data.isWaste
  }
}

module.exports = TransferProof

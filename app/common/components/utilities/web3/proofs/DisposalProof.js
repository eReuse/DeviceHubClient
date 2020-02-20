const Proof = require('./Proof')

class DisposalProof extends Proof {
  constructor (web3, data) {
    super(web3, data)
    this.extractData(web3, data)
  }

  generateProof (device, account) {
    return new Promise(resolve => {
      return device.generateDisposalProof(this.origin, this.destination,
        this.deposit, this.isResidual, { from: account })
        .then(hash => {
          resolve(hash)
        })
    })
  }

  extractData (web3, data) {
    this.origin = web3.utils.toChecksumAddress(data.origin)
    this.destination = web3.utils.toChecksumAddress(data.destination)
    this.deposit = data.deposit
    this.isResidual = data.residual
  }
}

module.exports = DisposalProof

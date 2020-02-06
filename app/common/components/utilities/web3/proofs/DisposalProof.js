const Proof = require('./Proof')

class DisposalProof extends Proof {
  constructor (web3, data) {
    super(web3, data)
    this.extractData(web3, data)
  }

  createProofContract (proofFactory, account) {
    return new Promise(resolve => {
      proofFactory.generateDisposal(this.origin, this.destination, this.deposit,
        {from: account})
        .then(instance => {
          resolve(instance)
        })
    })
  }

  extractData (web3, data) {
    this.origin = web3.utils.toChecksumAddress(data.origin)
    this.destination = web3.utils.toChecksumAddress(data.destination)
    this.deposit = data.deposit
  }
}

module.exports = DisposalProof

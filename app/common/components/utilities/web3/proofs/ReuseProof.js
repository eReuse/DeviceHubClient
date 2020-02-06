const Proof = require('./Proof')

class ReuseProof extends Proof {
  constructor (web3, data) {
    super(web3, data)
    this.extractData(web3, data)
  }

  createProofContract (proofFactory, account) {
    return new Promise(resolve => {
      proofFactory.generateReuse({from: account}).then(instance => {
        resolve(instance)
      })
    })
  }

  extractData (web3, data) {}
}

module.exports = ReuseProof

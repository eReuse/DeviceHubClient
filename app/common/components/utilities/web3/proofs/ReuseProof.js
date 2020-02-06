const Proof = require('./Proof')

class ReuseProof extends Proof {
  constructor (web3, data) {
    super(web3, data)
    this.extractData(web3, data)
  }

  createProofContract (proofFactory) {
    return new Promise(resolve => {
      proofFactory.generateReuse(this.algo).then(instance => {
        resolve(instance)
      })
    })
  }

  extractData (web3, data) {}
}

module.exports = ReuseProof

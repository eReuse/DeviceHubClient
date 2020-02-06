const Proof = require('./Proof')

class FunctionProof extends Proof {
  constructor (data) {
    super(data)
    this.extractData(data)
  }

  createProofContract (proofFactory, account) {
    return new Promise(resolve => {
      proofFactory.generateFunction(this.rating, {from: account}).then(instance => {
        resolve(instance)
      })
    })
  }

  extractData (data) {
    this.rating = data.rating
    this.version = data.version
    this.algorithm = data.algorithm
  }
}

module.exports = FunctionProof

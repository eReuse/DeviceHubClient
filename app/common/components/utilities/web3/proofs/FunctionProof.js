const Proof = require('./Proof')

class FunctionProof extends Proof {
  constructor (data) {
    super(data)
    this.extractData(data)
  }

  createProofContract (proofFactory, account) {
    return new Promise(resolve => {
      proofFactory.generateFunction(this.rating, this.usage,
        {from: account}).then(instance => {
          resolve(instance)
        })
    })
  }

  extractData (data) {
    this.rating = data.rating
    this.usage = data.usage
  }
}

module.exports = FunctionProof

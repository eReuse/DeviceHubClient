const Proof = require('./Proof')

class DataWipeProof extends Proof {
  constructor (web3, data) {
    super(web3, data)
    this.extractData(web3, data)
  }

  createProofContract (proofFactory) {
    return new Promise(resolve => {
      proofFactory.generateDataWipe(this.erasureType, this.result, this.date)
        .then(instance => {
          resolve(instance)
        })
    })
  }

  extractData (web3, data) {
    this.erasureType = data.erasure
    this.result = data.result
    this.date = data.date
  }
}

module.exports = DataWipeProof

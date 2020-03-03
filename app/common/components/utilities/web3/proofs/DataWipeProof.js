const Proof = require('./Proof')

class DataWipeProof extends Proof {
  constructor (web3, data) {
    super(web3, data)
    this.extractData(web3, data)
  }

  generateProof (device, account) {
    return new Promise(resolve => {
      return device.generateDataWipeProof(this.erasureType, this.date,
        this.result, { from: account })
        .then(hash => {
          resolve(hash)
        })
    })
  }

  extractData (web3, data) {
    this.erasureType = data.erasure
    this.date = data.date
    this.result = data.result
  }
}

module.exports = DataWipeProof

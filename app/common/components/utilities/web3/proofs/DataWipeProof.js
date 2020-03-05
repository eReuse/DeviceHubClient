const Proof = require('./Proof')

class DataWipeProof extends Proof {
  constructor (web3, data) {
    super(web3, data)
    this.extractData(web3, data)
  }

  generateProof (device, account) {
    return new Promise(resolve => {
      return device.generateDataWipeProof(this.erasureType, this.date,
        this.result, this.author, { from: account })
        .then(hash => {
          resolve(hash)
        })
    })
  }

  extractData (web3, data) {
    this.erasureType = data.erasureType
    this.date = data.date
    this.result = data.result
    this.proofAuthor = web3.utils.toChecksumAddress(data.author)
  }
}

module.exports = DataWipeProof

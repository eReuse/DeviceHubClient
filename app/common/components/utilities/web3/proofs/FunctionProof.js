const Proof = require('./Proof')

class FunctionProof extends Proof {
  constructor (data) {
    super(data)
    this.extractData(data)
  }

  generateProof (device, account) {
    return new Promise(resolve => {
      return device.generateFunctionProof(this.rating, this.usage, this.version,
        { from: account })
        .then(hash => {
          resolve(hash)
        })
    })
  }

  extractData (data) {
    this.rating = data.rating
    this.usage = data.usage
    this.version = data.version
  }
}

module.exports = FunctionProof

const Proof = require('./Proof')

class ReuseProof extends Proof {
  constructor (web3, data) {
    super(web3, data)
    this.extractData(web3, data)
  }

  generateProof (device, account) {
    return new Promise(resolve => {
      return device.generateReuseProof(this.price, { from: account })
        .then(hash => {
          resolve(hash)
        })
    })
  }

  extractData (web3, data) {
    this.price = data.price
  }
}

module.exports = ReuseProof

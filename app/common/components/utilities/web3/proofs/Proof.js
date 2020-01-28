/* eslint no-useless-constructor: "error" */
class Proof {
  constructor (data) {}

  generateProof (web3) {
    throw Error('Not implemented function')
  }

  extractData (data) {
    this.device = data.device
  }
}

module.exports = Proof

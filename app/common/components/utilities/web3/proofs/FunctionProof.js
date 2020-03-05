const Proof = require('./Proof')

class FunctionProof extends Proof {
  constructor (data) {
    super(data)
    this.extractData(data)
  }

  generateProof (device, account) {
    return new Promise(resolve => {
      return device.generateFunctionProof(this.score, this.diskUsage,
        this.algorithmVersion, this.proofAuthor, { from: account })
        .then(hash => {
          resolve(hash)
        })
    })
  }

  extractData (web3, data) {
    this.score = data.score
    this.diskUsage = data.diskUsage
    this.algorithmVersion = data.algorithmVersion
    this.proofAuthor = web3.utils.toChecksumAddress(data.author)
  }
}

module.exports = FunctionProof

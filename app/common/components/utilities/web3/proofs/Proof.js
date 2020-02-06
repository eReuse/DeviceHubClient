/* eslint no-useless-constructor: "error" */
class Proof {
  constructor (web3, data) {
    this.initializeProofEnum()
    this.device = web3.utils.toChecksumAddress(data.device)
  }

  initializeProofEnum () {
    this.proofTypes = {
      'wipe': 0,
      'function': 1,
      'reuse': 2,
      'recycle': 3,
      'disposal': 4
    }
  }

  generateProof (proofFactory, proofsContract, proofType, account) {
    return new Promise(resolve => {
      this.createProofContract(proofFactory, account).then(result => {
        return result
      }).then(resultingContract => {
        return proofsContract.addProof(this.device, this.proofTypes[proofType],
          resultingContract, {from: account})
      }).then(resultingProof => {
        resolve(resultingProof)
      })
    })
  }

  extractData (web3, data) {
    throw Error('Not implemented function')
  }

  createProofContract (proofFactory) {
    throw Error('Not implemented function')
  }
}

module.exports = Proof

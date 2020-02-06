/* eslint no-useless-constructor: "error" */
class Proof {
  constructor (web3, data) {
    this.initializeProofEnum()
    this.device = web3.utils.toChecksumAddress(data.device)
  }

  initializeProofEnum () {
    this.proofTypes = {
      WIPE: 0,
      FUNCTION: 1,
      REUSE: 2,
      RECYCLE: 3,
      DISPOSAL: 4
    }
  }

  generateProof (proofFactory, proofsContract, proofType) {
    return new Promise(resolve => {
      this.createProofContract(proofFactory).then(result => {
        return result
      }).then(resultingContract => {
        return proofsContract.addProof(this.device, proofType,
          resultingContract)
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

class FunctionProof {
  constructor (device) {
    this.device = device
  }

  generateProof (web3, data, account) {
    return new Promise(resolve => {
      this.device.generateFunctionProof(data.score, data.diskUsage,
        data.algorithmVersion, web3.utils.toChecksumAddress(data.proofAuthor),
        { from: account })
        .then(receipt => {
          resolve(receipt)
        })
    })
  }

  getProofData (hash, account) {
    return new Promise(resolve => {
      this.device.getFunctionProof(hash, { from: account })
        .then(data => {
          resolve(data)
        })
    })
  }
}

module.exports = FunctionProof

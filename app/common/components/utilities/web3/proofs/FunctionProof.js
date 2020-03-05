class FunctionProof {
  constructor (device) {
    this.device = device
  }

  generateProof (web3, data, account) {
    return new Promise(resolve => {
      return this.device.generateFunctionProof(data.score, data.diskUsage,
        data.algorithmVersion, web3.utils.toChecksumAddress(data.author),
        { from: account })
        .then(hash => {
          resolve(hash)
        })
    })
  }

  getProofData (hash, account) {
    return new Promise(resolve => {
      return this.device.getFunctionProof(hash, { from: account })
        .then(data => {
          resolve(data)
        })
    })
  }
}

module.exports = FunctionProof

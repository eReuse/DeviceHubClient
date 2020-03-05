
class DataWipeProof {
  constructor (device) {
    this.device = device
  }

  generateProof (web3, data, account) {
    return new Promise(resolve => {
      return this.device.generateDataWipeProof(data.erasureType, data.date,
        JSON.parse(data.result), web3.utils.toChecksumAddress(this.author),
        { from: account })
        .then(hash => {
          resolve(hash)
        })
    })
  }

  getProofData (hash, account) {
    return new Promise(resolve => {
      return this.device.getDataWipeProof(hash, { from: account })
        .then(data => {
          resolve(data)
        })
    })
  }
}

module.exports = DataWipeProof

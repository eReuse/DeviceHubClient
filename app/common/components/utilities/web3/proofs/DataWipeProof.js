
class DataWipeProof {
  constructor (device) {
    this.device = device
  }

  generateProof (web3, data, account) {
    return new Promise(resolve => {
      this.device.generateDataWipeProof(data.erasureType, data.date.toString(),
        JSON.parse(data.result), web3.utils.toChecksumAddress(data.proofAuthor),
        { from: account })
        .then(receipt => {
          console.log(`DataWipeProof class: ${receipt}`)
          resolve(receipt)
        })
    })
  }

  getProofData (hash, account) {
    return new Promise(resolve => {
      this.device.getDataWipeProof(hash, { from: account })
        .then(data => {
          resolve(data)
        })
    })
  }
}

module.exports = DataWipeProof

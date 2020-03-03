/* eslint no-useless-constructor: "error" */
class Proof {
  constructor (web3, data) {
    this.deviceAddress = web3.utils.toChecksumAddress(data.device)
  }

  /**
   * Main function to create a proof and map it to its corresponding device.
   * @param {Function} device Blockchain smart contract object.
   * @param {string} account Ethereum address needed for the execution.
   * @returns {Promise} A promise that resolves to the hash of the generated
   *                    proof.
   */
  generateProof (device, account) {
    throw Error('Not implemented function')
  }

  /**
   * Auxiliar function implemented by each proof in order to extract the data
   * from the received JSON.
   * @param {Function} web3 Web3.js library.
   * @param {JSON} data JSON structure with the information needed for the
   *                    proof to be generated.
   */
  extractData (web3, data) {
    throw Error('Not implemented function')
  }
}

module.exports = Proof

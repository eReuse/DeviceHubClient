/* eslint no-useless-constructor: "error" */
class Proof {
  constructor (web3, data) {
    this.initializeProofEnum()
    this.device = web3.utils.toChecksumAddress(data.device)
  }

  /**
   * Function to initialize the mapper from string to int with the
   * proof types. This is needed as in the blockchain the indexing is done
   * with integers.
   */
  initializeProofEnum () {
    this.proofTypes = {
      'wipe': 0,
      'function': 1,
      'reuse': 2,
      'recycle': 3,
      'disposal': 4
    }
  }

  /**
   * Main function to create a proof and map it to its corresponding device.
   * First of all we need to create the proof contract (each proof implements
   * its own creation method). Once we have created the proof we map it to
   * the corresponding device within the Blockchain.
   * @param {Function} proofFactory Blockchain smart contract object.
   * @param {Function} proofContract Blockchain smart contract object.
   * @param {string} type Type of the proof to be generated.
   * @param {string} account Ethereum address needed for the execution.
   * @returns {Promise} A promise that resolves to the ethereum address of the
   *                    generated proof.
   */
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

  /**
   * Function implemented by each proof subclass that generates the proof
   * smart contract and retrieves its address.
   * @param {Function} proofFactory Blockchain smart contract object.
   * @returns {Promise} A promise that resolves to the ethereum address of the
   *                    generated proof.
   */
  createProofContract (proofFactory) {
    throw Error('Not implemented function')
  }
}

module.exports = Proof

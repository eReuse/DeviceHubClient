/**generate
 * Returns a global progressBar singleton.
 *
 * @param ngProgressFactory
 * @returns {progressBar}
 */
function web3Service($window, $rootScope) {
  const service = {
    initTransfer: (obj) => {
      return false
    },
    acceptTransfer: (obj) => {
      return false
    },
    generateProofs: (proofs) => {
      // TODO
    },
    generateProof: (obj) => {
      return false
    },
    getProof: (obj) => {
      return false
    }
  }
  return service
}


module.exports = web3Service

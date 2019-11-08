/**
 * Returns a global progressBar singleton.
 *
 * @param ngProgressFactory
 * @returns {progressBar}
 */
function web3Service ($window) {
  const web3 = new $window.web3.providers.WebsocketProvider('ws://localhost:8545')
  const service = {
    post: (obj) => {
      console.log("web3 post", obj)
      // TODO send request to web3
      const response = "hello"
      return response
    },
    patch: (obj) => {
      console.log("web3 patch", obj)
      // TODO send request to web3
      const response = "hello"
      return response
    }
  }
  return service
}
module.exports = web3Service

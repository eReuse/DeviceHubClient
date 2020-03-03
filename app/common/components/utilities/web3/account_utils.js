const functions = {
  unlockAccount: (address, password, web3) => {
    unlockAccount(address, password, web3, 2160000) // 10 hours
  },
  createAccount: (web3, password) => {
    return createAccount(web3, password)
  }
}

/**
 * To sign transactions, the accounts of the owners need to be unlocked.
 * For this reason, this function will be executed every time we need an
 * owner to send some transaction.
 * @param {string} address String representation of the Ethereum
 *                         address of the user.
 * @param {Function} web3 Web3.js library.
 * @param {Number} time Number of second that the accounts will be
 *                      unlocked.
 */
function unlockAccount (address, password, web3, time) {
  web3.eth.personal.unlockAccount(address, password, time)
    .then(console.log(`Account unlocked for ${time} seconds`))
}

/**
 * Create the account for some user in the system.
 * @param {Function} web3 Web3.js library
 * @returns {Promise} A promise which resolves to the accounts.
 */
function createAccount (web3, password) {
  return new Promise(resolve => {
    web3.eth.personal.newAccount(password).then(user => {
      fundUser(web3, user)
      resolve(user)
    })
  })
}

/**
 * Transfer funds from the initial accounts to the owner.
 * @param {Function} web3 Web3.js library.
 * @param {string} user String representation of the Ethereum
 *                        address of the user.
 */
function fundUser (web3, owner) {
  const amountToSend = web3.utils.toWei('2', 'ether')
  web3.eth.sendTransaction({
    from: web3.eth.defaultAccount, to: owner, value: amountToSend, gas: '6721975'
  })
}

module.exports = functions

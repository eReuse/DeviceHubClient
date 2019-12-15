const factoryArtifacts = require('../../../truffle/build/contracts/DeviceFactory')
const deliveryNoteArtifacts = require('../../../truffle/build/contracts/DeliveryNote')
const daoArtifacts = require('../../../truffle/build/contracts/DAO')
const erc20Artifacts = require('../../../truffle/build/contracts/EIP20')
const deviceArtifacts = require('../../../truffle/build/contracts/DepositDevice')

/**
 * Returns a global progressBar singleton.
 *
 * @param ngProgressFactory
 * @returns {progressBar}
 */
function web3Service ($window) {
  const provider = new $window.web3.providers.WebsocketProvider('ws://localhost:8545')
  const web3 = new $window.web3(provider)
  const contract = $window.contract
  let factory, erc20, dao

  deployContracts(web3, contract, provider).then(res => {
    factory = res[0]
    erc20 = res[1]
    dao = res[2]
  })
  const accounts = {}

  createAccounts(web3).then(accs => {
    accounts['OwnerA'] = accs[0]
    accounts['OwnerB'] = accs[1]
    fundOwners(web3, accs[0], accs[1])
  })

  const service = {
    post: (obj) => {
      if (obj.devices) {
        deployDevices(factory, obj.devices, accounts.OwnerA, web3).then(result => {
          factory.getDeployedDevices({ from: accounts.OwnerA }).then(devices => {
            createDeliveryNote(contract, provider, devices, accounts, dao, web3)
          })
        })
      } else {
        // sendDeliveryNote(obj)
      }

      // TODO return promise
      return { 
        then: () => {
          return {
            catch: () => {
              
            }
          }
        }
      }
    },
    patch: (obj) => {
      console.log('web3 patch', obj)
      // TODO send request to web3
      const response = 'hello'
      return response
    }
  }
  return service
}

/**
 * Function to create the DeliveryNote that will be sent to the second owner
 * inside the Blockchain.
 * @param {Function} contract truffle-contract library.
 * @param {Function} provider Blockchain provider configuration.
 * @param {Array} devices List of devices to be added to the DeliveryNote.
 * @param {Array} accounts List of owners' accounts.
 * @param {Function} factory Instance of the DAO smart contract.
 * @param {Function} web3 Web3 library.
 */
function createDeliveryNote (contract, provider, devices, accounts, dao, web3) {
  let deliveryNoteContract = initializeContract(contract, provider, deliveryNoteArtifacts)
  let sender = web3.utils.toChecksumAddress(accounts.OwnerA)
  let receiver = web3.utils.toChecksumAddress(accounts.OwnerB)
  unlockOwners(sender, receiver, web3, 600)
  createDeliveryNoteInstance(deliveryNoteContract, sender, receiver, dao)
    .then(deliveryNote => {
      for (let d in devices) {
        let current = devices[d]
        getDeviceInstance(contract, provider, current).then(instance => {
          console.log(instance.address)
          instance.addToDeliveryNote(deliveryNote.address, {from: sender})
        })
      }
    //   return deliveryNote
    // }).then(dNote => {
    //   console.log(dNote)
    //   dNote.emitDeliveryNote({ from: accounts.ownerA })
    })
}

/**
 * Function to register into the Blockchain all the devices included in
 * the received DeliveryNote.
 * @param {Function} factory Instance of the DeviceFactory smart contract.
 * @param {Array} devices List of the devices to be registered.
 * @param {string} owner Address of the owner of the devices.
 * @param {Function} web3 Web3 library.
 * @returns {Promise} A promise which resolves to the list of
 *                    deployed devices.
 */
function deployDevices (factory, devices, owner, web3) {
  return new Promise(resolve => {
    let deployedDevices = []
    for (let d in devices) {
      let current = devices[d]
      factory.createDevice(current.model, 0,
        web3.utils.toChecksumAddress(owner), { from: web3.eth.defaultAccount })
        .then(d => {
          deployedDevices.push(d)
          resolve(deployDevices)
        })
    }
  })
}

/**
 * Function to get an instance of the already deployed contracts
 * which will be needed throughout the execution of the different
 * functionalities within this service (DeviceFactory, ERC20 and DAO).
 * @param {Function} web3 Web3 library.
 * @param {Function} contract truffle-contract library.
 * @param {Function} provider Blockchain provider configuration.
 * @returns {Promise} A promise which resolves to a list with the
 *                    instances of the deployed contracts.
 */
function deployContracts (web3, contract, provider) {
  return new Promise((resolve) => {
    web3.eth.getAccounts().then(accounts => {
      web3.eth.defaultAccount = accounts[0]
      let factoryContract = initializeContract(contract, provider, factoryArtifacts)
      let erc20Contract = initializeContract(contract, provider, erc20Artifacts)
      let daoContract = initializeContract(contract, provider, daoArtifacts)
      selectContractInstance(factoryContract).then(factory => {
        selectContractInstance(erc20Contract).then(erc20 => {
          selectContractInstance(daoContract).then(dao => {
            resolve([factory, erc20, dao])
          })
        })
      })
    })
  })
}

/**
 * Auxiliary function to obtain an instance of an already
 * deployed contract
 * @param {Function} contract Structure of the given smart contract.
 * @returns {Promise} A promise which resolves to the selected contract.
 */
function selectContractInstance (contract) {
  return new Promise(resolve => {
    contract.deployed().then(instance => {
      resolve(instance)
    })
  })
}

/**
 * Auxiliary function to create an instance of DeliveryNote
 * smart contract as it has not been previously deployed.
 * @param {Function} contract Structure of the DeliveryNote
 *                            smart contract.
 * @param {string} sender Address of the sender.
 * @param {string} receiver Address of the sender.
 * @param {Function} dao Structure of the DAO smart contract.
 * @returns {Promise} A promise which resolves to the DeliveryNote
 *                    smart contract instance.
 */
function createDeliveryNoteInstance (contract, sender, receiver, dao) {
  return new Promise(resolve => {
    contract.new(receiver, dao.address, {from: sender}).then(instance => {
      resolve(instance)
    })
  })
}

/**
 * Auxiliary function to create an instance of DepositDevice
 * smart contract from the address which is known.
 * @param {Function} contract Structure of the DepositDevice
 *                            smart contract.
 * @param {string} deviceAddress String representation of the Ethereum
 *                          address of the device.
 * @returns {Promise} A promise which resolves to the DepositDevice
 *                    smart contract instance.
 */
function getDeviceInstance (contract, provider, deviceAddress) {
  let deviceContract = initializeContract(contract, provider, deviceArtifacts)
  return new Promise(resolve => {
    deviceContract.at(deviceAddress).then(instance => {
      resolve(instance)
    })
  })
}

/**
 * Initialize basic properties of smart contract instance.
 * @param {Function} contract truffle-contract library.
 * @param {Function} provider Blockchain provider configuration.
 * @param {File} artifacts JSON representation of smart contract.
 * @returns {Function} Structure of the smart contract.
 */
function initializeContract (contract, provider, artifacts) {
  let myContract = contract(artifacts)
  myContract.setProvider(provider)
  myContract.defaults({
    gasLimit: '6721975'
  })
  return myContract
}

/**
 * To sign transactions, the accounts of the owners need to be unlocked.
 * For this reason, this function will be executed every time we need an
 * owner to send some transaction.
 * @param {string} sender String representation of the Ethereum
 *                        address of the sender.
 * @param {string} receiver String representation of the Ethereum
 *                     address of the receiver.
 * @param {Function} web3 Web3 library.
 * @param {Number} time Number of second that the accounts will be
 *                      unlocked.
 */
function unlockOwners (sender, receiver, web3, time) {
  // I'm assuming that I know the password for these accounts
  // In future implementations this will be different of course.

  web3.eth.personal.unlockAccount(sender, 'ownerA', time)
  web3.eth.personal.unlockAccount(receiver, 'ownerB', time)
}

/**
 * Create the accounts for the owners.
 * @param {Function} web3 Web3 library
 * @returns {Promise} A promise which resolves to the accounts.
 */
function createAccounts (web3) {
  return new Promise(resolve => {
    web3.eth.personal.newAccount('ownerA').then(ownerA => {
      web3.eth.personal.newAccount('ownerB').then(ownerB => {
        // fundOwners(web3, ownerA, ownerB)
        resolve([ownerA, ownerB])
      })
    })
  })
}

/**
 * Transfer funds from the initial accounts to the owners.
 * @param {Function} web3 Web3 library.
 * @param {string} ownerA String representation of the Ethereum
 *                        address of the OwnerA.
 * @param {string} ownerB String representation of the Ethereum
 *                        address of the OwnerB.
 */
function fundOwners (web3, ownerA, ownerB) {
  const amountToSend = web3.utils.toWei('10', 'ether')
  web3.eth.sendTransaction({
    from: web3.eth.defaultAccount, to: ownerA, value: amountToSend, gasLimit: '6721975'
  })
  web3.eth.sendTransaction({
    from: web3.eth.defaultAccount, to: ownerB, value: amountToSend, gasLimit: '6721975'
  })
}

module.exports = web3Service

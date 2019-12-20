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
  const provider = new $window.web3.providers.WebsocketProvider('ws://' + $window.CONSTANTS.blockchain + ':8545')
  const web3 = new $window.web3(provider)
  const contract = $window.contract
  let factory, erc20, dao

  deployContracts(web3, contract, provider).then(res => {
    factory = res[0]
    erc20 = res[1]
    dao = res[2]
  })

  const service = {
    post: (obj) => {
      console.log('web3 post', obj)
    },
    patch: (obj) => {
      console.log('web3 patch', obj)
      // TODO send request to web3
      const response = 'hello'
      return response
    },
    initTransfer: (obj) => {
      console.log(obj)
      let sender = web3.utils.toChecksumAddress(obj.sender)
      let receiver = web3.utils.toChecksumAddress(obj.receiver_address)
      return initTransfer(sender, receiver, obj.devices, web3)
    },
    acceptTransfer: (obj) => {
      console.log(obj)
      let receiver = web3.utils.toChecksumAddress(obj.receiver_address)
      let deposit = parseInt(obj.deposit)
      let deliverynoteAddress = obj.deliverynote_address
      let a = acceptTransfer(deliverynoteAddress, receiver, deposit, erc20)
      console.log(a)
      return a
    }
  }

  /** Function that implements the initialization of a DeliveryNote
   *  transfer
  * @param {string} sender Ethereum address of sender (and transaction emmitter).
  * @param {string} receiver Ethereum address of receiver.
  * @param {Array} devices List of devices to be added to the DeliveryNote.
  * @param {Function} web3 Web3.js library
  * @returns {Promise} Promise which resolves to DeliveryNote address.
  */
  function initTransfer (sender, receiver, devices, web3) {
    console.log('initTransfer')
    return new Promise(resolve => {
      deployDevices(factory, devices, sender, web3).then(() => {
        factory.getDeployedDevices({ from: sender }).then(devices => {
          createDeliveryNote(contract, provider, devices, sender, receiver, dao)
            .then(deliveryNote => {
              deliveryNote.emitDeliveryNote({from: sender})
              console.log(deliveryNote)
              resolve(deliveryNote.address)
            })
        })
      })
    })
  }

  /** Function that implements the acceptance of a DeliveryNote
  *  transfer
  * @param {string} deliverynote_address Ethereum address of deliveryNote Contract
  * @param {string} receiver Ethereum address of receiver.
  * @param {number} deposit Deposit agreed.
  * @returns {Promise} Promise that resolves to boolean
  */
  function acceptTransfer (deliveryNoteAddress, receiver, deposit, erc20) {
    console.log('AcceptTransfer')
    return new Promise(resolve => {
      erc20.approve(deliveryNoteAddress, deposit,
        { from: receiver,
          gas: '6721975'})
        .then(() => {
          acceptDeliveryNote(contract, provider, deliveryNoteAddress,
            receiver, deposit)
        .then(result => {
          resolve(result)
        })
        })
    })
  }

  return service
}

/**
 * Function to create the DeliveryNote that will be sent to the second owner
 * inside the Blockchain.
 * @param {Function} contract truffle-contract library.
 * @param {Function} provider Blockchain provider configuration.
 * @param {Array} devices List of devices to be added to the DeliveryNote.
 * @param {String} sender String representation of the sender ethereum address.
 * @param {String} receiver String representation of the receiver ethereum address.
 * @param {Function} dao Instance of the DAO smart contract.
 * @return {Promise} A promise which resolves to the DeliveryNote contract
 */
function createDeliveryNote (contract, provider, devices, sender, receiver, dao) {
  let deliveryNoteContract = initializeContract(contract, provider, deliveryNoteArtifacts)
  return new Promise(resolve => {
    createDeliveryNoteInstance(deliveryNoteContract, sender, receiver, dao)
      .then(deliveryNote => {
        for (let d in devices) {
          let current = devices[d]
          getContractInstance(contract, provider, current, deviceArtifacts)
            .then(instance => {
              console.log(instance.address)
              instance.addToDeliveryNote(deliveryNote.address, {from: sender})
            })
        }
        resolve(deliveryNote)
      })
  })
}

/**
 * Function to accept the DeliveryNote sent by previous owner.
 * @param {Function} contract truffle-contract library.
 * @param {Function} provider Blockchain provider configuration.
 * @param {String} deliveryNoteAddress String representation of the Delivery
 *                 Note ethereum address.
 * @param {String} receiver String representation of the receiver ethereum address.
 * @param {Number} deposit Value of the deposit to be paid.
 * @return {Promise} A promise which resolves to true if the operation succeeded
 */
function acceptDeliveryNote (contract, provider, deliveryNoteAddress, receiver, deposit) {
  return new Promise(resolve => {
    getContractInstance(contract, provider, deliveryNoteAddress, deliveryNoteArtifacts)
      .then(deliveryNote => {
        deliveryNote.acceptDeliveryNote(deposit, {from: receiver})
          .then(() => {
            resolve(true)
          })
      })
  })
}

/**
 * Function to register into the Blockchain all the devices included in
 * the received DeliveryNote.
 * @param {Function} factory Instance of the DeviceFactory smart contract.
 * @param {Array} devices List of the devices to be registered.
 * @param {string} owner Address of the owner of the devices.
 * @param {Function} web3 Web3.js library.
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
 * @param {Function} web3 Web3.js library.
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
 * Auxiliary function to create an instance of some smart contract
 * whose address is known.
 * @param {Function} contract truffle-contract library.
 * @param {Function} provider Blockchain provider configuration.
 * @param {string} contractAddress String representation of the Ethereum
 *                                 address of the contract.
 * @param {File} artifacts JSON representation of smart contract.
 * @returns {Promise} A promise which resolves to the the smart contract instance.
 */
function getContractInstance (contract, provider, contractAddress, artifacts) {
  let deviceContract = initializeContract(contract, provider, artifacts)
  return new Promise(resolve => {
    deviceContract.at(contractAddress).then(instance => {
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

module.exports = web3Service

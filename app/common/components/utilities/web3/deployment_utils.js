const deviceFactoryArtifacts = require('../../../../eReuse-Blockchain/build/contracts/DeviceFactory')
const daoArtifacts = require('../../../../eReuse-Blockchain/build/contracts/DAO')
const erc20Artifacts = require('../../../../eReuse-Blockchain/build/contracts/EIP20')

const functions = {
  deployContracts: (web3, contract, provider) => {
    return deployContracts(web3, contract, provider)
  },
  getContractInstance: (contract, provider, contractAddress, artifacts) => {
    return getContractInstance(contract, provider, contractAddress, artifacts)
  },
  initializeContract: (contract, provider, artifacts) => {
    return initializeContract(contract, provider, artifacts)
  },
  selectContractInstance: (contract) => {
    return selectContractInstance(contract)
  }
}

/**
 * Function to deploy both sets of contracts. Those related with Devices.
 * @param {Function} web3 Web3.js library.
 * @param {Function} contractLib truffle-contract library.
 * @param {Function} provider Blockchain provider configuration.
 * @returns {Promise} A promise which resolves to a list with the
 *                    instances of the deployed contracts.
 */
function deployContracts (web3, contractLib, provider) {
  return new Promise(resolve => {
    web3.eth.getAccounts().then(accounts => {
      web3.eth.defaultAccount = accounts[0]
      deployDeviceContracts(contractLib, provider)
        .then(deviceContracts => {
          resolve(deviceContracts)
        })
    })
  })
}

/**
 * Function to get an instance of the already deployed contracts
 * which will be needed throughout the execution of the different
 * functionalities within this service (DeviceFactory, ERC20 and DAO).
 * @param {Function} web3 Web3.js library.
 * @param {Function} contractLib truffle-contract library.
 * @param {Function} provider Blockchain provider configuration.
 * @returns {Promise} A promise which resolves to a list with the
 *                    instances of the deployed contracts.
 */
function deployDeviceContracts (contract, provider) {
  return new Promise(resolve => {
    let deviceFactoryContract = initializeContract(contract, provider, deviceFactoryArtifacts)
    let erc20Contract = initializeContract(contract, provider, erc20Artifacts)
    let daoContract = initializeContract(contract, provider, daoArtifacts)
    selectContractInstance(deviceFactoryContract).then(factoryContract => {
      selectContractInstance(erc20Contract).then(erc20 => {
        selectContractInstance(daoContract).then(dao => {
          resolve([factoryContract, erc20, dao])
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

module.exports = functions
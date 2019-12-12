const factoryArtifacts = require('../../../truffle/build/contracts/DeviceFactory')
const erc20Artifacts = require('../../../truffle/build/contracts/EIP20')

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
  let factory, erc20

  deployContracts(web3, contract, provider).then(res => {
    factory = res[0]
    erc20 = res[1]
  })

  let accs = createAccounts(web3)

  const accounts = {
    'OwnerA': accs[0],
    'OwnerB': accs[1]
  }

  const service = {
    post: (obj) => {
      if (obj.type === 'DeliveryNote') {
        deployDevices(factory, obj.devices, accounts.OwnerA, web3)
        // let devices = getOwnerDevices(factory, owner, web3);
        // createDeliveryNote(factory, obj.devices, accounts.OwnerA, web3)
      } else {
        // sendDeliveryNote(obj)
      }

      const response = 'hello'
      return response
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

function createDeliveryNote (factory, devices, nextOwner, web3) {
  createDeliveryNote(factory, nextOwner, web3)
}

function sendDeliveryNote (obj) {
  console.log(obj)
}

function deployDevices (factory, devices, owner, web3) {
  for (let d in devices) {
    let current = devices[d]
    factory.createDevice(current.model, 0,
      web3.utils.toChecksumAddress(owner), {
        from: web3.eth.defaultAccount
      })
  }
}

function deployContracts (web3, contract, provider) {
  return new Promise((resolve) => {
    web3.eth.getAccounts().then(accounts => {
      web3.eth.defaultAccount = accounts[0]
      let factoryContract = initializeContract(contract, provider, factoryArtifacts)
      let erc20Contract = initializeContract(contract, provider, erc20Artifacts)
      selectContractInstance(factoryContract).then(factory => {
        selectContractInstance(erc20Contract).then(erc20 => {
          resolve([factory, erc20])
        })
      })
    })
  })
}

function selectContractInstance (contract) {
  return new Promise(resolve => {
    contract.deployed().then(instance => {
      resolve(instance)
    })
  })
}

function createContractInstance (contract, params) {
  return new Promise(resolve => {
    contract.new(params[0], params[1], params[2]).then(instance => {
      resolve(instance)
    })
  })
}

function initializeContract (contract, provider, artifacts) {
  let myContract = contract(artifacts)
  myContract.setProvider(provider)
  myContract.defaults({
    gasLimit: '6721975'
  })
  return myContract
}

function createAccounts (web3) {
  let result = web3.eth.accounts.wallet.create(2)
  return [result[0].address, result[1].address]
}

module.exports = web3Service

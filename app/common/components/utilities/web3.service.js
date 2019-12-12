const factoryArtifacts = require('../../../truffle/build/contracts/DeviceFactory')
const erc20Artifacts = require('../../../truffle/build/contracts/EIP20')
const contractAddresses = require('../../../truffle/deployed_contracts.js')
const deployments = require('../../../truffle/deployed_contracts')

/**
 * Returns a global progressBar singleton.
 *
 * @param ngProgressFactory
 * @returns {progressBar}
 */
function web3Service($window) {
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
      // console.log(factory)
      // console.log(erc20)
      if (obj.type === 'DeliveryNote') {
        createDeliveryNote(factory, obj.devices, accounts.OwnerA, web3)
      } else {
        // sendDeliveryNote(obj)
      }

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

function createDeliveryNote(factory, devices, owner, web3) {
  let deployed_devices = deploy_devices(factory, devices, owner, web3)
  console.log(deployed_devices)
}

function sendDeliveryNote(obj) {
  console.log(obj)
}

function deploy_devices(factory, devices, owner, web3) {
  let deployed_devices = []
  for (let d in devices) {
    const current = devices[d]
    factory.createDevice(current.model, 0,
      web3.utils.toChecksumAddress(owner), {
      from: web3.eth.defaultAccount
    }).then(i => {
      console.log(i)
      deployed_devices.push(i)
    })
  }
  return deployed_devices
}

function deployContracts(web3, contract, provider) {
  web3.eth.getAccounts()
  .then( accounts => {
    web3.eth.defaultAccount = accounts[0]

    selectContractInstance(contract, provider, factoryArtifacts)
    .then(factory => {
      selectContractInstance(contract, provider, erc20Artifacts)
      .then(erc20 => {
        return [factory, erc20]
      })
    })
  })
}

function selectContractInstance(contract, provider, artifacts) {
  contract(artifacts).then(myContract => {
    myContract.setProvider(provider)
    myContract.defaults({
      gasLimit: "6721975"
    })
    myContract.deployed()
    .then(instance => { return instance })
  })
}

function createAccounts(web3) {
  let result = web3.eth.accounts.wallet.create(2)
  return [result[0].address, result[1].address]
}

module.exports = web3Service
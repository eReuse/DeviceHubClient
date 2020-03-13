const deployments = require('./web3/deployment_utils')
const deliveryNoteUtils = require('./web3/deliverynote_utils')
const devicesUtils = require('./web3/device_utils')
const proofUtils = require('./web3/proof_utils')
// const accountsUtils = require('./web3/account_utils')

/**generate
 * Returns a global progressBar singleton.
 *
 * @param ngProgressFactory
 * @returns {progressBar}
 */
function web3Service($window) {
  const provider = new $window.web3.providers.WebsocketProvider('ws://' + $window.CONSTANTS.blockchain + ':8545')
  const web3 = new $window.web3(provider)
  const contract = $window.contract
  let deviceFactory, erc20, dao

  deployments.deployContracts(web3, contract, provider).then(res => {
    deviceFactory = res[0]
    erc20 = res[1]
    dao = res[2]
    // let data = getSampleReuseProofs()
    // console.log(data)
    // devicesUtils.getDeployedDevice(contract, provider, data.deviceAddress)
    //   .then(device => {
    //     console.log(device)
    //     return proofUtils.generateProof(web3, device, data.proofType, data.data)
    //   })
  })

  const service = {
    initTransfer: (obj) => {
      let sender = web3.utils.toChecksumAddress(obj.sender)
      let receiver = web3.utils.toChecksumAddress(obj.receiver_address)
      let transferResult = initTransfer(sender, receiver, obj.devices, web3)
      return transferResult
    },
    acceptTransfer: (obj) => {
      let receiver = web3.utils.toChecksumAddress(obj.receiver_address)
      let deposit = parseInt(obj.deposit)
      let deliverynoteAddress = web3.utils.toChecksumAddress(obj.deliverynote_address)
      let transfer = acceptTransfer(deliverynoteAddress, receiver, deposit, erc20)
      return transfer
    },
    // TODO remove this and replace calls with generateProof
    generateProofTest: (proof) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('proof resolved: ', proof)
          resolve({ proof: proof, ethereumHash: 'Hash:'+proof.erasureID }); // TODO set ethereumHash
        }, 2000);
      });
    },
    generateProof: (obj) => {
      return devicesUtils.getDeployedDevice(contract, provider, obj.deviceAddress)
        .then(device => {
          return proofUtils.generateProof(web3, device, obj.type, obj.data)
        })
    },
    getProof: (obj) => {
      return devicesUtils.getDeployedDevice(contract, provider, obj.deviceAddress)
        .then(device => {
          return proofUtils.getProofData(device, obj.type, obj.hash, web3.eth.defaultAccount)
        })
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
    return new Promise(resolve => {
      devicesUtils.deployDevices(deviceFactory, devices, sender, web3)
        .then((deployedDevices) => {
          deliveryNoteUtils.createDeliveryNote(contract, provider, deployedDevices,
            sender, receiver, dao).then(deliveryNote => {
              deliveryNote.emitDeliveryNote({ from: sender })
              resolve(deliveryNote.address)
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
        {
          from: receiver,
          gas: '6721975'
        }).then(() => {
          deliveryNoteUtils.acceptDeliveryNote(contract, provider,
            deliveryNoteAddress, receiver, deposit).then(result => {
              resolve(result)
            })
        })
    })
  }
  return service
}

function getSampleWipeProofs() {
  return {
    'deviceAddress': '0x758D0639aB9C4Cb9cCF4f99557ba33926f8eE1E3',
    'proofType': 'wipe',
    'data': {
      'erasureType': 'Full',
      'date': '05-03-2020',
      'result': 'true',
      'proofAuthor': '0x11891834542c32C509Aa1Eae38Dfccb5288EDa2b'
    }
  }
}

function getSampleFunctionProofs() {
  return {
    'deviceAddress': '0x758D0639aB9C4Cb9cCF4f99557ba33926f8eE1E3',
    'proofType': 'function',
    'data': {
      'score': 5,
      'diskUsage': 24,
      'algorithmVersion': 'v1.3',
      'proofAuthor': '0x11891834542c32C509Aa1Eae38Dfccb5288EDa2b'
    }
  }
}

function getSampleRecycleProofs() {
  return {
    'deviceAddress': '0x758D0639aB9C4Cb9cCF4f99557ba33926f8eE1E3',
    'proofType': 'recycle',
    'data': {
      'collectionPoint': 'Donalo',
      'date': '2014-10-23',
      'contact': 'Alguien',
      'ticket': 'iuxb387be',
      'gpsLocation': '12.34543, -2.23214'
    }
  }
}

function getSampleReuseProofs() {
  return {
    'deviceAddress': '0x758D0639aB9C4Cb9cCF4f99557ba33926f8eE1E3',
    'proofType': 'reuse',
    'data': {
      'receiverSegment': 'segment_1',
      'idReceipt': 'aiub8d77hs98',
      'supplier': '0x37be35ae7eced44ca25e4683e98425fc7830a8a5',
      'receiver': '0x4001645acd201b1889920250ec7040d846031615',
      'price': 50
    }
  }
}

module.exports = web3Service

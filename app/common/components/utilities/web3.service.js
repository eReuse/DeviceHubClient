const factoryArtifacts = require('../../../truffle/build/contracts/DeviceFactory');
const erc20Artifacts = require('../../../truffle/build/contracts/EIP20');
const contractAddresses = require('../../../truffle/deployed_contracts.js');
const deployments = require('../../../truffle/deployed_contracts');

/**
 * Returns a global progressBar singleton.
 *
 * @param ngProgressFactory
 * @returns {progressBar}
 */
function web3Service($window) {
  const provider = new $window.web3.providers.WebsocketProvider('ws://localhost:8545');
  const web3 = new $window.web3(provider);

  let [factory, erc20] = deployContracts(web3);

  let accs = createAccounts(web3);

  const accounts = {
    'OwnerA': accs[0],
    'OwnerB': accs[1]
  };

  const service = {
    post: (obj) => {
      if (obj.type == 'DeliveryNote') {
        createDeliveryNote(factory, obj, accounts.OwnerA,
          web3.eth.defaultAccount, web3);
      } else {
        // sendDeliveryNote(obj);
      }

      const response = "hello";
      return response;
    },
    patch: (obj) => {
      console.log("web3 patch", obj);
      // TODO send request to web3
      const response = "hello";
      return response;
    }
  }
  return service;
}

function createDeliveryNote(factory, obj, owner, _from, web3) {
  devices = obj.devices;
  for (let d in devices) {
    current = devices[d];
    console.log(current);
    factory.methods.createDevice(current.model, 0,
      web3.utils.toChecksumAddress(owner)).send({
        from: web3.utils.toChecksumAddress(_from)
      }).then(i => {
        console.log(`Contract created ${i}`);
      });
  }
  console.log(`Listo socio, el address es ${owner}`);
}

function sendDeliveryNote(obj) {
  console.log(obj);
}

function deployContracts(web3) {
  web3.eth.getAccounts().then(i => {
    web3.eth.defaultAccount = i[0];
  });

  factory = new web3.eth.Contract(factoryArtifacts.abi,
    web3.utils.toChecksumAddress(deployments.get('Factory')));

  erc20 = new web3.eth.Contract(erc20Artifacts.abi,
    web3.utils.toChecksumAddress(deployments.get('ERC20')));

  return [factory, erc20];
}

function createAccounts(web3) {
  let result = web3.eth.accounts.wallet.create(2);
  return [result[0].address, result[1].address];
}

module.exports = web3Service;
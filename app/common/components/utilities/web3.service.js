factoryArtifacts = require('../../../truffle/build/contracts/DeviceFactory');

/**
 * Returns a global progressBar singleton.
 *
 * @param ngProgressFactory
 * @returns {progressBar}
 */
function web3Service($window) {
  const provider = new $window.web3.providers.WebsocketProvider('ws://localhost:8545');
  const web3 = new $window.web3(provider);
  web3.eth.defaultAccount = web3.eth.accounts[0];

  factory = new web3.eth.Contract(factoryArtifacts.abi,
    web3.utils.toChecksumAddress('0x6cD989672cb0AAf4E29680568980354dE7d39A6f'));

  const accounts = {
    'notary': '0x58cfbed5b782128325324ddc45052509dacba170',
    'repairer': '0x1ef6d246c3edd5be811f43518fded0b4661150fd',
    'consumer': '0x2ae32a2e1bdecdafbd14f811aa175693c11b72ed'
  };

  const service = {
    post: (obj) => {
      console.log(obj);
      let devices_list = obj.devices;
      for (let device of devices_list) {
        factory.methods.createDevice(device.serialNumber, parseInt(obj.deposit),
          web3.utils.toChecksumAddress(accounts.consumer)).send(
            {
              from: accounts.current
            });
      }
      // factory.methods.getDeployedDevices().call({from: accounts.consumer}).then(i => {
      //   console.log(i);
      // });
      // web3.eth.accounts.wallet.create(1);
      // web3.eth.accounts.wallet.save('prueba');

      const response = "hello";
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

function deployContract() {

}

module.exports = web3Service


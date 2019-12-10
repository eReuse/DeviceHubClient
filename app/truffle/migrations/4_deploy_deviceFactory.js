const DeviceFactory = artifacts.require("DeviceFactory");
const DAO = artifacts.require("DAO");
const deployments = require('../deployed_contracts');

module.exports = async (deployer, network, accounts) => {
    await DAO.deployed()
        .then(async function (instance) {
            dao = instance;
            await deployer.deploy(DeviceFactory, dao.address, { from: accounts[0] })
                .then(async function (deviceFactory) {
                    dao.setDeviceFactory(deviceFactory.address);
                    deployments.updateJSON('Factory', deviceFactory.address);
                });
        });
};
const ERC20 = artifacts.require("EIP20");
const MyERC721 = artifacts.require("MyERC721");
const DAO = artifacts.require("DAO");
const RoleManager = artifacts.require('RoleManager');

module.exports = function (deployer, network, accounts) {
  deployer.deploy(ERC20, 1000000, 'ReuseCoin', 0, 'RCN', { from: accounts[0] })
    .then(async function (erc20) {
      await DAO.deployed().then(function (instance) {
        dao = instance;
      });
      console.log("ERC20: " + erc20.address);
      await dao.setERC20(erc20.address);
      await deployer.deploy(MyERC721, 'EREUSEDeviceToken', 'EDT', { from: accounts[0] })
        .then(async function (erc721) {
          dao.setERC721(erc721.address);
          console.log('ERC721: ' + erc721.address);
          for(i in accounts){
            await erc20.transfer(accounts[i], 2000)
          }
          await deployer.deploy(RoleManager, { from: accounts[0] }).then(async (manager) => {
            await dao.setRoleManager(manager.address);
          });
        });
    });
};

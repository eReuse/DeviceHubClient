//const store = require('./store');
const OracleDispatch = artifacts.require("OracleDispatch");
const DAO = artifacts.require("DAO");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(OracleDispatch, {from:accounts[0]}).then(function (instance) {
    //store.storeArtifact(OracleDispatch);
    console.log('Dispatch address: ' + instance.address);
    return instance.address;
  }).then(function (dispatch) {
    //The "return" in the following line is necessary
    return deployer.deploy(DAO, dispatch, {from:accounts[0]}).then(function (instance) {
      console.log('DAO address :' + instance.address);
    })
  })
};
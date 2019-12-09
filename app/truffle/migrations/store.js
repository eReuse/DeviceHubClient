const path = require('path');
const fs = require('fs');
const requireNoCache = require('require-nocache')(module);
const outPath = path.resolve('./../build/contracts/');
const Artifactor = require("truffle-artifactor");
const artifactor = new Artifactor(outPath);

let getData = (contract) => {
  return {
    contract_name: contract.contract_name,
    abi: contract.abi,
    address: contract.address,
    network_id: contract.network_id,
    default_network: contract.networks[contract.network_id]

  }
}

let storeArtifact = (contract1) => {
  const data = getData(contract1);
  const expected_filepath = path.join(outPath, contract1.contract_name+'.sol.js');
  artifactor.save(data).then(function(result){
    const json = requireNoCache(expected_filepath);
    console.log('In store');
    console.log(contract(json));
  })
}

module.exports = {
  getData,
  storeArtifact,
  artifactor
}

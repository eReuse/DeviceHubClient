const DAO = artifacts.require("DAO");
const DataWipeProofs = artifacts.require("DataWipeProofs");
const DisposalProofs = artifacts.require("DisposalProofs");
const ReuseProofs = artifacts.require("ReuseProofs");
const RecycleProofs = artifacts.require("RecycleProofs");
const FunctionProofs = artifacts.require("FunctionProofs");

module.exports = async (deployer, network, accounts) => {
    await DAO.deployed()
        .then(async function (instance) {
            dao = instance;
            await deployer.deploy(DataWipeProofs, { from: accounts[0] })
                .then(async function (proofs) {
                    dao.setDataWipeProofs(proofs.address);
                });
            await deployer.deploy(DisposalProofs, { from: accounts[0] })
                .then(async function (proofs) {
                    dao.setDisposalProofs(proofs.address);
                });
            await deployer.deploy(ReuseProofs, { from: accounts[0] })
                .then(async function (proofs) {
                    dao.setReuseProofs(proofs.address);
                });
            await deployer.deploy(RecycleProofs, { from: accounts[0] })
                .then(async function (proofs) {
                    dao.setRecycleProofs(proofs.address);
                });
            await deployer.deploy(FunctionProofs, { from: accounts[0] })
                .then(async function (proofs) {
                    dao.setFunctionProofs(proofs.address);
                });
        });
};
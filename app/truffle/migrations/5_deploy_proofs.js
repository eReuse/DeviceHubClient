const ProofFactory = artifacts.require("ProofFactory");
const Proofs = artifacts.require("Proofs");
const DAO = artifacts.require("DAO");

module.exports = async (deployer, network, accounts) => {
    await DAO.deployed()
        .then(async function (instance) {
            dao = instance;
            await deployer.deploy(ProofFactory, { from: accounts[0] })
                .then(async function (factory) {
                    dao.setProofFactory(factory.address);
                });
            await deployer.deploy(Proofs, { from: accounts[0] })
                .then(async function (proofs) {
                    dao.setProofs(proofs.address);
                });
        });
};
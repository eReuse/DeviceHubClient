const DeviceFactory = artifacts.require('DeviceFactory');
const ProofFactory = artifacts.require('ProofFactory');
const Proofs = artifacts.require('Proofs');
const assert = require('assert');
const web3 = require('web3');

const minimist = require('minimist'),
    argv = minimist(process.argv.slice(2), {
        string: ['network']
    });
const network = argv.network;

contract("Basic test to generate proofs", function (accounts) {
    var device_factory, device, proof_factory, proofs, proof_types;
    console.log('');

    before(async function () {
        console.log('\t**BEFORE**');
        device_factory = await DeviceFactory.deployed();
        proof_factory = await ProofFactory.deployed();
        proofs = await Proofs.deployed();
        proof_types = {
            WIPE: 0,
            FUNCTION: 1,
            REUSE: 2,
            RECYCLE: 3,
            DISPOSAL: 4
        }

        await device_factory.createDevice("device", 0, accounts[0]);

        device = await device_factory.getDeployedDevices(
            { from: accounts[0] }).then(devices => {
                return devices[0];
            });
    });

    it("Generates proof of function", async function () {
        let score = 10;
        let usage = 20;

        let f_proof = await proof_factory.generateFunction(score, usage).then(result => {
            return extractProofAddress(result);
        });

        await proofs.addProof(web3.utils.toChecksumAddress(device)
            , proof_types.FUNCTION, web3.utils.toChecksumAddress(f_proof));

        proofs.getProof(web3.utils.toChecksumAddress(device)
            , proof_types.FUNCTION).then(result => {
                assert.notEqual(result, null);
                assert.equal(result, f_proof);
            });
    });

    it("Generates proof of recycling", async function () {
        let collection_point = 'Recicla2';
        let date = new Date().toLocaleString();
        let contact = 'John';

        let rec_proof = await proof_factory.generateRecycle(collection_point,
            date, contact).then(result => {
                return extractProofAddress(result);
            });

        await proofs.addProof(web3.utils.toChecksumAddress(device),
            proof_types.RECYCLE, web3.utils.toChecksumAddress(rec_proof));

        proofs.getProof(web3.utils.toChecksumAddress(device)
            , proof_types.RECYCLE).then(result => {
                assert.notEqual(result, null);
                assert.equal(result, rec_proof);
            });
    });

    it("Generates proof of reuse", async function () {
        let reu_proof = await proof_factory.generateReuse().then(result => {
            return extractProofAddress(result);
        });

        await proofs.addProof(web3.utils.toChecksumAddress(device), proof_types.REUSE
            , web3.utils.toChecksumAddress(reu_proof));

        proofs.getProof(web3.utils.toChecksumAddress(device)
            , proof_types.REUSE).then(result => {
                assert.notEqual(result, null);
                assert.equal(result, reu_proof);
            });
    });

    it("Generates proof of disposal", async function () {
        let origin = accounts[1];
        let destination = accounts[2];
        let deposit = 10;

        let disp_proof = await proof_factory.generateDisposal(web3.utils.toChecksumAddress(origin),
            web3.utils.toChecksumAddress(destination), deposit)
            .then(result => {
                return extractProofAddress(result);
            });

        await proofs.addProof(web3.utils.toChecksumAddress(device),
            proof_types.DISPOSAL, web3.utils.toChecksumAddress(disp_proof));

        proofs.getProof(web3.utils.toChecksumAddress(device)
            , proof_types.DISPOSAL).then(result => {
                assert.notEqual(result, null);
                assert.equal(result, disp_proof);
            });
    });

    it("Generates proof of data wipe", async function () {
        let erasure_type = 'QuickErase';
        let result = true;
        let date = new Date().toLocaleString();

        let dw_proof = await proof_factory.generateDataWipe(erasure_type, result
            , date).then(result => {
                return extractProofAddress(result);
            });

        await proofs.addProof(web3.utils.toChecksumAddress(device)
            , proof_types.WIPE
            , web3.utils.toChecksumAddress(dw_proof));

        proofs.getProof(web3.utils.toChecksumAddress(device)
            , proof_types.WIPE).then(result => {
                assert.notEqual(result, null);
                assert.equal(result, dw_proof);
            });
    });

});

function extractProofAddress(receipt) {
    return receipt.logs[0].args.proof
}
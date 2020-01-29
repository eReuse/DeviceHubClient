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
    // Object.keys(accs).map(a => { console.log(`${a}: ${accs[a]}`); });

    before(async function () {
        console.log('\t**BEFORE**');
        device_factory = await DeviceFactory.deployed();
        proof_factory = await ProofFactory.deployed();
        proofs = await Proofs.deployed();
        proof_types = {
            WIPE: 0,
            FUNCTION: 1,
            REUSE: 2,
            RECYCLE: 3
        }

        device = await device_factory.createDevice("device", 0, accounts[0]);
    });

    it("Generates proof of function", async function () {
        let score = 20

        let f_proof = await proof_factory.generateFunction(score);

        await proofs.addProof(web3.utils.toChecksumAddress(device)
            , proof_types.FUNCTION, web3.utils.toChecksumAddress(f_proof))

        proofs.getProof(web3.utils.toChecksumAddress(device.address)
            , proof_types.FUNCTION).then(result => {
                console.log(result);
                assert.notEqual(result, null);
            })
    });

    it("Generates proof of recycling", async function () {
        let collection_point = 'Recicla2';
        let timestamp = new Date().toLocaleString();
        let contact = 'John';

        let rec_proof = await proof_factory.generateRecycle(collection_point, timestamp
            , contact);
        proofs.addProof(web3.utils.toChecksumAddress(device.address), proof_types.RECYCLE
            , web3.utils.toChecksumAddress(rec_proof.address)).then(result => {
                console.log(result);
                assert.notEqual(result, null);
            })
    });

    it("Generates proof of reuse", async function () {
        let reu_proof = await proof_factory.generateReuse();
        proofs.addProof(web3.utils.toChecksumAddress(device.address), proof_types.REUSE
            , web3.utils.toChecksumAddress(reu_proof.address)).then(result => {
                console.log(result);
                assert.notEqual(result, null);
            })
    });

    it("Generates proof of data wipe", async function () {
        let erasure_type = 'QuickErase';
        let result = true;
        let timestamp = new Date().toLocaleString();

        let dw_proof = await proof_factory.generateDataWipe(erasure_type, result
            , timestamp);
        await proofs.addProof(web3.utils.toChecksumAddress(device.address)
            , proof_types.WIPE
            , web3.utils.toChecksumAddress(dw_proof.address)).then(result => {
                console.log(result);
                assert.notEqual(result, null);
            })
    });

});
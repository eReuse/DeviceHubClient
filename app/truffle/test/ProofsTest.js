const DeviceFactory = artifacts.require('DeviceFactory');
const DepositDevice = artifacts.require('DepositDevice');
const assert = require('assert');
const web3 = require('web3');

const minimist = require('minimist'),
    argv = minimist(process.argv.slice(2), {
        string: ['network']
    });
const network = argv.network;

contract("Basic test to generate proofs", function (accounts) {
    var device_factory, device_address, device, proof_factory, proofs, proof_types;
    console.log('');

    before(async function () {
        console.log('\t**BEFORE**');
        device_factory = await DeviceFactory.deployed();
        await device_factory.createDevice("device", 0, accounts[0]);

        device_address = await device_factory.getDeployedDevices(
            { from: accounts[0] }).then(devices => {
                return devices[0];
            });
    });

    it("Generates proof of function", async function () {
        let score = 10;
        let usage = 20;
        let version = "v2.0"

        device = await DepositDevice.at(device_address);
        await device.generateFunctionProof(score, usage, version);

        let proofs = await device.getProofs("function");

        assert.equal(proofs.length, 1);

        await device.getFunctionProof.call(proofs[0]).then(result => {
            assert.equal(score, result['0']);
            assert.equal(usage, result['1']);
            assert.equal(version, result['2']);
        })
    });

    it("Generates proof of recycling", async function () {
        let collection_point = "Donalo";
        let date = new Date().toLocaleString();
        let contact = "John";
        let ticket = "1276541765134875";
        let gpsLocation = "(37.700421688980136, -81.84535319999998)";

        device = await DepositDevice.at(device_address);
        await device.generateRecycleProof(collection_point, date, contact, ticket, gpsLocation);

        let proofs = await device.getProofs("recycle");

        assert.equal(proofs.length, 1);

        device.getRecycleProof.call(proofs[0]).then(result => {
            assert.equal(collection_point, result['0']);
            assert.equal(date, result['1']);
            assert.equal(contact, result['2']);
            assert.equal(ticket, result['3']);
            assert.equal(gpsLocation, result['4']);
        })
    });

    it("Generates proof of reuse", async function () {
        let price = 50;

        device = await DepositDevice.at(device_address);
        await device.generateReuseProof(price);

        let proofs = await device.getProofs("reuse");

        assert.equal(proofs.length, 1);

        device.getReuseProof.call(proofs[0]).then(result => {
            assert.equal(price, result);
        })
    });

    it("Generates proof of disposal", async function () {
        let origin = accounts[1];
        let destination = accounts[2];
        let deposit = 10;
        let isResidual = false;

        device = await DepositDevice.at(device_address);
        await device.generateDisposalProof(web3.utils.toChecksumAddress(origin)
            , web3.utils.toChecksumAddress(destination), deposit, isResidual);

        let proofs = await device.getProofs("disposal");

        assert.equal(proofs.length, 1);

        device.getDisposalProof.call(proofs[0]).then(result => {
            assert.equal(origin, result['0']);
            assert.equal(destination, result['1']);
            assert.equal(deposit, result['2']);
            assert.equal(isResidual, result['3']);
        })
    });

    it("Generates proof of data wipe", async function () {
        let erasure_type = "QuickErase";
        let date = new Date().toLocaleString();
        let result = true;

        device = await DepositDevice.at(device_address);
        await device.generateDataWipeProof(erasure_type, date, result);

        let proofs = await device.getProofs("wipe");

        assert.equal(proofs.length, 1);

        device.getDataWipeProof.call(proofs[0]).then(result => {
            assert.equal(erasure_type, result['0']);
            assert.equal(date, result['1']);
            assert.equal(result, result['2']);
        })
    });

})
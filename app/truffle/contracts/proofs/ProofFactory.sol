pragma solidity ^0.4.25;

import "contracts/proofs/DataWipeProof.sol";
import "contracts/proofs/ReuseProof.sol";
import "contracts/proofs/RecycleProof.sol";
import "contracts/proofs/FunctionProof.sol";

contract ProofFactory {
    constructor() public {}
    event NewProof(address proof);

    function generateDataWipe(string erasure, bool result, string time)
        public
        returns (address _proof)
    {
        DataWipeProof proof = new DataWipeProof(erasure, result, time);
        emit NewProof(proof);
        return proof;
    }

    function generateFunction(uint256 score) public returns (address _proof) {
        FunctionProof proof = new FunctionProof(score);
        emit NewProof(proof);
        return proof;
    }

    function generateReuse() public returns (address _proof) {
        ReuseProof proof = new ReuseProof();
        emit NewProof(proof);
        return proof;
    }

    function generateRecycle(
        string collectionPoint,
        string time,
        string contact
    ) public returns (address _proof) {
        RecycleProof proof = new RecycleProof(collectionPoint, time, contact);
        emit NewProof(proof);
        return proof;
    }
}

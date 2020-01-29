pragma solidity ^0.4.25;

import "contracts/proofs/DataWipeProof.sol";
import "contracts/proofs/ReuseProof.sol";
import "contracts/proofs/RecycleProof.sol";
import "contracts/proofs/FunctionProof.sol";

contract ProofFactory {
    constructor() public {}

    function generateDataWipe(string erasure, bool result, string time)
        public
        returns (address _proof)
    {
        return new DataWipeProof(erasure, result, time);
    }

    function generateFunction(uint256 score) public returns (address _proof) {
        return new FunctionProof(score);
    }

    function generateReuse() public returns (address _proof) {
        return new ReuseProof();
    }

    function generateRecycle(
        string collectionPoint,
        string time,
        string contact
    ) public returns (address _proof) {
        return new RecycleProof(collectionPoint, time, contact);
    }
}

pragma solidity ^0.4.25;

import "contracts/proofs/Proof.sol";

contract FunctionProof is Proof {
    uint256 private score;

    constructor(address _device, uint256 _score) public Proof() {
        score = _score;
        addProof(_device, types.FUNCTION, this);
    }

    function getScore() public view returns (uint256 _score) {
        return score;
    }

}

pragma solidity ^0.4.25;

import "contracts/proofs/Proof.sol";

contract ReuseProof is Proof {
    constructor(address _device) public Proof() {
        addProof(_device, types.REUSE, this);
    }

}

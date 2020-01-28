pragma solidity ^0.4.25;

import "contracts/proofs/Proof.sol";

contract DataWipeProof is Proof {
    string private erasure_type;
    string private timestamp;
    bool private result;

    constructor(address _device, string erasure, bool _result, string time)
        public
        Proof()
    {
        erasure_type = erasure;
        result = _result;
        timestamp = time;
        addProof(_device, types.FUNCTION, this);
    }

    function getErasure() public view returns (string _erasure) {
        return erasure_type;
    }

    function getResult() public view returns (bool _result) {
        return result;
    }

    function getTimestamp() public view returns (string _time) {
        return timestamp;
    }
}

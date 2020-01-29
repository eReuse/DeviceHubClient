pragma solidity ^0.4.25;

contract DataWipeProof {
    string private erasure_type;
    string private timestamp;
    bool private result;

    constructor(string erasure, bool _result, string time)
        public
    {
        erasure_type = erasure;
        result = _result;
        timestamp = time;
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

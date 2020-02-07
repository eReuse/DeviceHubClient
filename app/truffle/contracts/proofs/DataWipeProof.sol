pragma solidity ^0.4.25;

contract DataWipeProof {
    string private erasure_type;
    string private date;
    bool private result;

    constructor(string erasure, bool _result, string _timestamp)
        public
    {
        erasure_type = erasure;
        result = _result;
        date = _timestamp;
    }

    function getErasure() public view returns (string _erasure) {
        return erasure_type;
    }

    function getResult() public view returns (bool _result) {
        return result;
    }

    function getDate() public view returns (string _date) {
        return date;
    }
}

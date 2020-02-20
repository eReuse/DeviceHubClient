pragma solidity ^0.4.25;
import "contracts/proofs/GenericProof.sol";

contract DataWipeProofs is GenericProof {
    struct ProofData {
        string erasureType;
        string date;
        bool erasureResult;
    }

    mapping(bytes32 => ProofData) dataProofs;

    constructor() public GenericProof() {}

    function getProofData(bytes32 _hash)
        public
        view
        returns (string _erasureType, string _date, bool _erasureResult)
    {
        return (
            dataProofs[_hash].erasureType,
            dataProofs[_hash].date,
            dataProofs[_hash].erasureResult
        );
    }

    function setProofData(
        address device_addr,
        address owner,
        string erasureType,
        string date,
        bool erasureResult
    ) public returns (bytes32 _hash_){
        bytes32 _hash = generateHash(device_addr);
        setProof(_hash, device_addr, owner);
        dataProofs[_hash] = ProofData(erasureType, date, erasureResult);
        return _hash;
    }
}

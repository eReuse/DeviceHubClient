pragma solidity ^0.4.25;
import "contracts/proofs/GenericProof.sol";

contract ReuseProofs is GenericProof {
    struct ProofData {
        uint256 price;
    }

    mapping(bytes32 => ProofData) dataProofs;

    constructor() public GenericProof() {}

    function getProofData(bytes32 _hash) public view returns (uint256 _price) {
        return dataProofs[_hash].price;
    }

    function setProofData(address device_addr, address owner, uint256 price)
        public
        returns (bytes32 _hash_)
    {
        bytes32 _hash = generateHash(device_addr);
        setProof(_hash, device_addr, owner);
        dataProofs[_hash] = ProofData(price);
        return _hash;
    }

}

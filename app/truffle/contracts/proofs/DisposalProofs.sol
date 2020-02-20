pragma solidity ^0.4.25;
import "contracts/proofs/GenericProof.sol";

contract DisposalProofs is GenericProof {
    struct ProofData {
        address origin;
        address destination;
        uint256 deposit;
        bool isResidual;
    }

    mapping(bytes32 => ProofData) dataProofs;

    constructor() public GenericProof() {}

    function getProofData(bytes32 _hash)
        public
        view
        returns (
            address _origin,
            address _destination,
            uint256 _deposit,
            bool _residual
        )
    {
        return (
            dataProofs[_hash].origin,
            dataProofs[_hash].destination,
            dataProofs[_hash].deposit,
            dataProofs[_hash].isResidual
        );
    }

    function setProofData(
        address device_addr,
        address owner,
        address origin,
        address destination,
        uint256 deposit,
        bool residual
    ) public returns (bytes32 _hash_) {
        bytes32 _hash = generateHash(device_addr);
        setProof(_hash, device_addr, owner);
        dataProofs[_hash] = ProofData(origin, destination, deposit, residual);
        return _hash;
    }
}

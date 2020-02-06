pragma solidity ^0.4.25;

contract Proofs {
    struct proofTypes {
        uint256 WIPE;
        uint256 FUNCTION;
        uint256 REUSE;
        uint256 RECYCLE;
        uint256 DISPOSAL;
    }
    proofTypes internal types;

    mapping(address => mapping(uint256 => address)) private proofs_per_device;

    constructor() public {
        initializeTypes();
    }

    function initializeTypes() private {
        types.WIPE = 0;
        types.FUNCTION = 1;
        types.REUSE = 2;
        types.RECYCLE = 3;
        types.DISPOSAL = 4;
    }

    function addProof(address _device, uint256 proof_type, address proof)
        public returns(address _proof)
    {
        proofs_per_device[_device][proof_type] = proof;
        return proof;
    }

    function getProof(address _device, uint256 proof_type)
        public
        view
        returns (address _proof)
    {
        return proofs_per_device[_device][proof_type];
    }
}

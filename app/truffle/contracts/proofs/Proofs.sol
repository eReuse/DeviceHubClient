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

    mapping(address => mapping(uint256 => address)) private proofsPerDevice;

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

    function addProof(address device, uint256 proof_type, address proof)
        public returns(address _proof)
    {
        proofsPerDevice[device][proof_type] = proof;
        return proof;
    }

    function getProof(address device, uint256 proof_type)
        public
        view
        returns (address _proof)
    {
        return proofsPerDevice[device][proof_type];
    }
}

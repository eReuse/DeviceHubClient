pragma solidity ^0.4.25;

contract FunctionProof {
    uint256 private score;
    uint256 private usage;

    constructor(uint256 _score, uint256 _usage) public {
        score = _score;
        usage = _usage;
    }

    function getScore() public view returns (uint256 _score) {
        return score;
    }

    function getUsage() public view returns (uint256 _usage) {
        return usage;
    }

}

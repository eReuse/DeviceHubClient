pragma solidity ^0.4.25;

contract FunctionProof {
    uint256 private score;

    constructor(uint256 _score) public {
        score = _score;
    }

    function getScore() public view returns (uint256 _score) {
        return score;
    }

}

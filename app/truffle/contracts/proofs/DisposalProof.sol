pragma solidity ^0.4.25;

contract DisposalProof {
    address private origin;
    address private destination;
    uint256 private deposit;

    constructor(address _origin, address _destination, uint256 _deposit)
        public
    {
        origin = _origin;
        destination = _destination;
        deposit = _deposit;
    }

    function getOrigin() public view returns (address _origin) {
        return origin;
    }

    function getDestination() public view returns (address _destination) {
        return destination;
    }

    function getDeposit() public view returns (uint256 _deposit) {
        return deposit;
    }
}

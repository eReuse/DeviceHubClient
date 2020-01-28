pragma solidity ^0.4.25;

import "contracts/proofs/Proof.sol";

contract RecycleProof is Proof {
    string private collectPoint;
    string private timestamp;
    string private contact;

    constructor(
        address _device,
        string _collectionPoint,
        string _time,
        string _contact
    ) public Proof() {
        collectPoint = _collectionPoint;
        timestamp = _time;
        contact = _contact;
        addProof(_device, types.RECYCLE, this);
    }

    function getCollectionPoint() public view returns (string _collection) {
        return collectPoint;
    }

    function getTimestamp() public view returns (string _time) {
        return timestamp;
    }

    function getContact() public view returns (string _contact) {
        return contact;
    }

}

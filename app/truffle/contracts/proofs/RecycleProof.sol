pragma solidity ^0.4.25;

contract RecycleProof {
    string private collectPoint;
    string private timestamp;
    string private contact;

    constructor(string _collectionPoint, string _time, string _contact) public {
        collectPoint = _collectionPoint;
        timestamp = _time;
        contact = _contact;
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

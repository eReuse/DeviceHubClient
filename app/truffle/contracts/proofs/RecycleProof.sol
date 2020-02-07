pragma solidity ^0.4.25;

contract RecycleProof {
    string private collectPoint;
    string private date;
    string private contact;

    constructor(string _collectionPoint, string _date, string _contact) public {
        collectPoint = _collectionPoint;
        date = _date;
        contact = _contact;
    }

    function getCollectionPoint() public view returns (string _collection) {
        return collectPoint;
    }

    function getDate() public view returns (string _timestamp) {
        return date;
    }

    function getContact() public view returns (string _contact) {
        return contact;
    }

}

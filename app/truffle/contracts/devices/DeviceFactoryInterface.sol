pragma solidity ^0.4.25;

contract DeviceFactoryInterface {
    mapping(address => address[]) deployed_devices;
    address public daoAddress;

    function transfer(address _new_owner) public;
    function deleteOwnership(address owner) internal;
    function createDevice(string _name, uint256 _initValue, address _owner)
        public
        returns (address _device);
    function recycle(address _owner) public;
}

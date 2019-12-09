pragma solidity ^0.4.25;

contract DeliveryNoteInterface {
    address sender;
    address receiver;
    uint deposit;
    uint state;
    address[] devices;
    mapping(address => bool) private devicesAdded;
    uint num_devices;

    /////  REGISTER  /////

    function addDevice(address _device, address _owner, uint256 _deposit) public;

    /////  TRANSFER  /////

    function emitDeliveryNote() public;
    function acceptDeliveryNote(uint _deposit) public;
    function tranferDevices() internal;
    function transferDevice(address _device, uint _deposit) internal;

    /////  RECYCLE  /////

    function acceptRecycle() public;
    function recycleDevices() internal;
    function recycleDevice(address _device) internal;
    
}

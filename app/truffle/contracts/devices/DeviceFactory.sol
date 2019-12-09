pragma solidity ^0.4.25;

import "contracts/devices/DepositDevice.sol";
import "contracts/DAOInterface.sol";
import "contracts/helpers/RoleManager.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract DeviceFactory {
  address public daoAddress;
  DAOInterface public dao;
  RoleManager roleManager;
  mapping(address => address[]) deployed_devices;

  constructor(address _daoAddress) public {
    daoAddress = _daoAddress;
    dao = DAOInterface(daoAddress);
    address roleManagerAddress = dao.getRoleManager();
    roleManager = RoleManager(roleManagerAddress);
  }

  function createDevice(string _name, uint _initValue, address _owner) public
  returns (address newContract){
    // require(roleManager.isNotary(msg.sender), "This device contract was not created by a Notary");
    newContract = new DepositDevice(_name,  _owner, _initValue, daoAddress);
    deployed_devices[_owner].push(newContract);
    return newContract;
  }

  function transfer(address _new_owner) public{
    DepositDevice d = DepositDevice(msg.sender);
    address owner = d.getOwner();
    
    deleteOwnership(owner);
    deployed_devices[_new_owner].push(msg.sender);
  }

  function deleteOwnership(address owner) internal{
    uint length = deployed_devices[owner].length;
    for(uint i = 0; i < length; i++){
      if(deployed_devices[owner][i] == msg.sender){
        deployed_devices[owner][i] = deployed_devices[owner][length - 1];
        delete deployed_devices[owner][length - 1];
        deployed_devices[owner].length--;
        break;
      }
    }
  }

  function recycle(address _owner) public{
    deleteOwnership(_owner);
  }

  function getDeployedDevices() public view
  returns(address[] _deployed_devices){
    return deployed_devices[msg.sender];
  }

}
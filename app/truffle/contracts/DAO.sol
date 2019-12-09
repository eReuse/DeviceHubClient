pragma solidity ^0.4.25;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "contracts/DAOInterface.sol";

contract DAO is Ownable {
  address public ERC20;
  address public ERC721;
  address public RoleManager;
  address public OracleQuery;
  address public DeviceFactory;
  address OracleResponse;
  address ReserveAccount;
  // uint256 public pricePerMB;


  constructor(address _OracleQuery)
    public
  {
    OracleResponse = msg.sender;
    OracleQuery = _OracleQuery;
  }

  function setOracleQueryAddress(address _address)  public onlyOwner {
    OracleQuery = _address;
  }

  function getOracleQueryAddress() public view returns (address) {
    return OracleQuery;
  }

  function setOracleResponseAddress(address _address) public onlyOwner {
    OracleResponse = _address;
  }

  function getOracleResponseAddress() public view returns (address) {
    return OracleResponse;
  }

  function getERC20() public view returns(address) {
    return ERC20;
  }

  function setERC20(address _address) public onlyOwner returns(bool) {
    ERC20 = _address;
    return true;
  }

  function setERC721(address _address) public onlyOwner returns(bool) {
    ERC721 = _address;
    return true;
  }

  function getERC721() public view returns(address) {
    return ERC721;
  }

  function setRoleManager(address _address)  public onlyOwner {
    RoleManager = _address;
  }

  function getRoleManager() public view returns (address) {
    return RoleManager;
  }

  function setDeviceFactory(address _address)  public onlyOwner {
    DeviceFactory = _address;
  }

  function getDeviceFactory() public view returns (address) {
    return DeviceFactory;
  }

}

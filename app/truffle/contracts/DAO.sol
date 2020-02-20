pragma solidity ^0.4.25;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "contracts/DAOInterface.sol";

contract DAO is Ownable {
    address public ERC20;
    address public ERC721;
    address public RoleManager;
    address public OracleQuery;
    address public DeviceFactory;
    address public DataWipeProofs;
    address public FunctionProofs;
    address public RecycleProofs;
    address public ReuseProofs;
    address public DisposalProofs;
    address OracleResponse;
    address ReserveAccount;
    // uint256 public pricePerMB;

    constructor(address _OracleQuery) public {
        OracleResponse = msg.sender;
        OracleQuery = _OracleQuery;
    }

    function setOracleQueryAddress(address _address) public onlyOwner {
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

    function getERC20() public view returns (address) {
        return ERC20;
    }

    function setERC20(address _address) public onlyOwner returns (bool) {
        ERC20 = _address;
        return true;
    }

    function setERC721(address _address) public onlyOwner returns (bool) {
        ERC721 = _address;
        return true;
    }

    function getERC721() public view returns (address) {
        return ERC721;
    }

    function setRoleManager(address _address) public onlyOwner {
        RoleManager = _address;
    }

    function getRoleManager() public view returns (address) {
        return RoleManager;
    }

    function setDeviceFactory(address _address) public onlyOwner {
        DeviceFactory = _address;
    }

    function getDeviceFactory() public view returns (address) {
        return DeviceFactory;
    }

    function setDataWipeProofs(address _address) public onlyOwner {
        DataWipeProofs = _address;
    }

    function getDataWipeProofs() public view returns (address) {
        return DataWipeProofs;
    }

    function setFunctionProofs(address _address) public onlyOwner {
        FunctionProofs = _address;
    }

    function getFunctionProofs() public view returns (address) {
        return FunctionProofs;
    }

    function setReuseProofs(address _address) public onlyOwner {
        ReuseProofs = _address;
    }

    function getReuseProofs() public view returns (address) {
        return ReuseProofs;
    }

    function setRecycleProofs(address _address) public onlyOwner {
        RecycleProofs = _address;
    }

    function getRecycleProofs() public view returns (address) {
        return RecycleProofs;
    }

    function setDisposalProofs(address _address) public onlyOwner {
        DisposalProofs = _address;
    }

    function getDisposalProofs() public view returns (address) {
        return DisposalProofs;
    }
}

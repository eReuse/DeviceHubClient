pragma solidity ^0.4.25;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/access/Roles.sol";



contract RoleManager is Ownable{
    Role consumers;
    Role producers;
    Role processors;
    Role repairers;
    Role itads;
    Role notaries;

    constructor() public {
        consumers = new Role('consumer');
        producers = new Role('producer');
        processors = new Role('processor');
        repairers = new Role('repairer');
        itads = new Role('itads');
        notaries = new Role('notaries');
    }
    // getters ----------------------------------------------------

    function getConsumers() public view returns (Role addr){
        return consumers;
    }

    function getProcessors() public view returns (Role addr){
        return processors;
    }

    function getProducers() public view returns (Role addr){
        return producers;
    }

    function getItads() public view returns (Role addr){
        return itads;
    }

    function getRepairers() public view returns (Role addr){
        return repairers;
    }

    function getNotaries() public view returns (Role addr){
        return notaries;
    }
    //TODO Reduce code by add enums for the different Roels?

    // add Member  ----------------------------------------------------
    function addProducer(address _producer) public onlyOwner {
        producers.addMember(_producer);
    }

    function addConsumer(address _consumer) public onlyOwner {
        consumers.addMember(_consumer);
    }

    function addProcessor(address _processor) public onlyOwner {
        processors.addMember(_processor);
    }

    function addItad(address _itad) public onlyOwner {
        itads.addMember(_itad);
    }

    function addRepairer(address _repairer) public onlyOwner {
        repairers.addMember(_repairer);
    }

    function addNotary(address _notary) public onlyOwner {
        notaries.addMember(_notary);
    }

    // delete Member  ----------------------------------------------------
    function delProducer(address _producer) public onlyOwner {
        producers.delMember(_producer);
    }

    function delConsumer(address _consumer) public onlyOwner {
        consumers.delMember(_consumer);
    }

    function delProcessor(address _processor) public onlyOwner {
        processors.delMember(_processor);
    }

    function delItad(address _itad) public onlyOwner {
        itads.delMember(_itad);
    }

    function delRepairer(address _repairer) public onlyOwner {
        repairers.delMember(_repairer);
    }

    function delNotary(address _notary) public onlyOwner {
        notaries.delMember(_notary);
    }

    // check Member  ----------------------------------------------------
    function isProducer(address _producer) public view returns(bool) {
        return producers.isMember(_producer);
    }

    function isConsumer(address _consumer) public view returns(bool) {
        return consumers.isMember(_consumer);
    }

    function isProcessor(address _processor) public view returns(bool) {
        return processors.isMember(_processor);
    }

    function isItad(address _itad) public view returns(bool) {
        return itads.isMember(_itad);
    }

    function isRepairer(address _repairer) public view returns(bool) {
        return repairers.isMember(_repairer);
    }

    function isNotary(address _notary) public view returns(bool) {
        return notaries.isMember(_notary);
    }
}

contract Role is Ownable {
  using Roles for Roles.Role;

  event MemberAdded(string indexed role, address account);
  event MemberRemoved(string indexed role, address account);

  Roles.Role private Members;

  string role;

  constructor(string _role) public {
    role = _role;
  }

  modifier onlyMember() {
    require(isMember(msg.sender), "The message sender is not a recycler");
    _;
  }

  function isMember(address account) public view returns (bool) {
    return Members.has(account);
  }

  function addMember(address account) public onlyOwner {
    require(!isMember(account), "This account has already been registered in this role");
    _addMember(account);
  }

  function delMember(address account) public onlyOwner {
    require(!isMember(account), "This account has not been registered in this role");
    _delMember(account);
  }

  function _addMember(address account) internal {
    Members.add(account);
    emit MemberAdded(role, account);
  }

  function _delMember(address account) internal {
    Members.remove(account);
    emit MemberRemoved(role, account);
  }
}
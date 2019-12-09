pragma solidity ^0.4.25;
/*
Based on https://github.com/axic/tinyoracle
*/

//
// This is where the magic happens
//
// This contract will receive the actual query from the caller
// contract. Assign a unique (well, sort of) identifier to each
// incoming request, and emit an event our RPC client is listening
// for.
//
contract OracleDispatch {
  event Incoming(bytes32 id, address recipient, string queryType, address originator, string query);
  // event _Incoming(bytes32 id, address recipient, string queryType, address originator, uint owed, uint funds, uint pricePerMB);

  function query(string _queryType, address _originator, string _query) external returns (bytes32) {
    bytes32 queryId;
    queryId = keccak256(abi.encodePacked(block.number, now, _query, msg.sender));
    emit Incoming(queryId, msg.sender, _queryType, _originator, _query);
    return queryId;
  }

  // function _query(string _queryType, address _originator, uint _owed, uint _funds, uint _pricePerMB) external returns (bytes32) {
  //   bytes32 queryId;
  //   queryId = keccak256(abi.encodePacked(block.number, now, _owed, msg.sender));
  //   emit _Incoming(queryId, msg.sender, _queryType, _originator, _owed, _funds, _pricePerMB);
  //   return queryId;
  // }

  // The basic housekeeping

  address owner;

  modifier owneronly {
    require(msg.sender == owner, "This operation is restricted only to the owner");
    _;
  }

  function setOwner(address _owner) public owneronly {
    owner = _owner;
  }

  constructor() public {
    owner = msg.sender;
  }

  function kill() public owneronly {
    selfdestruct(msg.sender);
  }
}

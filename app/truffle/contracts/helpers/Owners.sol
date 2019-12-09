pragma solidity ^0.4.25;
/*
* @title User inventory
* TODO Who is the entity that adds and deletes users? The user himself?
* An external entity with authority? Both of these actors?
* TODO Implement owner according also to the above function
* TODO what needs to be stored in the User struct?
*/
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Users is Ownable {

  struct User {
    string uri;

  }

  mapping (address => bool)  internal userExists;
  mapping (address => User) internal users;

  event LogUserAdded(address addr);

  /**
   * @dev User registers himself.
   * @param _uri The user identifies its unique URI
   * TODO maybe only owner can register users? What about the URI generation?
   */
  function addUser(string _uri) internal {
    require(!userExists[msg.sender], "The message sender already exists");
    userExists[msg.sender] = true;
    users[msg.sender] = User(_uri);
    emit LogUserAdded(msg.sender);
  }

  /**
   * @dev The owner registers a user.
   * @param _uri The user URI
   * @param _address The user address
   * TODO maybe only owner can register users? What about the URI generation?
   */
  function addUser(string _uri, address _address) internal onlyOwner {
    require(!userExists[msg.sender], "The message sender already exists");
    userExists[ _address] = true;
    users[ _address] = User(_uri);
    emit LogUserAdded(_address);
  }

  /**
   * @dev The user removes himself from the registry.
   * TODO maybe only owner can delete users? What about the URI generation?
   * TODO Is that ok for deleting?
   */
  function deleteUser() internal {
    require(userExists[msg.sender], "The message sender is not an existing user");
    userExists[msg.sender] = false;
    users[msg.sender] = User('');
    //userExists[msg.sender]
  }

  /**
   * @dev The user removes himself from the registry.
   * @param _address The user address.
   * TODO Is that ok for deleting?
   */
  function deleteUser(address _address) internal onlyOwner {
    require(userExists[_address], "The message sender is not an existing user");
    userExists[_address] = false;
    users[msg.sender] = User('');
    //userExists[msg.sender]
  }

}

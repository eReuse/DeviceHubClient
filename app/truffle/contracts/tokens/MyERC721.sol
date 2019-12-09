pragma solidity ^0.4.25;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
//import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol';
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract MyERC721 is ERC721Full, Ownable{

  constructor(string _name, string _symbol)
  ERC721Full(_name, _symbol)
  public {}

  function mint(address _to, uint256 tokenId)
  public
  {
    _mint(_to, tokenId);
  }

  function burn(address sender, uint256 tokenId)
  public
  {
    _burn(sender, tokenId);
  }
}

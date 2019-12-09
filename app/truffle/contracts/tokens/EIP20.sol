/*
Implements EIP20 token standard: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
.*/
pragma solidity ^0.4.25;

import "./EIP20Interface.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract EIP20 is EIP20Interface, Ownable {

    uint256 constant private MAX_UINT256 = 2**256 - 1;
    event Transfer(address _from, address _to, uint256 _value);
    event Approval(address _owner, address _spender, uint256 _value);
    event Information(address from, address to, address sender, uint value);
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    string public name;
    uint8 public decimals;
    string public symbol;

    modifier validDestination( address to ) {
        require(to != address(0x0), "The given address is not a valid destination");
        require(to != address(this), "This contract is not a valid destination");
        _;
    }

    constructor(
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol
    ) public {
        balances[msg.sender] = _initialAmount;
        totalSupply = _initialAmount;
        name = _tokenName;
        decimals = _decimalUnits;
        symbol = _tokenSymbol;
    }
    function transfer(address _to, uint256 _value)
      public
      validDestination(_to)
      returns (bool success)
    {
        require(balances[msg.sender] >= _value, "The sending account doesn't have enough funds");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value)
      public
      validDestination(_to)
      returns (bool success)
    {
        // emit Information(_from, _to, msg.sender, _value);
        // Use along with approve, only when we want to transfer from one account to a third account.
        uint256 allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value, "The sending account doesn't have enough funds");
        require(allowance >= _value, "The allowance is not enough");
        balances[_to] += _value;
        balances[_from] -= _value;
        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        emit Transfer(_from, _to, _value);
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}

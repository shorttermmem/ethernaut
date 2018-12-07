pragma solidity ^0.4.18;

import "levels/base/Level.sol";
import "levels/King.sol";

contract KingFactory is Level {

  uint public insertCoin = 1 ether;

  event LevelInstanceCreatedLog(address indexed player, address instance);
  event log(string status);
  event log(address indexed addr);
  //event LevelCompletedLog(address indexed player, Level level);


  function createInstance(address _player) public payable returns (address) {
    _player;
    require(msg.value >= insertCoin);

    address instance = (new King).value(msg.value)();
    // Retrieve created instance via logs.
    emit LevelInstanceCreatedLog(msg.sender, instance);

    return instance;
  }

  function validateInstance(address _instance, address _player) public returns (bool) {
    _player;
    King instance = King(_instance);
    !address(instance).call.value(0)();
    return instance.king() != address(this);
  }

  function() public payable {}

}

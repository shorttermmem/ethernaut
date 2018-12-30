[![Build Status](https://travis-ci.org/shorttermmem/ethernaut.svg?branch=staging)](https://travis-ci.org/shorttermmem/ethernaut)
[![Build status](https://ci.appveyor.com/api/projects/status/el8km2bitpexanl0?svg=true)](https://ci.appveyor.com/project/shorttermmem/ethernaut)
[![codecov](https://codecov.io/gh/shorttermmem/ethernaut/branch/master/graph/badge.svg)](https://codecov.io/gh/shorttermmem/ethernaut)

# Ethernaut - Learn Ethereum Smart Contracts by Hacking
- Sample solutions and automated tests for all ethernaut levels using the truffle framework (https://truffleframework.com/). 
- Ethernaut is a Capture the Flag (CTF) type competition where you must hack victim solidity contracts provided by (https://ethernaut.zeppelin.solutions/).
### Status
- [x] 0. Hello Ethernaut
- [x] 1. Fallback
- [x] 2. Fallout
- [x] 3. Coin Flip
- [x] 4. Telephone
- [x] 5. Token
- [x] 6. Delegation
- [x] 7. Force
- [x] 8. Vault
- [x] 9. King
- [x] 10. Re-entrancy
- [x] 11. Elevator
- [x] 12. Privacy
- [ ] 13. Gatekeeper One
- [x] 14. Gatekeeper Two
- [ ] 15. Naught Coin
- [x] 16. Preservation
- [x] 17. Locked
- [ ] 18. Recovery
- [ ] 19. MagicNumber
- [ ] 20. Alien Codex
- [ ] 21. Denial
- [x] 22. Shop

### Getting Started
Clone the repo.

`git clone https://github.com/shorttermmem/ethernaut.git`

Install required dependencies.

`npm install`

Run a specific test for the contract 'Basic' on the local development blockchain.

`truffle test test/basic.test.js --network dev`

Master status:
[![Build Status](https://travis-ci.org/shorttermmem/ethernaut.svg?branch=master)](https://travis-ci.org/shorttermmem/ethernaut)
[![Build status](https://ci.appveyor.com/api/projects/status/el8km2bitpexanl0?svg=true)](https://ci.appveyor.com/project/shorttermmem/ethernaut)
[![codecov](https://codecov.io/gh/shorttermmem/ethernaut/branch/master/graph/badge.svg)](https://codecov.io/gh/shorttermmem/ethernaut)
[![Coverage Status](https://coveralls.io/repos/github/shorttermmem/ethernaut/badge.svg?branch=master)](https://coveralls.io/github/shorttermmem/ethernaut?branch=master)

Staging status:
[![Build Status](https://travis-ci.org/shorttermmem/ethernaut.svg?branch=staging)](https://travis-ci.org/shorttermmem/ethernaut)

# ethernaut
- Sample solutions and automated tests for all ethernaut levels using the truffle framework (https://truffleframework.com/). 
- Ethernaut is a Capture the Flag (CTF) type competition where you must hack victim solidity contracts provided by (https://ethernaut.zeppelin.solutions/).
### Status
- [ ] 0. Hello Ethernaut
- [ ] 1. Fallback
- [ ] 2. Fallout
- [x] 3. Coin Flip
- [x] 4. Telephone
- [ ] 5. Token
- [ ] 6. Delegation
- [ ] 7. Force
- [x] 8. Vault
- [x] 9. King
- [ ] 10. Re-entrancy
- [ ] 11. Elevator
- [x] 12. Privacy
- [ ] 13. Gatekeeper One
- [ ] 14. Gatekeeper Two
- [ ] 15. Naught Coin
- [ ] 16. Preservation
- [ ] 17. Locked
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

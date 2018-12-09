//https://truffleframework.com/docs/truffle/reference/configuration
require('dotenv').config();

let HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  //contracts_build_directory: "./build",
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      network_id: "*" // Match any network id
    },
    ganache: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8555,         // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01      // <-- Use this low gas price
    },
    ropsten:  {
      provider: function() {
        return new HDWalletProvider(
          process.env.WALLET_KEY, 
          "https://ropsten.infura.io/db29611c34844e2197634a44dbac1344")
      },
      network_id: 3,
      gas: 3000000,    //make sure this gas allocation isn't over 4M, which is the max
      gasPrice: 100000000000
      // optional config values:
      // from - default address to use for any transaction Truffle makes during migrations
      // provider - web3 provider instance Truffle should use to talk to the Ethereum network.
      //          - function that returns a web3 provider instance (see below.)
      //          - if specified, host and port are ignored.
    }
  },
  solc: {
    //https://solidity.readthedocs.io/en/v0.4.24/using-the-compiler.html
    optimizer: {
      enabled: false,
      runs: 200
    }
  },
  mocha: {
    useColors: true
  }
};
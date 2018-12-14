//https://truffleframework.com/docs/truffle/reference/configuration
require('dotenv').config();

const assert = require("assert")
const HDWalletProvider = require("truffle-hdwallet-provider");

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
        assert(process.env.INFURA_API_TOKEN, 'missing INFURA_API_TOKEN in .env file');
        assert(process.env.HD_WALLET_MNEMONIC, 'missing HD_WALLET_MNEMONIC in .env file');

        return new HDWalletProvider(
          process.env.HD_WALLET_MNEMONIC, 
          "https://ropsten.infura.io/${process.env.INFURA_API_TOKEN}")
      },
      network_id: 3,
      gas: 4e6,    //make sure this gas allocation isn't over 4M, which is the max
      // optional config values:
      // from - default address to use for any transaction Truffle makes during migrations
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
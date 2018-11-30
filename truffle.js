/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

 /*
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
};
*/
var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 9545,     // debugger expects to be on port 9545
      network_id: "*" // Match any network id
    },
    ganache: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten:  {
      provider: function() {
        return new HDWalletProvider(
          'club vocal bronze hair vocal card remember seek web half lobster outside', 
          "https://ropsten.infura.io/db29611c34844e2197634a44dbac1344")
      },
      network_id: 3,
      gas: 4000000    //make sure this gas allocation isn't over 4M, which is the max
    }
  }
};
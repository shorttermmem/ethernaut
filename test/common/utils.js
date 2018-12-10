// utils.js
module.exports = {
  logWallet : async function (VAR, account, message) {
    console.log(VAR, " balance:", (await web3.eth.getBalance(account)).toNumber())
  }
}
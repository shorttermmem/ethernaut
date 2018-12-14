// utils.js
module.exports = {
  logWallet : async function (VAR, account, message) {

    if (process.env.DEBUG_LOG) {
        console.log(VAR, " balance:", (await web3.eth.getBalance(account)).toNumber())
    }
  }
}
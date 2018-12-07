// utils.js
module.exports = {
  createLevelInstance : async function (factoryContract, player, newContract, params) {
    return new Promise(async (resolve, reject) =>{
        const data = params || {from: player}
        const tx = await factoryContract.createInstance(player, data)
        if(tx.logs.length === 0) 
        {
            console.log("tx: ", await tx.receipt)
            reject(new Error("tx: " + tx.receipt.transactionHash))
        }
        else 
        {
            const instanceAddr = tx.logs[0].args.instance
            const instance = newContract.at(instanceAddr)
            resolve(instance)
        }
    })
  },

  logWallet : async function (VAR, account, message) {
    console.log(VAR, " balance:", (await web3.eth.getBalance(account)).toNumber())
  }
}
var AttackContract = artifacts.require("CoinFlipHack");

module.exports = function(deployer){
    deployer.deploy(AttackContract).then(async (instance) =>{
        console.log("Successfully deployed CoinFlipHack: " + instance.address)
    });
};

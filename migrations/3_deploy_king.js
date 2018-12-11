var AttackContract = artifacts.require("KingHack");

module.exports = function(deployer){
    deployer.deploy(AttackContract).then(async (instance) =>{
        console.log("Successfully deployed KingHack: " + instance.address)
    });
};

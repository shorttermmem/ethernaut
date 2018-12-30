var AttackContract = artifacts.require("LockedHack");

module.exports = function(deployer){
    deployer.deploy(AttackContract).then(async (instance) =>{
        console.log("Successfully deployed LockedHack: " + instance.address)
    });
};

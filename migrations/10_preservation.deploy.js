var AttackContract = artifacts.require("PreservationHack");

module.exports = function(deployer){
    deployer.deploy(AttackContract).then(async (instance) =>{
        console.log("Successfully deployed PreservationHack: " + instance.address)
    });
};

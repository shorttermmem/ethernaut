var AttackContract = artifacts.require("FallbackHack");

module.exports = function(deployer){
    deployer.deploy(AttackContract);
};

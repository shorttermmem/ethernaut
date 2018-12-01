var Telephone = artifacts.require("Telephone");
var TelephoneHack = artifacts.require("TelephoneHack");

module.exports = (deployer, accounts) => {
    deployer.deploy(Telephone)
    .then(() => Telephone.deployed())
    .then((instance) => deployer.deploy(TelephoneHack, instance.address));  
};
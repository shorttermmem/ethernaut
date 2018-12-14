const TelephoneHack = artifacts.require("TelephoneHack");

module.exports = (deployer, accounts) => {
    deployer.deploy(TelephoneHack);
};
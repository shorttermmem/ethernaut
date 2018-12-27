const VaultHack = artifacts.require("VaultHack");

module.exports = (deployer) => {
    deployer.deploy(VaultHack);
};
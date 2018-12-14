const VaultHack = artifacts.require("VaultHack");

module.exports = (deployer) => {
    // deployer.deploy(Vault, password)
    // .then(() => Vault.deployed())
    // .then((vault) => deployer.deploy(VaultHack, vault.address));  
    deployer.deploy(VaultHack);
};
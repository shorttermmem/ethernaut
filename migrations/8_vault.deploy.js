const Vault = artifacts.require("Vault");
const VaultHack = artifacts.require("VaultHack");

// randomized bytes32
var password = "0x420fffff69ffffffffff420ffffffff69ffffffffffffffff420ffffffffffff";

module.exports = (deployer) => {
    deployer.deploy(Vault, password)
    .then(() => Vault.deployed())
    .then((vault) => deployer.deploy(VaultHack, vault.address));  
};
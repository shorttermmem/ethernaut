const Vault = artifacts.require("Vault");
const VaultHack = artifacts.require("VaultHack");

contract("Vault", async (accounts) => {
    let vault;
    let vaultHack;

    before(async () => {
        // randomized bytes32
        let password = "0x420fffff69ffffffffff420ffffffff69ffffffffffffffff420ffffffffffff";
        vault = await Vault.new(password);
        vaultHack = await VaultHack.new();

        let isLocked = await vault.locked.call();
        assert.equal(isLocked, true, "victim not initialized correctly");
    });

    it("attacker should be able to unlock victim", async () => {
        let dataSlot = await web3.eth.getStorageAt(vault.address, 1)
        await vaultHack.attack(vault.address, dataSlot);

        let isLocked = await vault.locked.call();
        assert.equal(isLocked, false, "attacker did not unlock victim");
    });
});
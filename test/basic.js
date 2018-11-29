var Basic = artifacts.require("Basic");
var BasicHack = artifacts.require("BasicHack");

contract("Basic", async () => {
    it("victim should start locked", async () => {
        let basic = await Basic.deployed();
        let locked = await basic.locked.call();

        assert.equal(locked, true, "victim did not start locked");
    });

    it("attacker should be able to unlock victim", async () => {
        let basic = await Basic.deployed();
        let basicHack = await BasicHack.deployed();

        await basicHack.attack();
        let locked = await basic.locked.call();

        assert.equal(locked, false, "attacker could not unlock victim");
    });
});
const Basic = artifacts.require("Basic");
const BasicHack = artifacts.require("BasicHack");

contract("Basic", async () => {
    let basic;
    let basicHack;

    before(async () => {
        basic = await Basic.deployed();
        basicHack = await BasicHack.deployed();
    });

    it("victim should start locked", async () => {
        let locked = await basic.locked.call();

        assert.equal(locked, true, "victim did not start locked");
    });

    it("attacker should be able to unlock victim", async () => {
        await basicHack.attack();
        let locked = await basic.locked.call();

        assert.equal(locked, false, "attacker could not unlock victim");
    });
});
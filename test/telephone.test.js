const Telephone = artifacts.require("Telephone");
const TelephoneHack = artifacts.require("TelephoneHack");


contract("Telephone", (accounts) => {
    let telephone;
    let telephoneHack;

    before(async () => {
        telephone = await Telephone.deployed();
        telephoneHack = await TelephoneHack.deployed();
    });

    it("user should not be owner", async () => {
        let owner = await telephone.owner.call();
        let originalOwner = accounts[0];
        expect(owner).to.equal(originalOwner);
    });

    it("attacker should be able to become owner", async () => {
        let user = accounts[1];
        await telephoneHack.changeOwner(user);
        
        let owner = await telephone.owner.call();
        expect(owner).to.equal(user);
    });
});
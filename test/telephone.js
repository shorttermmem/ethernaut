var Telephone = artifacts.require("Telephone");
var TelephoneHack = artifacts.require("TelephoneHack");


contract("Telephone", (accounts) => {
    it("user should not be owner", async () => {
        let telephone = await Telephone.deployed();
        let owner = await telephone.owner.call();
        
        var originalOwner = accounts[0];
        expect(owner).to.equal(originalOwner);
    });

    it("attacker should be able to become owner", async () => {
        let telephone = await Telephone.deployed();
        let telephoneHack = await TelephoneHack.deployed();
        let user = accounts[1];
        
        await telephoneHack.changeOwner(user);
        
        let owner = await telephone.owner.call();
        expect(owner).to.equal(user);
    });
});
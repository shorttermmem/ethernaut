const Shop = artifacts.require("Shop");
const ShopHack = artifacts.require("ShopHack");

contract("Shop", () => {
    let shop;
    let shopHack;

    before(async () => {
        shop = await Shop.deployed();
        shopHack = await ShopHack.deployed();
    });

    it("victim should start not sold with a price of 100", async () => {
        let price = await shop.price.call();
        let isSold = await shop.isSold.call();

        expect(price.toNumber()).to.equal(100);   // price is a BigNumber
        expect(isSold).to.equal(false);
    });

    
    // Hack:
    // solidity-coverage's additional gas costs are too large for victim contract's hardcoded gas values
    if (process.env._.includes('solidity-coverage')) {
        try {
            // Note: this is expected to fail under solidity-coverage's added gas costs
            await shopHack.attack();
        } catch(err) {
            assert.strictEqual(err.message, "VM Exception while processing transaction: revert")
        }
        return;
    } else {
        it("attacker should be able to buy item for a price that is less than 100", async () => {

            await shopHack.attack();
            let price = await shop.price.call();
            let isSold = await shop.isSold.call();

            expect(isSold).to.equal(true);
            expect(price.toNumber()).to.be.below(100);
        });
    }


});
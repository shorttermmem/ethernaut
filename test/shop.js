"use strict";
// import {assert} from "chai";

var Shop = artifacts.require("Shop");
var ShopHack = artifacts.require("ShopHack");

contract("Shop", () => {
    it("victim should start not sold with a price of 100", async () => {
        let shop = await Shop.deployed();

        let price = await shop.price.call();
        let isSold = await shop.isSold.call();
        expect(price.toString()).to.equal("100");   // price is a BigNumber
        expect(isSold).to.equal(false);
    });

    it("attacker should be able to buy item for a price that is less than 100", async () => {
        let shop = await Shop.deployed();
        let shopHack = await ShopHack.deployed();

        await shopHack.attack();
        let price = await shop.price.call();
        let isSold = await shop.isSold.call();
        expect(isSold).to.equal(true);
        expect(price.toNumber()).to.be.below(100);
    });
});
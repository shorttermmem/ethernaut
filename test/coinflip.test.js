'use strict'

const utils = require('./common/utils');
const {assert, expect} = require('chai');
const CoinFlipHack = artifacts.require("CoinFlipHack");
const CoinFlip = artifacts.require("CoinFlip");

contract('CoinFlip', async (accounts) => {
    
    let coinfliphack;
    let coinflip;
    const block = web3.eth.getBlock("latest");
    
    const victim = accounts[1];
    const hacker = accounts[2];
    
    before(async () => {
       
        coinfliphack = await CoinFlipHack.new() ;
        coinflip = await CoinFlip.new();

        assert.equal(
            await coinflip.consecutiveWins(), 
            0,
            "zero wins to start"
        );
    });

    it("hacker guess 10 consecutive wins", async () => {

        let i = 0;
        for (; i < 10; ++i)
        {
            await coinfliphack.attack(coinflip.address, {
                from: hacker,
                gas: block.gasLimit
            });

            assert.equal(
                await coinflip.consecutiveWins(), 
                i + 1,
                "consecutiveWins should increment after attack."
            );   
        }
    });
});

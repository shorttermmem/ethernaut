// 'use strict'

// const {assert} = require('chai');
const ReentranceFactory = artifacts.require('ReentranceFactory');
const ReentranceHack = artifacts.require('ReentranceHack');
const TestLevel = artifacts.require('TestLevel'); 

contract('Reentrance', async (accounts) => {

    let test;
    let factory;
    let instance;
    let instanceHack;
    
    const initialBalance = parseInt(web3.toWei(1, 'ether'), 10);
    const owner = accounts[1];
    const hacker = accounts[2];

    before( async () => {
        factory = await ReentranceFactory.new();
        test = await TestLevel.new();
        let tx = await test.createLevelInstance(factory.address, {
            from: hacker,
            value: initialBalance
        });

        instance = tx.logs[0].args.instance;
        instanceHack = await ReentranceHack.new();

        let startBalance = web3.eth.getBalance(instance).toNumber();
        expect(startBalance).to.equal(initialBalance,
            'victim contract not initialized correctly');
    });

    it('withdraw all funds', async () => {
        await instanceHack.attack(instance, {
            value: initialBalance / 10
        });

        let currBalance = web3.eth.getBalance(instance).toNumber();
        expect(currBalance).to.equal(0,
            'attacker did not steal all funds from victim');
    });

    after( async () => {

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
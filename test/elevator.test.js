'use strict'

const {assert} = require('chai');
const Elevator = artifacts.require("Elevator");
const ElevatorHack = artifacts.require("ElevatorHack");
const ElevatorFactory = artifacts.require("ElevatorFactory");
const TestLevel = artifacts.require("TestLevel"); 

contract('Elevator', async (accounts) => {

    let factory;
    let instance;
    let instanceHack;
    let test;
    
    const owner = accounts[1];
    const hacker = accounts[2];

    beforeEach( async () => {
    
        factory = await ElevatorFactory.new();
        test = await TestLevel.new();
        let tx = await test.createLevelInstance(factory.address, {
            from: hacker
        });
        assert.notEqual(tx.logs[0].length, 0, "Failed to create level.");

        instance = tx.logs[0].args.instance;
        
        instanceHack = await ElevatorHack.new();
    });

    it("reach top floor", async () => {
        
        await instanceHack.attack(instance);

        assert.isTrue(
            await Elevator.at(instance).top(),
            "Should reached top floor."
        )
    });

    afterEach( async () => {

        let tx = await test.validateLevelInstance(instance, {
            from: hacker
        });
        assert.notEqual(tx.logs.length, 0, "Level not complete.");

        const log = tx.logs[0].args;
        const ethLevelAddress = log.level;
        const ethPlayer = log.player;
        
        assert.isTrue(
            (ethPlayer === hacker && factory.address === ethLevelAddress),
            "Level is not completed."
        );
    });

});
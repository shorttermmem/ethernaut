const Locked = artifacts.require('Locked');
const LockedFactory = artifacts.require('LockedFactory');
const LockedHack = artifacts.require('LockedHack');
const TestLevel = artifacts.require('TestLevel');

contract('Locked', async (accounts) => {

    let factory;
    let test;
    let instanceAddress;
    let instanceHack;

    const hacker = accounts[2];

    before( async () => {
        
        factory = await LockedFactory.new();
        test = await TestLevel.new();
        let tx = await test.createLevelInstance(factory.address);

        instanceAddress = tx.logs[0].args.instance;

        instanceHack = await LockedHack.new();
        
        let unlocked = await Locked.at(instanceAddress).unlocked.call();
        expect(unlocked).to.equal(false,
            'victim contract not initialized correctly');
    });
    
    it('unlock the registrar', async () => {

        await instanceHack.attack(instanceAddress);

        let unlocked = await Locked.at(instanceAddress).unlocked.call();
        expect(unlocked).to.equal(true,
            'attacker could not unlock victim');
    });
});
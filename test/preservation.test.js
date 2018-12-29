const Preservation = artifacts.require('Preservation');
const PreservationFactory = artifacts.require('PreservationFactory');
const PreservationHack = artifacts.require('PreservationHack');
const TestLevel = artifacts.require('TestLevel');

contract('Preservation', async (accounts) => {

    let factory;
    let test;
    let instanceAddress;
    let instanceHack;

    const hacker = accounts[2];

    before( async () => {
        
        factory = await PreservationFactory.new();
        test = await TestLevel.new();
        let tx = await test.createLevelInstance(factory.address);

        instanceAddress = tx.logs[0].args.instance;

        instanceHack = await PreservationHack.new();
        
        let owner = await Preservation.at(instanceAddress).owner.call();
        expect(owner).to.equal(factory.address,
            'victim contract not initialized correctly');
    });
    
    it('become the owner', async () => {

        await instanceHack.attack(instanceAddress, {
            from: hacker
        });

        let owner = await Preservation.at(instanceAddress).owner.call();
        expect(owner).to.equal(hacker,
            'attacker could not become the owner');
    });
});
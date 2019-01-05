const Instance = artifacts.require('Instance');
const InstanceFactory = artifacts.require('InstanceFactory');
const TestLevel = artifacts.require('TestLevel');

contract('Hello Ethernaut', async (accounts) => {

    let test;
    let factory;
    let instanceAddress;

    before( async () => {
        factory = await InstanceFactory.new();
        test = await TestLevel.new();
        let tx = await test.createLevelInstance(factory.address);

        instanceAddress = tx.logs[0].args.instance;
        
        let cleared = await Instance.at(instanceAddress).getCleared();
        expect(cleared).to.equal(false,
            'victim contract not initialized correctly');
    });
    
    it('clear the level', async () => {

        let password = await Instance.at(instanceAddress).password.call();
        await Instance.at(instanceAddress).authenticate(password);

        let cleared = await Instance.at(instanceAddress).getCleared();
        expect(cleared).to.equal(true,
            'attacker could not clear the level');
    });
});
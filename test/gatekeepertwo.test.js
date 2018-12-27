const GatekeeperTwo = artifacts.require('GatekeeperTwo');
const GatekeeperTwoFactory = artifacts.require('GatekeeperTwoFactory');
const GatekeeperTwoHack = artifacts.require('GatekeeperTwoHack');
const TestLevel = artifacts.require('TestLevel'); 
const defaultAddr = '0x0000000000000000000000000000000000000000';

contract('GatekeeperTwo', async (accounts) => {

    let test;
    let factory;
    let instanceAddress;

    const hacker = accounts[2];

    before( async () => {
        factory = await GatekeeperTwoFactory.new();
        test = await TestLevel.new();
        let tx = await test.createLevelInstance(factory.address);

        instanceAddress = tx.logs[0].args.instance;
        
        let entrant = await GatekeeperTwo.at(instanceAddress).entrant();
        expect(entrant).to.equal(defaultAddr,
            'victim contract not initialized correctly');
    });
    
    it('become the entrant', async () => {
        // NOTE:
        // hacking the victim contract requires the attack to be done
        // at the time of contract deployment (see 'modifier gateTwo()')
        // could also have an attacking contract deploy a hack contract
        // for every attack
        instanceHack = await GatekeeperTwoHack.new(instanceAddress, {
            from: hacker
        });

        let entrant = await GatekeeperTwo.at(instanceAddress).entrant();
        expect(entrant).to.equal(hacker,
            'attacker could not enter');
    });
});
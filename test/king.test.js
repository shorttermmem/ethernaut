'use strict'

const utils = require('./common/utils')
const {assert, expect} = require('chai')
const KingFactory  = artifacts.require("KingFactory")
const KingHack = artifacts.require("KingHack")
const King = artifacts.require("King")


contract('King', async (accounts) => {
    
    let block
    let kingfactory
    let kinghack
    let king

    const owner = accounts[1]
    const hacker = accounts[2]
    const victim  = accounts[3]
    
    before(async () => {
        
        block = web3.eth.getBlock("latest");
       
        kingfactory = await KingFactory.new()
        kinghack = await KingHack.new() 
     
        king = await King.new({
            from: owner,
            value: web3.toWei(1, 'ether'),
            gas: block.gasLimit
        })
        //utils.logWallet({owner}, owner)

        assert.equal(
            await king.prize(), 
            web3.toWei(1, 'ether'),
            "King's prize should be 1 ether"
        )
        assert.deepStrictEqual(
            await king.king(), 
            owner,
            "King's adderss should be: " + owner
        )
 
        await kinghack.attack(king.address, {
            from: hacker,
            value: web3.toWei(1, 'ether'),
            gas: block.gasLimit
        })
        //utils.logWallet({hacker}, hacker)
       
        assert.equal(
            await king.prize(), 
            web3.toWei(1, 'ether'),
            "King's price should still be 1 ether"
        )
        assert.deepStrictEqual(
            await king.king(), 
            kinghack.address,
            "King adderss should be changed to:" + kinghack.address 
        )
        
    })

    it("victim cannot dethrone hacker as the King", async () => {

        let throwableTx
        try{
            throwableTx = await king.sendTransaction({
                from: victim,
                value: web3.toWei(1, 'ether')
            })
        }
        catch(err)
        {
            assert.strictEqual(err.message, "VM Exception while processing transaction: revert")
        }
        expect(throwableTx).to.be.undefined
        //utils.logWallet({victim}, victim)
      
        assert.deepStrictEqual(
            await king.king(), 
            kinghack.address,
            "King's king adderss should be not changed by: " + victim + " and stay as: " + kinghack.address
        )
    })
})

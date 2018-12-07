var victim = artifacts.require("King");
var hacker = artifacts.require("KingHack");

module.exports = function(deployer) {
    deployer.deploy(victim) 
    //.then(() => console.log(victim.address)) 
    .then(() => victim.deployed()) 
    .then(_instance => deployer.deploy(hacker));
};

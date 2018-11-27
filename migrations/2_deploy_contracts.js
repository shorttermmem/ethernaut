var victim = artifacts.require("King");
var hacker = artifacts.require("KingHack");

module.exports = function(deployer) {
    deployer.deploy(victim) 
    //.then(() => console.log(victim.address)) 
    .then(() => victim.deployed()) 
    .then(_instance => deployer.deploy(hacker, _instance.address, "0x627306090abab3a6e1400e9345bc60c78a8bef57"));
};

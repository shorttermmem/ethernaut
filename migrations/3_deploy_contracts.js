var Basic = artifacts.require("Basic");
var BasicHack = artifacts.require("BasicHack");

module.exports = function(deployer /*, network, accounts */) {
  deployer.deploy(Basic).then(function() {
      return deployer.deploy(BasicHack, Basic.address);
  });
};

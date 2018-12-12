var Shop = artifacts.require("Shop");
var ShopHack = artifacts.require("ShopHack");

module.exports = (deployer) => {
    deployer.deploy(Shop)
    .then(() => Shop.deployed())
    .then((shop) => deployer.deploy(ShopHack, shop.address));  
};
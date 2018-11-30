var Privacy = artifacts.require("Privacy");
var PrivacyHack = artifacts.require("PrivacyHack");

// randomized bytes32[3]
var data = ["0xf9c1906ab1561cd34b026c6d9596d40c70cbac8bb4447613c5ffb6f4817c93b8",
            "0x7cb7de4ab38f85cc11607093f73849102816ccdbd79e1895dd77c8e51990f75b",
            "0xc30750a294bda692f528bbf50da3d4abefcc5bfd33fdb796df81dd31fb2d6bee"
            ];

module.exports = function(deployer) {
    deployer.deploy(Privacy, data).then(function() {
        return deployer.deploy(PrivacyHack, Privacy.address);
    });
};
